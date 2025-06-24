import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../../api/EventApi';
import { Typography, Paper } from '@mui/material';
import BookEvent from '../bookEvents/BookEvents';
import ReviewForm from '../Review/ReviewForm';

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    API.get(`/events/${id}`).then(res => setEvent(res.data)).catch(console.error);
  }, [id]);

  if (!event) return <div>Loading...</div>;

  return (
    <Paper sx={{ p: 4 }}>
      <Typography variant="h4">{event.title}</Typography>
      <Typography>{event.description}</Typography>
      <Typography>{event.date} | {event.location}</Typography>
      <Typography>₹{event.ticketPrice} | {event.availableSpots} spots left</Typography>
      <img src={`http://localhost:5000/${event.image}`} alt={event.title} style={{ width: '100%', marginTop: '1rem' }} />

      <BookEvent eventId={id} ticketPrice={event.ticketPrice} />
      <ReviewForm eventId={id} />
    </Paper>
  );
};

export default EventDetails;
