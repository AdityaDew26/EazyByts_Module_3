import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button } from '@mui/material';
import './create.css';
import { useNavigate } from 'react-router-dom';

const CreateEvent = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [ticketPrice, setTicketPrice] = useState(''); // State for ticket price
  const [image, setImage] = useState(null); // State to hold the image file
  const [imageUrl, setImageUrl] = useState(''); // State to hold the image URL (for preview)
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result); // Set the image URL for preview
      };
      reader.readAsDataURL(file); // Read the file as a data URL
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Prepare the form data
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('date', date);
    formData.append('location', location);
    formData.append('ticketPrice', ticketPrice); // Append ticketPrice
    if (image) {
      formData.append('image', image); // Append image file if available
    }

    // Send form data to the backend
    axios
      .post('http://localhost:5000/api/events/add', formData)
      .then((response) => {
        console.log('Event created:', response.data);
        alert('Event added successfully');
        setTitle('');
        setDescription('');
        setDate('');
        setLocation('');
        setTicketPrice(''); // Reset ticket price state
        setImage(null); // Reset image state
        setImageUrl(''); // Reset image preview
        navigate('/dashboard');
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('Error adding event');
      });
  };

  return (
    <div className="create-event-container">
      <h2>Add Event</h2>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Title"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          label="Description"
          fullWidth
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <TextField
          type="date"
          label="Date"
          fullWidth
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <TextField
          label="Location"
          fullWidth
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        {/* Ticket Price Input */}
        <TextField
          label="Ticket Price"
          fullWidth
          type="number"
          value={ticketPrice}
          onChange={(e) => setTicketPrice(e.target.value)}
          InputProps={{
            startAdornment: <span>$</span>, // Optional dollar sign before the input
          }}
        />

        {/* File input for image */}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />

        {/* Display image preview */}
        {imageUrl && (
          <div className="image-preview">
            <h4>Image Preview:</h4>
            <img src={imageUrl} alt="Preview" style={{ width: '100%', maxHeight: '300px', objectFit: 'cover' }} />
          </div>
        )}

        <Button type="submit" variant="contained">
          Add Event
        </Button>
      </form>
    </div>
  );
};

export default CreateEvent;
