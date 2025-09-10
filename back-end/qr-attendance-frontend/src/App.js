import React, { useState } from 'react';
import EventList from './components/EventList';
import AttendanceReport from './components/AttendanceReport';
import QRScanner from './components/QRScanner';
import EventQRCode from './components/EventQRCode';

function App() {
  const [role, setRole] = useState('');
  const [selectedEvent, setSelectedEvent] = useState(null);

  const demoUserId = '68bc83180c6a488a468ab6c4';

  if (!role) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h1>QR Attendance System</h1>
        <p>Select your role to continue:</p>
        <button onClick={() => setRole('admin')}>Admin</button>
        <button onClick={() => setRole('student')}>Student</button>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>QR Attendance System - {role === 'admin' ? 'Admin Panel' : 'Student Panel'}</h1>

      <EventList onSelectEvent={setSelectedEvent} />

      {role === 'admin' && selectedEvent && (
        <div style={{ marginTop: '20px' }}>
          <h2>Event QR Code</h2>
          <EventQRCode eventId={selectedEvent._id} />
          <h2>Attendance Report</h2>
          <AttendanceReport event={selectedEvent} />
        </div>
      )}

      {role === 'student' && selectedEvent && (
        <div style={{ marginTop: '20px' }}>
          <h2>Scan QR Code to Mark Attendance</h2>
          <QRScanner userId={demoUserId} />
        </div>
      )}
    </div>
  );
}

export default App;
