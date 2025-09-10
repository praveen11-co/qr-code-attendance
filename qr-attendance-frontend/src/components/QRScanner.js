import React from 'react';
import { QrReader } from 'react-qr-reader';
import axios from 'axios';

function QRScanner({ userId }) {
  const handleScan = async (result) => {
    if (result) {
      try {
        const res = await axios.post('http://localhost:5000/attendance/mark', {
          qrPayloadString: result?.text,
          userId
        });
        alert(res.data.message || 'Attendance marked');
      } catch (err) {
        alert(err.response?.data?.error || 'Error marking attendance');
      }
    }
  };

  return (
    <div>
      <QrReader
        onResult={(result) => handleScan(result)}
        constraints={{ facingMode: 'environment' }}
        containerStyle={{ width: '300px', margin: 'auto' }}
      />
    </div>
  );
}

export default QRScanner;
