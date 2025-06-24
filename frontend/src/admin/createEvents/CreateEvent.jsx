import React, { useState } from 'react';
import { TextField, Button, Paper, Typography, Stack } from '@mui/material';
import API from '../../api/EventApi';

const EventForm = () => {
  const [form, setForm] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
    ticketPrice: '',
    availableSpots: '',
  });
  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (const key in form) {
      formData.append(key, form[key]);
    }
    if (image) formData.append('file', image);

    try {
      await API.post('/events/add', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('Event Created!');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Paper sx={{ p: 4 }}>
      <Typography variant="h6">Create New Event</Typography>
      <Stack spacing={2} component="form" onSubmit={handleSubmit}>
        <TextField label="Title" name="title" fullWidth onChange={handleChange} />
        <TextField label="Description" name="description" fullWidth multiline onChange={handleChange} />
        <TextField label="Date" name="date" type="date" InputLabelProps={{ shrink: true }} onChange={handleChange} />
        <TextField label="Location" name="location" fullWidth onChange={handleChange} />
        <TextField label="Ticket Price" name="ticketPrice" type="number" onChange={handleChange} />
        <TextField label="Available Spots" name="availableSpots" type="number" onChange={handleChange} />
        <input type="file" accept="image/*" onChange={handleImage} />
        <Button variant="contained" type="submit">Create Event</Button>
      </Stack>
    </Paper>
  );
};

export default EventForm;
