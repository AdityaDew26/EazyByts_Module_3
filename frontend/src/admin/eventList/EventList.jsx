import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './eventList.css';

const EventList = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/events/')
      .then((response) => setEvents(response.data))
      .catch((error) => console.error('Error fetching events:', error));
  }, []);

  return (
    <div className="event-list">
      <h2>Upcoming Events</h2>
      <div className="event-cards">
        {events.map((event) => (
          <div className="event-card" key={event._id}>
            {/* Use event.image URL */}
            {event.image ? (
              <img src={event.image} alt={event.title} className="event-image" />
            ) : (
              <div className="placeholder-image">No Image</div>
            )}
            <div className="event-info">
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <Link to={`/event/${event._id}`}>
                <button className="view-button">View</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventList;
