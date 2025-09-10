import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AttendanceReport({ event }) {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5000/attendance/${event._id}`)
      .then(res => setRecords(res.data))
      .catch(err => console.error(err));
  }, [event]);

  if (!records.length) return <p>No attendance records yet</p>;

  return (
    <div>
      <h3>Attendance Records:</h3>
      <ul>
        {records.map(r => (
          <li key={r._id}>{r.userName} - {r.markedAt}</li>
        ))}
      </ul>
    </div>
  );
}

export default AttendanceReport;
