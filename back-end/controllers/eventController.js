const Event = require('../models/event');
const QRCode = require('qrcode');

exports.createEvent = async (req, res) => {
  try {
    const { name, type, scheduledTime, endTime, location } = req.body;

    // Create the QR payload string (simple unique string)
    const qrPayloadString = `${name.replace(/\s+/g, '-')}-${Date.now()}`;

    // Create a new event without QR code yet, to get event._id
    const event = new Event({
      name,
      type,
      scheduledTime,
      endTime,
      location,
      qrPayloadString,  // store payload string separately
      qrCodeExpiry: endTime,
      createdBy: req.user ? req.user._id : null
    });

    // Save event to get the _id
    await event.save();

    // Create combined payload string: eventId|qrPayloadString
    const combinedPayload = `${event._id.toString()}|${qrPayloadString}`;

    // Generate QR code image from combined payload
    const qrCodeDataUrl = await QRCode.toDataURL(combinedPayload);

    // Update event with QR code image data URL
    event.qrCode = qrCodeDataUrl;
    await event.save();

    res.status(201).json({
      message: 'Event created successfully',
      event
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.json({ events });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
