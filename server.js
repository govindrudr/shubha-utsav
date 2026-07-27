require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const path = require('path');
const { rateLimit } = require('express-rate-limit');
const XLSX = require('xlsx');
const { Resend } = require('resend');
const compression = require('compression');

// Imports
const dbService = require('./utils/dbService');
const seoRenderer = require('./utils/seoRenderer');
const fs = require('fs');

let baseHtmlTemplate = '';
try {
  baseHtmlTemplate = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
} catch (err) {
  console.error('Failed to read base index.html template:', err);
}

const LEAD_EXCEL_PATH = path.join(__dirname, 'lead-enquiries.xlsx');

function appendLeadInquiryToExcel(lead) {
  const row = {
    'Lead ID': lead.leadId,
    'Name': lead.name,
    'Company Name': lead.companyName,
    'Email': lead.email,
    'Phone': lead.phone,
    'Employee Count': lead.employeeCount,
    'Budget Per Employee': lead.budget,
    'Festival': lead.festival,
    'Selected City': lead.selectedCity,
    'Selected Hamper': lead.selectedHamper,
    'Inquiry Type': lead.inquiryType,
    'Verification Status': lead.verificationStatus,
    'Is Suspicious': lead.isSuspicious ? 'Yes' : 'No',
    'Spam Flags': Array.isArray(lead.spamFlags) ? lead.spamFlags.join('; ') : (lead.spamFlags || ''),
    'Remarks': lead.remarks || '',
    'Recorded Timestamp': new Date(lead.createdDate || Date.now()).toISOString()
  };

  const workbook = fs.existsSync(LEAD_EXCEL_PATH)
    ? XLSX.readFile(LEAD_EXCEL_PATH)
    : XLSX.utils.book_new();

  const sheetName = 'Lead Enquiries';
  let worksheet = workbook.Sheets[sheetName];

  if (!worksheet) {
    worksheet = XLSX.utils.json_to_sheet([row]);
    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
  } else {
    XLSX.utils.sheet_add_json(worksheet, [row], { origin: -1, skipHeader: true });
  }

  XLSX.writeFile(workbook, LEAD_EXCEL_PATH);
}

const app = express();
const PORT = process.env.PORT || 3000;

// Set up Resend Mailer if key is available
let resend = null;
if (process.env.RESEND_API_KEY) {
  resend = new Resend(process.env.RESEND_API_KEY);
}

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Successfully connected to MongoDB.'))
  .catch(err => {
    console.warn('MongoDB connection failed. Continuing with local JSON database fallback.', err.message);
  });

// Express Config
app.use(cors({
  origin: true,
  credentials: true
}));

// Gzip/Brotli compression for all responses — biggest single latency win
app.use(compression({
  level: 6,          // balanced speed vs ratio
  threshold: 1024,   // only compress responses > 1 KB
  filter: (req, res) => {
    if (req.headers['x-no-compression']) return false;
    return compression.filter(req, res);
  }
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Static File Server — aggressive cache for immutable assets, short cache for HTML
app.use(express.static(path.join(__dirname), {
  maxAge: '1d',          // CSS/JS/images cached 1 day
  etag: true,            // conditional requests via ETag
  lastModified: true,
  setHeaders: (res, filePath) => {
    const ext = path.extname(filePath).toLowerCase();
    if (ext === '.html') {
      // HTML must always revalidate so users see fresh content
      res.setHeader('Cache-Control', 'no-cache, must-revalidate');
    } else if (['.png','.jpg','.jpeg','.svg','.ico','.webp'].includes(ext)) {
      // Images can be cached longer
      res.setHeader('Cache-Control', 'public, max-age=604800, immutable'); // 7 days
    } else if (['.css','.js'].includes(ext)) {
      res.setHeader('Cache-Control', 'public, max-age=86400'); // 1 day
    }
  }
}));

// Global Rate Limiter
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200, // Limit each IP to 200 requests per windowMs
  message: { error: 'Too many requests from this IP, please try again after 15 minutes.' }
});
app.use(globalLimiter);

// OTP Rate Limiter (Prevent spam OTP request floods)
const otpLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 5, // Limit each IP/Email to 5 OTP requests per 5 minutes
  message: { error: 'Too many OTP requests. Please wait a few minutes before resending.' }
});

// Authentication Middlewares
const authenticateClient = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access denied. Verification token missing.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.client = decoded; // { email, verified: true }
    next();
  } catch (err) {
    return res.status(403).json({ error: 'Invalid or expired verification token.' });
  }
};

const authenticateAdmin = (req, res, next) => {
  const token = req.cookies.admin_token || (req.headers['authorization'] && req.headers['authorization'].split(' ')[1]);

  if (!token) {
    return res.status(401).json({ error: 'Admin access denied. Session token missing.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded.isAdmin) {
      return res.status(403).json({ error: 'Forbidden. Admin privileges required.' });
    }
    req.admin = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ error: 'Session expired. Please log in again.' });
  }
};

