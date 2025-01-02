import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import './manageEvents.css'; // Add the CSS import

const ManageEvents = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000/api/events')
      .then((response) => setEvents(response.data))
      .catch((error) => console.error(error));
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/api/events/${id}`)
      .then(() => {
        setEvents(events.filter((event) => event._id !== id));
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="manage-events-container">
      <h2>Manage Events</h2>

      {/* Material-UI Table */}
      <TableContainer component={Paper}>
        <Table aria-label="manage events table">
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Ticket Price</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {events.map((event) => (
              <TableRow key={event._id}>
                <TableCell>{event.title}</TableCell>
                <TableCell>{event.date}</TableCell>
                <TableCell>{event.location}</TableCell>
                <TableCell>${event.ticketPrice}</TableCell>
                <TableCell>
                  {/* Update Button */}
                  <Button 
                    variant="outlined" 
                    onClick={() => { navigate(`/events/update/${event._id}`); }}
                  >
                    Update
                  </Button>
                  {/* Delete Button */}
                  <Button 
                    variant="contained" 
                    color="error" 
                    onClick={() => handleDelete(event._id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ManageEvents;
