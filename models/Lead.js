const mongoose = require('mongoose');

const LeadSchema = new mongoose.Schema({
  leadId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  companyName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  employeeCount: { type: Number, required: true },
  budget: { type: Number, required: true },
  festival: { type: String, default: 'Diwali Gifting' },
  selectedCity: { type: String },
  selectedHamper: { type: String },
  inquiryType: { type: String, enum: ['Catalogue Request', 'Quote Request', 'Custom Builder', 'AI Assistant'], default: 'Quote Request' },
  verificationStatus: { type: String, enum: ['Verified', 'Pending', 'Suspicious'], default: 'Pending' },
  isSuspicious: { type: Boolean, default: false },
  spamFlags: [{ type: String }],
  createdDate: { type: Date, default: Date.now },
  lastUpdated: { type: Date, default: Date.now }
});

// Update the lastUpdated timestamp on save
LeadSchema.pre('save', function (next) {
  this.lastUpdated = Date.now();
  next();
});

module.exports = mongoose.models.Lead || mongoose.model('Lead', LeadSchema);
