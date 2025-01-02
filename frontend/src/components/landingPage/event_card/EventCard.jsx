import React from 'react';
import { Link } from 'react-router-dom';
import './eventCard.css';
import { eventsData } from '../../../Data/eventsData';

const EventCard = () => {
  return (
    <div className="event-cards">
      {eventsData.map(event => (
        <div className="event-card" key={event._id}>
          <img src={event.image} alt={event.title} />
          <h3>{event.title}</h3>
          <p>{event.description}</p>
          <p>{event.date}</p>
          <Link to={`/event/${event._id}`}>
            <button className="btn btn-outline-primary">View Details</button>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default EventCard;
