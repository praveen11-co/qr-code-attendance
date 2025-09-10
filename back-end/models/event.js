const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, enum: ['class', 'meeting', 'event'], required: true },

  endTime: { type: Date, required: true },
  location: { type: String },
  qrCode: { type: String },          // QR code image data URL
  qrPayloadString: { type: String, required: true }, // New: short unique payload string
  qrCodeExpiry: { type: Date },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Event', eventSchema);
