const express = require('express');
const router = express.Router();
const QRCode = require('qrcode');
const Event = require('../models/event');

// Generate QR code for an event
router.get('/:eventId', async (req, res) => {
  try {
    const { eventId } = req.params;
    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ error: 'Event not found' });

    // Use event's qrPayloadString or generate if missing
    if (!event.qrPayloadString) {
      event.qrPayloadString = Math.random().toString(36).substring(2, 12); // simple random string
      await event.save();
    }

    const qrData = `${event._id}|${event.qrPayloadString}`;
    
    // Generate QR code as data URL
    const qrCodeDataURL = await QRCode.toDataURL(qrData);

    res.json({ qrCodeDataURL, qrData });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
