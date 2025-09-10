const AttendanceRecord = require('../models/attendanceRecord');
const User = require('../models/user');
const Event = require('../models/event');

exports.getAttendanceByEvent = async (req, res) => {
  try {
    const { eventId } = req.params;

    const attendanceRecords = await AttendanceRecord.find({ event: eventId })
      .populate('user', 'name email')
      .populate('event', 'name scheduledTime');

    res.json({ attendance: attendanceRecords });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