// Fraud Prevention Utilities
const checkSpamKeywords = (fields = []) => {
  const spamKeywords = [
    'seo', 'crypto', 'bitcoin', 'casino', 'viagra', 'marketing', 'investment', 
    'passive income', 'free cash', 'make money online', 'href=', 'link=', 'click here'
  ];
  
  const flaggedWords = [];
  for (const field of fields) {
    if (!field) continue;
    const lowerField = String(field).toLowerCase();
    
    // Check url patterns
    if (lowerField.includes('http://') || lowerField.includes('https://') || lowerField.includes('www.')) {
      flaggedWords.push('URL Link');
    }
    
    for (const kw of spamKeywords) {
      if (lowerField.includes(kw)) {
        flaggedWords.push(kw);
      }
    }
  }
  return flaggedWords;
};

const verifyRecaptcha = async (token) => {
  if (!process.env.RECAPTCHA_SECRET_KEY) {
    // reCAPTCHA is not configured in .env, bypass verification
    return true;
  }
  if (!token) return false;

  try {
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`
    });
    const data = await response.json();
    return data.success;
  } catch (err) {
    console.error('reCAPTCHA verify error:', err);
    return false;
  }
};

/* ==========================================================================
   AUTHENTICATION API
   ========================================================================== */

// 1. Send OTP Route
app.post('/api/auth/send-otp', otpLimiter, async (req, res) => {
  const { name, companyName, email } = req.body;

  if (!name || !companyName || !email) {
    return res.status(400).json({ error: 'Name, Company, and Official Email are required fields.' });
  }

  // Generate 6-digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes expiry

  try {
    await dbService.createOtp(email, otp, expiresAt);

    if (resend) {
      await resend.emails.send({
        from: 'Shubha Utsav <onboarding@resend.dev>', // Free sandbox from
        to: email,
        subject: 'Shubha Utsav - Email Verification OTP',
        html: `<p>Dear ${name},</p>
               <p>Your OTP code to verify your official email for corporate gifting inquiries is:</p>
               <h2 style="color: #9D0017; font-size: 28px; letter-spacing: 2px; margin: 15px 0;">${otp}</h2>
               <p>This code will expire in 5 minutes.</p>
               <p>Best Regards,<br>Team Shubha Utsav</p>`
      });
      console.log(`[Resend] OTP code ${otp} successfully sent to ${email}`);
      return res.json({ success: true, message: 'OTP sent successfully to your email.' });
    } else {
      // Dev mode console fallback
      console.log('----------------------------------------------------');
      console.log(`[DEV MODE ALERT] Verification OTP code for ${email} is: ${otp}`);
      console.log('----------------------------------------------------');
      return res.json({ 
        success: true, 
        devMode: true, 
        otp: otp, // In devMode we send OTP back so the UI banner can show it
        message: 'OTP generated. (Dev Mode: Printed to console)' 
      });
    }
  } catch (err) {
    console.error('Send OTP Error:', err);
    return res.status(500).json({ error: 'Failed to send OTP. Please try again later.' });
  }
});

// 2. Verify OTP Route
app.post('/api/auth/verify-otp', async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ error: 'Email and OTP are required fields.' });
  }

  try {
    const record = await dbService.getOtp(email);

    if (!record) {
      return res.status(400).json({ error: 'No OTP requested for this email. Send OTP first.' });
    }

    if (record.verified) {
      return res.status(400).json({ error: 'Email has already been verified.' });
    }

    if (new Date() > record.expiresAt) {
      return res.status(400).json({ error: 'OTP has expired (5 minutes timeout). Request a new code.' });
    }

    // Limit verify attempts to 5
    if (record.attempts >= 5) {
      return res.status(400).json({ error: 'Maximum attempts exceeded. Request a new OTP.' });
    }

    // Increment attempts
    await dbService.updateOtp(record._id, { attempts: record.attempts + 1 });

    if (record.otp !== otp.trim()) {
      return res.status(400).json({ error: 'Incorrect OTP code. Please double check.' });
    }

    // Mark as verified
    await dbService.updateOtp(record._id, { verified: true });

    // Generate Verification Token
    const clientToken = jwt.sign(
      { email: email, verified: true },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    return res.json({ 
      success: true, 
      token: clientToken, 
      message: 'Email verified successfully.' 
    });
  } catch (err) {
    console.error('Verify OTP Error:', err);
    return res.status(500).json({ error: 'Error validating OTP.' });
  }
});

/* ==========================================================================
   LEAD INQUIRY SUBMISSIONS
   ========================================================================== */

app.post('/api/leads', authenticateClient, async (req, res) => {
  const { 
    name, companyName, email, phone, employeeCount, budget, 
    festival, selectedCity, selectedHamper, inquiryType, recaptchaToken 
  } = req.body;

  // Validate request matching client token
  if (req.client.email.toLowerCase() !== email.toLowerCase()) {
    return res.status(400).json({ error: 'Client token email does not match form email.' });
  }

  // Validate fields
  if (!name || !companyName || !email || !phone || !employeeCount || !budget) {
    return res.status(400).json({ error: 'Required fields: Name, Company, Email, Phone, Count, and Budget.' });
  }

  try {
    const spamFlags = [];
    let isSuspicious = false;

    // 1. reCAPTCHA Fraud Check
    const isCaptchaValid = await verifyRecaptcha(recaptchaToken);
    if (!isCaptchaValid) {
      isSuspicious = true;
      spamFlags.push('Failed reCAPTCHA Verification');
    }

    // 2. Spam Word Filter Check
    const matchedSpam = checkSpamKeywords([name, companyName, selectedHamper, req.body.remarks]);
    if (matchedSpam.length > 0) {
      isSuspicious = true;
      spamFlags.push(`Spam keyword: ${matchedSpam.join(', ')}`);
    }

    // 3. Duplicate Email/Phone checks (within past 24 hours)
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    
    const duplicateEmail = await dbService.countLeads({
      email: email,
      createdDate: { $gte: oneDayAgo }
    });
    if (duplicateEmail > 0) {
      isSuspicious = true;
      spamFlags.push('Duplicate inquiry email within 24h');
    }

    const duplicatePhone = await dbService.countLeads({
      phone: phone,
      createdDate: { $gte: oneDayAgo }
    });
    if (duplicatePhone > 0) {
      isSuspicious = true;
      spamFlags.push('Duplicate inquiry phone within 24h');
    }

    // Build lead document
    const leadRecord = {
      name,
      companyName,
      email,
      phone,
      employeeCount: Number(employeeCount),
      budget: Number(budget),
      festival: festival || 'Diwali Gifting',
      selectedCity: selectedCity || 'N/A',
      selectedHamper: selectedHamper || 'N/A',
      inquiryType: inquiryType || 'Quote Request',
      verificationStatus: isSuspicious ? 'Suspicious' : 'Verified',
      isSuspicious,
      spamFlags,
      remarks: req.body.remarks || ''
    };

    const newLead = await dbService.createLead(leadRecord);
    try {
      appendLeadInquiryToExcel(newLead);
    } catch (err) {
      console.error('Lead Excel append error:', err);
    }

    return res.json({ 
      success: true, 
      leadId: newLead.leadId,
      isSuspicious,
      message: isSuspicious 
        ? 'Inquiry recorded under administrative review.' 
        : 'Inquiry successfully verified and submitted.' 
    });
  } catch (err) {
    console.error('Lead Submission Error:', err);
    return res.status(500).json({ error: 'Failed to record lead inquiry.' });
  }
});

/* ==========================================================================
   ORDER MANAGE CLIENT-SIDE API
   ========================================================================== */

app.post('/api/orders', authenticateClient, async (req, res) => {
  const { companyName, contactPerson, email, phone, employeeCount, selectedHampers, totalAmount, notes } = req.body;

  if (req.client.email.toLowerCase() !== email.toLowerCase()) {
    return res.status(400).json({ error: 'Client token email does not match form email.' });
  }

  if (!companyName || !contactPerson || !email || !phone || !employeeCount || !selectedHampers || !totalAmount) {
    return res.status(400).json({ error: 'Required fields: Company, Contact Person, Email, Phone, Count, Hampers, and Total Amount.' });
  }

  try {
    const orderData = {
      companyName,
      contactPerson,
      email,
      phone,
      employeeCount: Number(employeeCount),
      selectedHampers,
      totalAmount: Number(totalAmount),
      orderStatus: 'New',
      paymentStatus: 'Pending',
      deliveryStatus: 'Pending',
      notes: notes ? [{ text: notes, createdAt: new Date() }] : []
    };

    const newOrder = await dbService.createOrder(orderData);

    return res.json({
      success: true,
      orderId: newOrder.orderId,
      invoiceNumber: newOrder.invoiceNumber,
      message: 'Order created successfully.'
    });
  } catch (err) {
    console.error('Order creation error:', err);
    return res.status(500).json({ error: 'Failed to record order details.' });
  }
});

// Verified Catalogue Download Route
app.get('/api/catalogue/download', authenticateClient, (req, res) => {
  const filePath = path.join(__dirname, 'catalogue.pdf');
  res.download(filePath, 'shubh_utsav_corporate_catalogue.pdf', (err) => {
    if (err) {
      console.error('Catalogue download file error:', err);
      res.status(404).send('Catalogue PDF file not found. Contact support.');
    }
  });
});

/* ==========================================================================
   ADMIN AUTHENTICATION
   ========================================================================== */

app.post('/api/admin/login', (req, res) => {
  const { username, password } = req.body;

  const defaultUsername = process.env.ADMIN_USERNAME || 'admin';
  const defaultPassword = process.env.ADMIN_PASSWORD || 'ShubhAdmin@2026';

  // Accept password-only (new admin panel) OR username+password (legacy)
  const passwordMatch = password === defaultPassword;
  const usernameOk = !username || username === defaultUsername;

  if (passwordMatch && usernameOk) {
    const adminToken = jwt.sign(
      { username: username || defaultUsername, isAdmin: true },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );

    res.cookie('admin_token', adminToken, {
      httpOnly: true,
      secure: false, // Set true in production over HTTPS
      maxAge: 8 * 60 * 60 * 1000 // 8 hours
    });

    return res.json({ success: true, token: adminToken });
  } else {
    return res.status(401).json({ error: 'Invalid admin credentials. Please retry.' });
  }
});

app.post('/api/admin/logout', (req, res) => {
  res.clearCookie('admin_token');
  res.json({ success: true, message: 'Logged out successfully.' });
});

/* ==========================================================================
   ENTERPRISE ADMIN SERVICES (SECURED)
   ========================================================================== */

// 1. Dashboard Metrics
app.get('/api/admin/metrics', authenticateAdmin, async (req, res) => {
  try {
    const stats = await dbService.getMetrics();
    res.json(stats);
  } catch (err) {
    console.error('Metrics Error:', err);
    res.status(500).json({ error: 'Failed to gather metrics.' });
  }
});

// 2. Leads Listing & Search/Filter
app.get('/api/admin/leads', authenticateAdmin, async (req, res) => {
  const { search, city, festival, status, company } = req.query;
  const filter = {};

  if (search) {
    filter.$or = [
      { name: new RegExp(search, 'i') },
      { companyName: new RegExp(search, 'i') },
      { email: new RegExp(search, 'i') },
      { phone: new RegExp(search, 'i') }
    ];
  }
  if (city) filter.selectedCity = new RegExp(city, 'i');
  if (festival) filter.festival = new RegExp(festival, 'i');
  if (status) filter.verificationStatus = status;
  if (company) filter.companyName = new RegExp(company, 'i');

  try {
    const leads = await dbService.getLeads(filter, { createdDate: -1 });
    res.json(leads);
  } catch (err) {
    console.error('Admin Leads fetch error:', err);
    res.status(500).json({ error: 'Failed to fetch leads directory.' });
  }
});

// 3. Orders Listing & Search/Filter
app.get('/api/admin/orders', authenticateAdmin, async (req, res) => {
  const { search, orderStatus, paymentStatus } = req.query;
  const filter = {};

  if (search) {
    filter.$or = [
      { orderId: new RegExp(search, 'i') },
      { companyName: new RegExp(search, 'i') },
      { contactPerson: new RegExp(search, 'i') },
      { invoiceNumber: new RegExp(search, 'i') }
    ];
  }
  if (orderStatus) filter.orderStatus = orderStatus;
  if (paymentStatus) filter.paymentStatus = paymentStatus;

  try {
    const orders = await dbService.getOrders(filter, { createdDate: -1 });
    res.json(orders);
  } catch (err) {
    console.error('Admin Orders fetch error:', err);
    res.status(500).json({ error: 'Failed to fetch orders directory.' });
  }
});

// 4. Update Order Statuses
app.put('/api/admin/orders/:id/status', authenticateAdmin, async (req, res) => {
  const { orderStatus, paymentStatus, deliveryStatus } = req.body;
  const orderId = req.params.id;

  try {
    const updated = await dbService.updateOrder(orderId, { orderStatus, paymentStatus, deliveryStatus });
    if (!updated) {
      return res.status(404).json({ error: 'Order record not found.' });
    }
    res.json({ success: true, order: updated });
  } catch (err) {
    console.error('Order status update error:', err);
    res.status(500).json({ error: 'Failed to update order status.' });
  }
});

// 5. Add internal note to Order
app.post('/api/admin/orders/:id/notes', authenticateAdmin, async (req, res) => {
  const { note } = req.body;
  const orderId = req.params.id;

  if (!note || !note.trim()) {
    return res.status(400).json({ error: 'Note content cannot be empty.' });
  }

  try {
    const updated = await dbService.addOrderNote(orderId, note.trim());
    if (!updated) {
      return res.status(404).json({ error: 'Order record not found.' });
    }
    res.json({ success: true, notes: updated.notes });
  } catch (err) {
    console.error('Add Order Note Error:', err);
    res.status(500).json({ error: 'Failed to append note.' });
  }
});

// 6. Generate Printable HTML Invoice
app.get('/api/admin/orders/:id/invoice', authenticateAdmin, async (req, res) => {
  const orderId = req.params.id;
  try {
    const order = await dbService.getOrderById(orderId);
    if (!order) {
      return res.status(404).send('<h2>Order not found.</h2>');
    }

    const subtotal = order.totalAmount;
    const taxRate = 0.18; // 18% GST for corporate services in India
    const taxAmount = Math.round(subtotal * taxRate);
    const grandTotal = subtotal + taxAmount;

    const html = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>Invoice - ${order.invoiceNumber}</title>
        <style>
          body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #333; margin: 40px; line-height: 1.4; }
          .invoice-box { max-width: 800px; margin: auto; padding: 30px; border: 1px solid #eee; box-shadow: 0 0 10px rgba(0, 0, 0, .15); font-size: 14px; }
          table { width: 100%; line-height: inherit; text-align: left; border-collapse: collapse; }
          table td { padding: 10px; vertical-align: top; }
          table tr td:nth-child(2) { text-align: right; }
          .title { font-size: 32px; font-weight: bold; color: #9D0017; letter-spacing: 1px; }
          .header-row { border-bottom: 2px solid #eee; }
          .section-title { font-weight: bold; margin-top: 20px; font-size: 16px; border-bottom: 1px solid #ddd; padding-bottom: 5px; }
          .item-table { margin-top: 20px; width: 100%; }
          .item-table th { background: #f9f9f9; padding: 10px; border-bottom: 1px solid #ddd; text-align: left; }
          .item-table th:nth-child(2), .item-table td:nth-child(2) { text-align: right; }
          .item-table td { border-bottom: 1px solid #eee; padding: 10px; }
          .total-row td { font-weight: bold; font-size: 15px; border-top: 2px solid #ddd; padding-top: 10px; }
          .notes-box { margin-top: 30px; padding: 15px; background: #fafafa; border-left: 3px solid #9D0017; font-size: 12px; }
          .btn-print { margin: 20px auto; display: block; width: 120px; padding: 10px; background: #9D0017; color: white; border: none; text-align: center; font-weight: bold; cursor: pointer; border-radius: 4px; }
          @media print { .btn-print { display: none; } }
        </style>
      </head>
      <body>
        <div class="invoice-box">
          <table>
            <tr class="header-row">
              <td class="title">SHUBHA UTSAV</td>
              <td>
                <strong>Invoice #:</strong> ${order.invoiceNumber}<br>
                <strong>Date:</strong> ${new Date(order.createdDate).toLocaleDateString('en-IN')}<br>
                <strong>Status:</strong> ${order.orderStatus}
              </td>
            </tr>
            <tr>
              <td>
                <strong>From:</strong><br>
                Shubha Utsav Gifting Pvt. Ltd.<br>
                Neauleaf Techd, Bhugaon<br>
                Pune - 412115
              </td>
              <td>
                <strong>Bill To:</strong><br>
                ${order.companyName}<br>
                Attn: ${order.contactPerson}<br>
                Email: ${order.email}<br>
                Phone: ${order.phone}
              </td>
            </tr>
          </table>

          <div class="section-title">Order Details</div>
          <table class="item-table">
            <thead>
              <tr>
                <th>Description</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <strong>Custom Diwali Gifting Package</strong><br>
                  Selected Configuration: ${order.selectedHampers}<br>
                  Employee Count: ${order.employeeCount} Hampers
                </td>
                <td>₹${subtotal.toLocaleString('en-IN')}</td>
              </tr>
              <tr>
                <td>GST (18% Service Tax)</td>
                <td>₹${taxAmount.toLocaleString('en-IN')}</td>
              </tr>
              <tr class="total-row">
                <td>Grand Total</td>
                <td>₹${grandTotal.toLocaleString('en-IN')}</td>
              </tr>
            </tbody>
          </table>

          ${order.notes && order.notes.length > 0 ? `
            <div class="notes-box">
              <strong>Order History & Notes:</strong>
              <ul>
                ${order.notes.map(n => `<li>[${new Date(n.createdAt).toLocaleDateString('en-IN')}] ${n.text}</li>`).join('')}
              </ul>
            </div>
          ` : ''}

          <button class="btn-print" onclick="window.print()">Print Invoice</button>
        </div>
      </body>
      </html>
    `;
    res.send(html);
  } catch (err) {
    console.error('Invoice generation error:', err);
    res.status(500).send('<h2>Failed to generate invoice document.</h2>');
  }
});

