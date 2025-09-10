import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode.react';
import axios from 'axios';

function EventQRCode({ eventId }) {
  const [payload, setPayload] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:5000/events/${eventId}`)
      .then(res => setPayload(res.data.qrPayloadString))
      .catch(err => console.error(err));
  }, [eventId]);

  if (!payload) return <p>Loading QR Code...</p>;

  return (
    <div style={{ margin: '20px 0' }}>
      <QRCode value={payload} size={256} />
    </div>
  );
}

export default EventQRCode;
