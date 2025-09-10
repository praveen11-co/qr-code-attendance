const mongoose = require('mongoose');

const attendanceRecordSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
  timestamp: { type: Date, default: Date.now },
  status: { type: String, enum: ['present', 'late'], default: 'present' },
  ipAddress: { type: String }, // For proxy prevention
  deviceInfo: { type: String }, // For proxy prevention
  location: { 
    latitude: Number,
    longitude: Number
  } // Optional GPS validation
});

// Ensure one attendance record per user per event
attendanceRecordSchema.index({ user: 1, event: 1 }, { unique: true });

module.exports = mongoose.model('AttendanceRecord', attendanceRecordSchema);