// 7. Export Leads to Excel
app.get('/api/admin/export/leads', authenticateAdmin, async (req, res) => {
  const { dateFrom, dateTo, city, festival, company } = req.query;
  const filter = {};

  // Date Range Filter
  if (dateFrom || dateTo) {
    filter.createdDate = {};
    if (dateFrom) filter.createdDate.$gte = new Date(dateFrom);
    if (dateTo) filter.createdDate.$lte = new Date(new Date(dateTo).setHours(23,59,59,999));
  }
  if (city) filter.selectedCity = new RegExp(city, 'i');
  if (festival) filter.festival = new RegExp(festival, 'i');
  if (company) filter.companyName = new RegExp(company, 'i');

  try {
    const leads = await dbService.getLeads(filter, { createdDate: -1 });

    const formattedData = leads.map(l => ({
      'Lead ID': l.leadId,
      'Name': l.name,
      'Company Name': l.companyName,
      'Email': l.email,
      'Phone Number': l.phone,
      'Employee Count': l.employeeCount,
      'Budget Per Unit': l.budget,
      'Total Estimate': l.employeeCount * l.budget,
      'Festival': l.festival,
      'Selected City': l.selectedCity,
      'Selected Hamper': l.selectedHamper,
      'Inquiry Type': l.inquiryType,
      'Verification Status': l.verificationStatus,
      'Is Suspicious': l.isSuspicious ? 'Yes' : 'No',
      'Flags/Reasons': l.spamFlags.join('; '),
      'Created Date': new Date(l.createdDate).toLocaleString('en-IN')
    }));

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(formattedData);
    XLSX.utils.book_append_sheet(wb, ws, 'Leads Directory');

    const buf = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' });
    
    res.setHeader('Content-Disposition', 'attachment; filename="shubh_utsav_leads_export.xlsx"');
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.send(buf);
  } catch (err) {
    console.error('Leads export error:', err);
    res.status(500).json({ error: 'Failed to generate spreadsheet file.' });
  }
});

