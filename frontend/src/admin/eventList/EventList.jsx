import React, { useEffect, useState } from 'react';
import {
  Card, CardMedia, CardContent, Typography, Grid, Button, Box
} from '@mui/material';
import API from '../../api/EventApi';
import { useNavigate } from 'react-router-dom';
import './eventlist.css';

const EventList = () => {
  const [eventList, setEventList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    API.get('/events')
      .then((res) => setEventList(res.data))
      .catch((err) => console.error('Fetch error:', err));
  }, []);

  return (
    <Grid container spacing={3}>
      {eventList.length === 0 ? (
        <Typography>No events found.</Typography>
      ) : (
        eventList.map((event) => (
          <Grid item key={event._id} xs={12} sm={6} md={4}>
            <Card>
              {event.image && (
                <CardMedia
                  component="img"
                  height="160"
                  image={`http://localhost:5000/${event.image}`}
                  alt={event.title}
                />
              )}
              <CardContent>
                <Typography variant="h6">{event.title}</Typography>
                <Typography variant="body2">{event.description}</Typography>
                <Typography variant="caption" display="block" gutterBottom>
                  📍 {event.location}
                </Typography>
                <Button
                  variant="contained"
                  size="small"
                  sx={{ mt: 1 }}
                  onClick={() => navigate(`/event/${event._id}`)}
                >
                  View Details
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))
      )}
    </Grid>
  );
};

export default EventList;
