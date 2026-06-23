const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  orderId: { type: String, required: true, unique: true },
  companyName: { type: String, required: true },
  contactPerson: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  employeeCount: { type: Number, required: true },
  selectedHampers: { type: String, required: true }, // comma separated or simple description
  totalAmount: { type: Number, required: true },
  orderStatus: { 
    type: String, 
    enum: ['New', 'Contacted', 'Quote Sent', 'Negotiation', 'Approved', 'Production', 'Shipped', 'Delivered', 'Closed'], 
    default: 'New' 
  },
  paymentStatus: { 
    type: String, 
    enum: ['Pending', 'Paid', 'Failed'], 
    default: 'Pending' 
  },
  deliveryStatus: { 
    type: String, 
    enum: ['Pending', 'Shipped', 'Delivered'], 
    default: 'Pending' 
  },
  invoiceNumber: { type: String },
  notes: [{
    text: String,
    createdAt: { type: Date, default: Date.now }
  }],
  createdDate: { type: Date, default: Date.now },
  lastUpdated: { type: Date, default: Date.now }
});

// Update the lastUpdated timestamp on save
OrderSchema.pre('save', function (next) {
  this.lastUpdated = Date.now();
  next();
});

module.exports = mongoose.models.Order || mongoose.model('Order', OrderSchema);