// 8. Download Lead Enquiries Workbook
app.get('/api/admin/download/lead-enquiries', authenticateAdmin, async (req, res) => {
  const filePath = path.join(__dirname, 'lead-enquiries.xlsx');

  try {
    if (!fs.existsSync(filePath)) {
      const leads = await dbService.getLeads({}, { createdDate: -1 });
      const formattedData = leads.map(l => ({
        'Lead ID': l.leadId,
        'Name': l.name,
        'Company Name': l.companyName,
        'Email': l.email,
        'Phone': l.phone,
        'Employee Count': l.employeeCount,
        'Budget Per Employee': l.budget,
        'Festival': l.festival,
        'Selected City': l.selectedCity,
        'Selected Hamper': l.selectedHamper,
        'Inquiry Type': l.inquiryType,
        'Verification Status': l.verificationStatus,
        'Is Suspicious': l.isSuspicious ? 'Yes' : 'No',
        'Spam Flags': Array.isArray(l.spamFlags) ? l.spamFlags.join('; ') : (l.spamFlags || ''),
        'Remarks': l.remarks || '',
        'Recorded Timestamp': new Date(l.createdDate).toISOString()
      }));

      const wb = XLSX.utils.book_new();
      const ws = XLSX.utils.json_to_sheet(formattedData);
      XLSX.utils.book_append_sheet(wb, ws, 'Lead Enquiries');
      XLSX.writeFile(wb, filePath);
    }

    res.download(filePath, 'lead-enquiries.xlsx', err => {
      if (err) {
        console.error('Lead enquiries download failed:', err);
        if (!res.headersSent) {
          res.status(500).json({ error: 'Failed to download enquiries workbook.' });
        }
      }
    });
  } catch (err) {
    console.error('Lead enquiries download error:', err);
    res.status(500).json({ error: 'Failed to prepare enquiries workbook.' });
  }
});

