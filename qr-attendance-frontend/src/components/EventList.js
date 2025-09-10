import React, { useEffect, useState } from 'react';
import axios from 'axios';

function EventList({ onSelectEvent }) {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/events')
      .then(res => setEvents(res.data))
      .catch(err => console.error(err));
  }, []);

  if (!events.length) return <p>No events available</p>;

  return (
    <div>
      <h2>Events</h2>
      <ul>
        {events.map(ev => (
          <li key={ev._id}>
            {ev.name} ({new Date(ev.scheduledTime).toLocaleString()})
            <button onClick={() => onSelectEvent(ev)}>Select</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EventList;
