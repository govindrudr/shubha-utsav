const mongoose = require('mongoose');
const Lead = require('../models/Lead');
const Order = require('../models/Order');
const Otp = require('../models/Otp');
const dbFallback = require('./dbFallback');

function isConnected() {
  return mongoose.connection.readyState === 1;
}

const dbService = {
  // Generate sequence-like IDs for Leads
  getNextLeadId: async () => {
    if (isConnected()) {
      try {
        const count = await Lead.countDocuments();
        return `LEAD-${1000 + count + 1}`;
      } catch (err) {
        console.error('Mongoose lead count error, using random ID', err);
      }
    }
    const count = await dbFallback.count('leads');
    return `LEAD-${1000 + count + 1}`;
  },

  // Generate sequence-like IDs for Orders
  getNextOrderId: async () => {
    if (isConnected()) {
      try {
        const count = await Order.countDocuments();
        return `ORD-${1000 + count + 1}`;
      } catch (err) {
        console.error('Mongoose order count error, using random ID', err);
      }
    }
    const count = await dbFallback.count('orders');
    return `ORD-${1000 + count + 1}`;
  },

  // Leads CRUD
  createLead: async (leadData) => {
    leadData.leadId = await dbService.getNextLeadId();
    leadData.createdDate = new Date();
    leadData.lastUpdated = new Date();

    if (isConnected()) {
      try {
        const lead = new Lead(leadData);
        return await lead.save();
      } catch (err) {
        console.warn('Mongoose lead save failed, falling back to JSON db', err);
      }
    }
    return await dbFallback.save('leads', leadData, 'leadId');
  },

  getLeads: async (query = {}, sort = { createdDate: -1 }) => {
    if (isConnected()) {
      try {
        return await Lead.find(query).sort(sort);
      } catch (err) {
        console.warn('Mongoose lead query failed, falling back to JSON db', err);
      }
    }
    return await dbFallback.find('leads', query, sort);
  },

  countLeads: async (query = {}) => {
    if (isConnected()) {
      try {
        return await Lead.countDocuments(query);
      } catch (err) {
        console.warn('Mongoose lead count failed, falling back to JSON db', err);
      }
    }
    return await dbFallback.count('leads', query);
  },

  updateLead: async (leadId, updateData) => {
    updateData.lastUpdated = new Date();
    if (isConnected()) {
      try {
        return await Lead.findOneAndUpdate({ leadId }, updateData, { new: true });
      } catch (err) {
        console.warn('Mongoose lead update failed, falling back to JSON db', err);
      }
    }
    const lead = await dbFallback.findOne('leads', { leadId });
    if (lead) {
      return await dbFallback.save('leads', { ...lead, ...updateData }, 'leadId');
    }
    return null;
  },

  // Orders CRUD
  createOrder: async (orderData) => {
    orderData.orderId = await dbService.getNextOrderId();
    orderData.invoiceNumber = `INV-2026-${orderData.orderId.split('-')[1]}`;
    orderData.createdDate = new Date();
    orderData.lastUpdated = new Date();

    if (isConnected()) {
      try {
        const order = new Order(orderData);
        return await order.save();
      } catch (err) {
        console.warn('Mongoose order save failed, falling back to JSON db', err);
      }
    }
    return await dbFallback.save('orders', orderData, 'orderId');
  },

  getOrders: async (query = {}, sort = { createdDate: -1 }) => {
    if (isConnected()) {
      try {
        return await Order.find(query).sort(sort);
      } catch (err) {
        console.warn('Mongoose order query failed, falling back to JSON db', err);
      }
    }
    return await dbFallback.find('orders', query, sort);
  },

  getOrderById: async (orderId) => {
    if (isConnected()) {
      try {
        return await Order.findOne({ orderId });
      } catch (err) {
        console.warn('Mongoose order get failed, falling back to JSON db', err);
      }
    }
    return await dbFallback.findOne('orders', { orderId });
  },

  updateOrder: async (orderId, updateData) => {
    updateData.lastUpdated = new Date();
    if (isConnected()) {
      try {
        return await Order.findOneAndUpdate({ orderId }, updateData, { new: true });
      } catch (err) {
        console.warn('Mongoose order update failed, falling back to JSON db', err);
      }
    }
    const order = await dbFallback.findOne('orders', { orderId });
    if (order) {
      return await dbFallback.save('orders', { ...order, ...updateData }, 'orderId');
    }
    return null;
  },

  addOrderNote: async (orderId, noteText) => {
    const note = { text: noteText, createdAt: new Date() };
    if (isConnected()) {
      try {
        return await Order.findOneAndUpdate(
          { orderId },
          { $push: { notes: note }, $set: { lastUpdated: new Date() } },
          { new: true }
        );
      } catch (err) {
        console.warn('Mongoose order note failed, falling back to JSON db', err);
      }
    }
    const order = await dbFallback.findOne('orders', { orderId });
    if (order) {
      if (!order.notes) order.notes = [];
      order.notes.push(note);
      return await dbFallback.save('orders', order, 'orderId');
    }
    return null;
  },

  // OTP CRUD
  createOtp: async (email, otp, expiresAt) => {
    const otpData = { email, otp, expiresAt, attempts: 0, verified: false, createdAt: new Date() };
    if (isConnected()) {
      try {
        // Remove older OTPs for same email
        await Otp.deleteMany({ email });
        const newOtp = new Otp(otpData);
        return await newOtp.save();
      } catch (err) {
        console.warn('Mongoose OTP create failed, falling back to JSON db', err);
      }
    }
    
    // Fallback cleanup
    const db = dbFallback.find('otps', { email });
    const localDb = require('./dbFallback');
    const fullDb = JSON.parse(fs().readFileSync(path().join(__dirname, '..', 'db.json'), 'utf-8'));
    fullDb.otps = fullDb.otps.filter(o => o.email !== email);
    fs().writeFileSync(path().join(__dirname, '..', 'db.json'), JSON.stringify(fullDb, null, 2));

    return await dbFallback.save('otps', otpData, '_id');
  },

  getOtp: async (email) => {
    if (isConnected()) {
      try {
        return await Otp.findOne({ email }).sort({ createdAt: -1 });
      } catch (err) {
        console.warn('Mongoose OTP find failed, falling back to JSON db', err);
      }
    }
    // Find latest for this email
    const otps = await dbFallback.find('otps', { email }, { createdAt: -1 });
    return otps.length > 0 ? otps[0] : null;
  },

  updateOtp: async (otpId, updateData) => {
    if (isConnected()) {
      try {
        return await Otp.findByIdAndUpdate(otpId, updateData, { new: true });
      } catch (err) {
        console.warn('Mongoose OTP update failed, falling back to JSON db', err);
      }
    }
    const otp = await dbFallback.findOne('otps', { _id: otpId });
    if (otp) {
      return await dbFallback.save('otps', { ...otp, ...updateData }, '_id');
    }
    return null;
  },

  // Metrics Report
  getMetrics: async () => {
    if (isConnected()) {
      try {
        const totalLeads = await Lead.countDocuments();
        const verifiedLeads = await Lead.countDocuments({ verificationStatus: 'Verified' });
        const pendingLeads = await Lead.countDocuments({ verificationStatus: 'Pending' });
        const totalOrders = await Order.countDocuments();
        
        const orders = await Order.find({ orderStatus: { $ne: 'Closed' } });
        const revenue = orders.reduce((sum, o) => sum + (Number(o.totalAmount) || 0), 0);

        const conversionRate = totalLeads > 0 ? ((verifiedLeads / totalLeads) * 100).toFixed(1) : 0;

        return {
          totalLeads,
          verifiedLeads,
          pendingLeads,
          totalOrders,
          revenue,
          conversionRate
        };
      } catch (err) {
        console.warn('Mongoose metrics failed, falling back to JSON db', err);
      }
    }
    return await dbFallback.getMetrics();
  }
};

// Help helper for imports that might be needed in fallback OTP delete logic
function fs() { return require('fs'); }
function path() { return require('path'); }

module.exports = dbService;