// 9. Export Orders to Excel
app.get('/api/admin/export/orders', authenticateAdmin, async (req, res) => {
  const { dateFrom, dateTo, company } = req.query;
  const filter = {};

  if (dateFrom || dateTo) {
    filter.createdDate = {};
    if (dateFrom) filter.createdDate.$gte = new Date(dateFrom);
    if (dateTo) filter.createdDate.$lte = new Date(new Date(dateTo).setHours(23,59,59,999));
  }
  if (company) filter.companyName = new RegExp(company, 'i');

  try {
    const orders = await dbService.getOrders(filter, { createdDate: -1 });

    const formattedData = orders.map(o => ({
      'Order ID': o.orderId,
      'Company Name': o.companyName,
      'Contact Person': o.contactPerson,
      'Email': o.email,
      'Phone': o.phone,
      'Employee Count': o.employeeCount,
      'Selected Hampers': o.selectedHampers,
      'Total Amount (Excl. Tax)': o.totalAmount,
      'Order Status': o.orderStatus,
      'Payment Status': o.paymentStatus,
      'Delivery Status': o.deliveryStatus,
      'Invoice Number': o.invoiceNumber,
      'Notes Summary': o.notes.map(n => n.text).join(' | '),
      'Created Date': new Date(o.createdDate).toLocaleString('en-IN')
    }));

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(formattedData);
    XLSX.utils.book_append_sheet(wb, ws, 'Orders Directory');

    const buf = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' });
    
    res.setHeader('Content-Disposition', 'attachment; filename="shubh_utsav_orders_export.xlsx"');
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.send(buf);
  } catch (err) {
    console.error('Orders export error:', err);
    res.status(500).json({ error: 'Failed to generate spreadsheet file.' });
  }
});

