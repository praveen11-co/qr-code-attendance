const AttendanceRecord = require('../models/attendanceRecord');
const Event = require('../models/event');

exports.markAttendance = async (req, res) => {
  try {
    const { eventId, qrPayload } = req.body;
    const userId = req.user ? req.user._id : req.body.userId;

    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ error: 'Event not found' });

    if (event.qrPayloadString !== qrPayload) {
      return res.status(400).json({ error: 'Invalid QR code' });
    }

    const existingRecord = await AttendanceRecord.findOne({ user: userId, event: eventId });
    if (existingRecord) {
      return res.status(400).json({ error: 'Attendance already marked' });
    }

    const ipAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const deviceInfo = req.headers['user-agent'];

    const attendance = new AttendanceRecord({
      user: userId,
      event: eventId,
      status: 'present',
      ipAddress,
      deviceInfo
    });
    await attendance.save();

    res.status(201).json({ message: 'Attendance marked successfully', attendance });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
