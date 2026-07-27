# 🪔 Shubha Utsav - Premium B2B Corporate Gifting Platform & CRM

**Shubha Utsav** is India's first Hyperlocal B2B Corporate Gifting Platform designed specifically for premium festive corporate gifting (e.g., Diwali bulk hampers). The platform features regional specialty gift boxes with authentic sweets and custom branding options, along with an integrated CRM and lead management system.

---

## 🚀 Key Features

* **Hyperlocal Regional Sweets Catalog:** Curated hampers featuring local delicacies from Pune, Mumbai, Nagpur, Kolhapur, Hyderabad, Bengaluru, Jaipur, Surat, and Kolkata.
* **B2B Bulk Customization Engine:** Supports custom company logo branding, custom packaging options, and order quantity tier calculators (500 to 10,000+ employees).
* **Lead Capture & Verification:** Built-in validation system to process, filter, and score inbound B2B sales leads/queries.
* **Dual-Layer Database Logging:** Saves incoming client leads in a MongoDB database (via Mongoose) and simultaneously logs them to a backup Excel spreadsheet (`lead-enquiries.xlsx`) locally.
* **Admin CRM Dashboard:** Secure admin interface (`admin.html`) to manage enquiries, export leads, and track B2B sales cycles.
* **Secure Operations:** Features rate-limiting (`express-rate-limit`), JSON Web Tokens (`jsonwebtoken`) authentication, and cookie-based sessions.
* **Email Integration:** Automated notifications sent directly to the sales team using the **Resend API**.

---

## 🛠️ Technology Stack

* **Frontend:** Vanilla HTML5, CSS3 (Premium UI with smooth gradients & responsive layout), Vanilla JavaScript.
* **Backend:** Node.js, Express.js.
* **Database:** MongoDB (via Mongoose ODM) + Local Excel sheets (via SheetJS/xlsx).
* **Security & Auth:** JWT, Cookie-Parser, Express Rate Limit.
* **Communications:** Resend (Email API).
* **Performance:** Compression middleware, Node-cache/custom optimization.

---

## 📂 Project Structure

```text
├── assets/                  # Brand assets, icons, and illustrations
├── models/                  # Mongoose schemas (Leads, Admins, Logs)
├── utils/                   # Helpers: dbService, seoRenderer, validation
├── admin.html               # Secure B2B CRM Admin Dashboard
├── app.js                   # Client-side core logic and form interactions
├── index.html               # Main customer landing page & catalog
├── logos.html               # Brands list / Showcase page
├── server.js                # Core Express application entry point
├── styles.css               # Main stylesheet (Premium design system tokens)
├── lead-enquiries.xlsx      # Local fallback Excel database for leads
└── package.json             # NPM dependencies & scripts
```

---

## ⚙️ Setup and Installation

### 1. Prerequisites
Ensure you have **Node.js** and **MongoDB** installed on your machine.

### 2. Install Dependencies
Clone the repository, navigate to the folder, and run:
```bash
npm install
```

### 3. Environment Configuration (`.env`)
Create a `.env` file in the root directory and configure the following variables:
```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
RESEND_API_KEY=your_resend_api_key
ADMIN_EMAIL=sales@shubhautsav.com
```

### 4. Run the Application
* **Development Mode (with live reload):**
  ```bash
  npm run dev
  ```
* **Production Mode:**
  ```bash
  npm start
  ```

The server will spin up on `http://localhost:3000`.

---

## 📄 License
This project is proprietary and confidential. Created for **Shubha Utsav Corporate Gifting**.