/* ==========================================================================
   TECHNICAL SEO & BLOG ROUTES (SEO Page Compiler Integration)
   ========================================================================== */

// 1. robots.txt Route
app.get('/robots.txt', (req, res) => {
  res.type('text/plain');
  res.send(`User-agent: *
Allow: /
Sitemap: https://shubhautsav.com/sitemap.xml`);
});

// 2. sitemap.xml Route
app.get('/sitemap.xml', (req, res) => {
  res.type('application/xml');
  
  let urls = [
    'https://shubhautsav.com/',
    'https://shubhautsav.com/blog'
  ];

  // Add city pages
  const cityKeys = Object.keys(seoRenderer.citiesSeoData);
  cityKeys.forEach(city => {
    urls.push(`https://shubhautsav.com/corporate-gifting-${city}`);
  });

  // Add blog articles
  seoRenderer.blogArticles.forEach(art => {
    urls.push(`https://shubhautsav.com/blog/${art.slug}`);
  });

  const todayStr = new Date().toISOString().split('T')[0];

  let sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

  urls.forEach(url => {
    let priority = '0.8';
    if (url === 'https://shubhautsav.com/') {
      priority = '1.0';
    } else if (url.includes('/blog') && !url.includes('/blog/')) {
      priority = '0.9';
    }

    sitemapXml += `  <url>
    <loc>${url}</loc>
    <lastmod>${todayStr}</lastmod>
    <changefreq>daily</changefreq>
    <priority>${priority}</priority>
  </url>\n`;
  });

  sitemapXml += `</urlset>`;
  res.send(sitemapXml);
});

// 3. City-Specific Landing Page Routes
app.get('/corporate-gifting-:city', (req, res, next) => {
  const cityKey = req.params.city.toLowerCase().trim();
  if (seoRenderer.citiesSeoData[cityKey]) {
    try {
      if (!baseHtmlTemplate) {
        baseHtmlTemplate = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
      }
      const html = seoRenderer.renderCityPage(cityKey, baseHtmlTemplate);
      return res.send(html);
    } catch (err) {
      console.error(`Error rendering city page for ${cityKey}:`, err);
    }
  }
  next();
});

// 4. Blog Directory Route
app.get('/blog', (req, res) => {
  try {
    if (!baseHtmlTemplate) {
      baseHtmlTemplate = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
    }
    const html = seoRenderer.renderBlogList(baseHtmlTemplate);
    return res.send(html);
  } catch (err) {
    console.error('Error rendering blog list:', err);
    res.status(500).send('Error rendering blog directory.');
  }
});

