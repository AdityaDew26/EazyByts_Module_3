import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Button, Grid, Typography, Box, Paper } from '@mui/material';

const UpdateEvent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
    image: null,
  });
  const [file, setFile] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/events/${id}`);
        setEvent(response.data || {});
      } catch (error) {
        console.error('Error fetching event:', error);
      }
    };
    fetchEvent();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEvent((prevEvent) => ({
      ...prevEvent,
      [name]: value || '',
    }));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', event.title);
    formData.append('description', event.description);
    formData.append('date', event.date);
    formData.append('location', event.location);

    if (file) {
      formData.append('image', file);
    }

    try {
      await axios.put(`http://localhost:5000/api/events/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      navigate(`/events/:id`);
    } catch (error) {
      console.error('Error updating event:', error);
    }
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Paper sx={{ padding: 3, maxWidth: 600, margin: 'auto' }}>
        <Typography variant="h4" gutterBottom>
          Update Event
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Event Title"
                fullWidth
                name="title"
                value={event.title || ''}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Event Description"
                fullWidth
                name="description"
                value={event.description || ''}
                onChange={handleChange}
                variant="outlined"
                multiline
                rows={4}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Event Date"
                fullWidth
                type="date"
                name="date"
                value={event.date || ''}
                onChange={handleChange}
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Event Location"
                fullWidth
                name="location"
                value={event.location || ''}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <input
                type="file"
                onChange={handleFileChange}
                accept="image/*"
                style={{ marginTop: 8 }}
              />
            </Grid>
            <Grid item xs={12} display="flex" justifyContent="center">
              <Button
                variant="contained"
                color="primary"
                type="submit"
                sx={{ marginTop: 2 }}
              >
                Update Event
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Box>
  );
};

export default UpdateEvent;
