import React, { useState, useEffect } from 'react';
import {
  TextField, Button, Stack, Typography, Paper, InputAdornment, Snackbar, Alert
} from '@mui/material';
import API from '../../api/EventApi';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateEvent = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
    ticketPrice: '',
    availableSpots: '',
    image: null,
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const fetchEventDetails = async () => {
    try {
      const res = await API.get(`/events/${id}`);
      setForm(res.data);
    } catch (err) {
      console.error('Fetch Event Error:', err);
      showSnackbar('❌ Failed to load event details', 'error');
    }
  };

  useEffect(() => {
    fetchEventDetails();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setForm((prev) => ({
      ...prev,
      image: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (let key in form) {
      formData.append(key, form[key]);
    }

    try {
      await API.put(`/events/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      showSnackbar('✅ Event updated successfully!');
      setTimeout(() => navigate('/manage'), 1500);
    } catch (err) {
      console.error('Update Error:', err);
      showSnackbar('❌ Failed to update event.', 'error');
    }
  };

  return (
    <>
      <Paper elevation={4} sx={{ p: 4, maxWidth: 600, mx: 'auto', mt: 5 }}>
        <Typography variant="h5" mb={2}>Update Event</Typography>
        <Stack component="form" spacing={2} onSubmit={handleSubmit}>
          <TextField
            label="Event Title"
            name="title"
            value={form.title}
            onChange={handleChange}
            required
          />
          <TextField
            label="Description"
            name="description"
            value={form.description}
            onChange={handleChange}
            multiline
            rows={3}
            required
          />
          <TextField
            label="Date"
            name="date"
            type="date"
            value={form.date?.slice(0, 10)}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            required
          />
          <TextField
            label="Location"
            name="location"
            value={form.location}
            onChange={handleChange}
            required
          />
          <TextField
            label="Ticket Price"
            name="ticketPrice"
            type="number"
            value={form.ticketPrice}
            onChange={handleChange}
            InputProps={{
              startAdornment: <InputAdornment position="start">₹</InputAdornment>,
            }}
            required
          />
          <TextField
            label="Available Spots"
            name="availableSpots"
            type="number"
            value={form.availableSpots}
            onChange={handleChange}
            required
          />
          <Button variant="outlined" component="label">
            Upload New Image
            <input type="file" hidden onChange={handleFileChange} />
          </Button>
          <Button type="submit" variant="contained" color="primary">
            Update Event
          </Button>
        </Stack>
      </Paper>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity={snackbar.severity} variant="filled" onClose={handleCloseSnackbar}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default UpdateEvent;