// 5. Blog Article Route
app.get('/blog/:slug', (req, res, next) => {
  const slug = req.params.slug.toLowerCase().trim();
  const artExists = seoRenderer.blogArticles.some(a => a.slug === slug);
  if (artExists) {
    try {
      if (!baseHtmlTemplate) {
        baseHtmlTemplate = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
      }
      const html = seoRenderer.renderBlogPost(slug, baseHtmlTemplate);
      if (html) {
        return res.send(html);
      }
    } catch (err) {
      console.error(`Error rendering blog post ${slug}:`, err);
    }
  }
  next();
});

// -------------------------------------------------------
// LUCKY DRAW ENROLLMENT ENDPOINT
// -------------------------------------------------------
const luckyDrawEntries = []; // in-memory store (replaces DB when unavailable)

app.post('/api/lucky-draw/enroll', async (req, res) => {
    try {
        const { company, contactName, contactEmail, contactPhone, employeeCount, orderRef } = req.body;
        if (!company || !contactEmail || !employeeCount || !orderRef) {
            return res.status(400).json({ success: false, message: 'Missing required fields' });
        }
        const entry = {
            id: `LD-${Date.now()}-${Math.floor(Math.random() * 9999)}`,
            company, contactName, contactEmail, contactPhone,
            employeeCount: parseInt(employeeCount),
            orderRef,
            enrolledAt: new Date().toISOString(),
            ticketsIssued: parseInt(employeeCount),
        };
        luckyDrawEntries.push(entry);
        console.log(`[Lucky Draw] Enrolled: ${company} — ${employeeCount} tickets (ref: ${orderRef})`);
        return res.json({ success: true, entry, message: `${employeeCount} lucky tickets issued for ${company}` });
    } catch (err) {
        console.error('[Lucky Draw] Enroll error:', err);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
});

app.get('/api/lucky-draw/entries', async (req, res) => {
    // Basic auth: only admins should call this
    const totalTickets = luckyDrawEntries.reduce((sum, e) => sum + e.employeeCount, 0);
    res.json({ success: true, count: luckyDrawEntries.length, totalTickets, entries: luckyDrawEntries });
});

/* ==========================================================================
   ADMIN PANEL ROUTES (new)
   ========================================================================== */

// ── Razorpay Payment Routes ──────────────────────────────────────────────────
// Dynamically require Razorpay only if keys are configured
function getRazorpayInstance() {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  if (!keyId || !keySecret) return null;
  try {
    const Razorpay = require('razorpay');
    return new Razorpay({ key_id: keyId, key_secret: keySecret });
  } catch (e) {
    console.warn('[Razorpay] Package not installed. Run: npm install razorpay');
    return null;
  }
}

// Create Razorpay order
app.post('/api/payment/create-order', authenticateClient, async (req, res) => {
  const rzp = getRazorpayInstance();
  if (!rzp) {
    return res.status(503).json({ error: 'Payment gateway not configured. Add Razorpay keys in Admin Panel.' });
  }
  const { amount, currency = 'INR', receipt, notes } = req.body;
  if (!amount || isNaN(amount) || amount < 1) {
    return res.status(400).json({ error: 'Valid amount in paise required (e.g. 50000 = ₹500).' });
  }
  try {
    const order = await rzp.orders.create({
      amount: Math.round(amount), // paise
      currency,
      receipt: receipt || `SU-${Date.now()}`,
      notes: notes || {},
    });
    console.log(`[Payment] Order created: ${order.id} ₹${amount / 100}`);
    res.json({ success: true, order, key_id: process.env.RAZORPAY_KEY_ID });
  } catch (err) {
    console.error('[Payment] Create order error:', err);
    res.status(500).json({ error: 'Failed to create payment order.', detail: err.error?.description });
  }
});

// Verify payment signature after frontend checkout completes
app.post('/api/payment/verify', async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    return res.status(400).json({ success: false, error: 'Missing payment verification fields.' });
  }
  const crypto = require('crypto');
  const expectedSig = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET || '')
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest('hex');
  if (expectedSig === razorpay_signature) {
    console.log(`[Payment] Verified: ${razorpay_payment_id}`);
    res.json({ success: true, payment_id: razorpay_payment_id });
  } else {
    console.warn(`[Payment] Signature mismatch for ${razorpay_payment_id}`);
    res.status(400).json({ success: false, error: 'Payment signature verification failed.' });
  }
});

// Razorpay Webhook receiver
app.post('/api/payment/webhook', (req, res) => {
  const crypto = require('crypto');
  const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
  // req.body may already be a parsed object (express.json runs globally)
  // or a raw Buffer if content-type bypasses json parser
  let rawBody, event;
  try {
    if (Buffer.isBuffer(req.body)) {
      rawBody = req.body;
      event = JSON.parse(rawBody.toString('utf8'));
    } else if (typeof req.body === 'object') {
      rawBody = Buffer.from(JSON.stringify(req.body));
      event = req.body;
    } else {
      rawBody = Buffer.from(String(req.body));
      event = JSON.parse(req.body);
    }
  } catch (e) {
    return res.status(400).json({ error: 'Invalid JSON payload.' });
  }

  if (webhookSecret) {
    const signature = req.headers['x-razorpay-signature'];
    const digest = crypto.createHmac('sha256', webhookSecret).update(rawBody).digest('hex');
    if (signature !== digest) {
      console.warn('[Webhook] Invalid Razorpay signature');
      return res.status(400).json({ error: 'Invalid signature' });
    }
  }

  console.log(`[Webhook] Razorpay event: ${event.event}`);
  if (event.event === 'payment.captured') {
    const payment = event?.payload?.payment?.entity;
    if (payment) {
      console.log(`[Webhook] Payment captured: ${payment.id} ₹${payment.amount / 100}`);
    }
  }
  res.json({ received: true });
});

// Serve admin panel HTML (no auth — login handled client-side)
app.get('/admin', (req, res) => {
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.setHeader('X-Robots-Tag', 'noindex, nofollow');
  res.sendFile(path.join(__dirname, 'admin.html'));
});
function readEnvFile() {
  const envPath = path.join(__dirname, '.env');
  if (!fs.existsSync(envPath)) return {};
  const lines = fs.readFileSync(envPath, 'utf8').split('\n');
  const result = {};
  for (const line of lines) {
    const match = line.match(/^([A-Z0-9_]+)=(.*)$/);
    if (match) result[match[1]] = match[2];
  }
  return result;
}

// Helper: write key=value pairs to .env, preserving comments and structure
function writeEnvValues(updates) {
  const envPath = path.join(__dirname, '.env');
  let content = fs.existsSync(envPath) ? fs.readFileSync(envPath, 'utf8') : '';
  for (const [key, value] of Object.entries(updates)) {
    const safeValue = String(value).replace(/\n/g, ' ');
    const lineRegex = new RegExp(`^(#\\s*)?${key}=.*$`, 'm');
    if (lineRegex.test(content)) {
      content = content.replace(lineRegex, `${key}=${safeValue}`);
    } else {
      content = content.trimEnd() + `\n${key}=${safeValue}\n`;
    }
  }
  fs.writeFileSync(envPath, content, 'utf8');
  // Hot-reload env vars into process.env
  for (const [key, value] of Object.entries(updates)) {
    process.env[key] = value;
  }
}

// Get config values (masked) — admin protected
const ALLOWED_CONFIG_KEYS = [
  'RAZORPAY_KEY_ID','RAZORPAY_KEY_SECRET','RAZORPAY_WEBHOOK_SECRET',
  'WHATSAPP_BUSINESS_NUMBER','WHATSAPP_API_TOKEN','WHATSAPP_PHONE_NUMBER_ID',
  'RESEND_API_KEY','EMAIL_FROM',
  'JWT_SECRET','ADMIN_PASSWORD',
  'RECAPTCHA_SITE_KEY','RECAPTCHA_SECRET_KEY','MONGODB_URI',
  'GA4_MEASUREMENT_ID','CLARITY_PROJECT_ID','GSC_VERIFICATION',
];

app.get('/api/admin/config', authenticateAdmin, (req, res) => {
  const requestedKeys = req.query.keys ? req.query.keys.split(',') : ALLOWED_CONFIG_KEYS;
  const envValues = readEnvFile();
  const config = {};
  for (const key of requestedKeys) {
    if (!ALLOWED_CONFIG_KEYS.includes(key)) continue;
    const val = process.env[key] || envValues[key] || '';
    config[key] = val;
  }
  res.json({ success: true, config });
});

// Save config values — admin protected
app.post('/api/admin/config', authenticateAdmin, (req, res) => {
  const { config } = req.body;
  if (!config || typeof config !== 'object') {
    return res.status(400).json({ success: false, message: 'Invalid config object.' });
  }
  const toWrite = {};
  for (const [key, value] of Object.entries(config)) {
    if (!ALLOWED_CONFIG_KEYS.includes(key)) continue;
    if (value !== undefined && value !== null) toWrite[key] = String(value);
  }
  if (!Object.keys(toWrite).length) {
    return res.status(400).json({ success: false, message: 'No valid keys to save.' });
  }
  try {
    writeEnvValues(toWrite);
    console.log('[Admin] Config updated:', Object.keys(toWrite).join(', '));
    res.json({ success: true, updated: Object.keys(toWrite) });
  } catch (err) {
    console.error('[Admin] Config write error:', err);
    res.status(500).json({ success: false, message: 'Failed to write config.' });
  }
});

// Leads count — admin protected (from Excel file)
app.get('/api/admin/leads-count', authenticateAdmin, (req, res) => {
  try {
    if (!fs.existsSync(LEAD_EXCEL_PATH)) return res.json({ count: 0 });
    const wb = XLSX.readFile(LEAD_EXCEL_PATH);
    const ws = wb.Sheets['Lead Enquiries'];
    if (!ws) return res.json({ count: 0 });
    const data = XLSX.utils.sheet_to_json(ws);
    res.json({ count: data.length });
  } catch (err) {
    res.json({ count: 0 });
  }
});

// Single Page App Fallback Router (Redirect all client URLs to root)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start Server
app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`Shubha Utsav B2B Gifting API Running on Port ${PORT}`);
  console.log(`Local Access: http://localhost:${PORT}`);
  console.log(`====================================================`);
});
