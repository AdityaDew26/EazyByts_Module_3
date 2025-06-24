import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Button, TextField, InputAdornment
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Sidebar from './sideBar/Sidebar';
import { useNavigate } from 'react-router-dom';
import EventList from '../../admin/eventList/EventList';
import API from '../../api/EventApi'; // Make sure this path is correct

const Dashboard = () => {
  const navigate = useNavigate();

  const [search, setSearch] = useState('');
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);

  const fetchEvents = async () => {
    try {
      const res = await API.get('/events');
      setEvents(res.data);
      setFilteredEvents(res.data);
    } catch (err) {
      console.error('Error fetching events:', err);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    const lowerSearch = search.toLowerCase();
    const filtered = events.filter((event) =>
      event.title.toLowerCase().includes(lowerSearch) ||
      event.description.toLowerCase().includes(lowerSearch) ||
      event.location.toLowerCase().includes(lowerSearch)
    );
    setFilteredEvents(filtered);
  }, [search, events]);

  const handleCreate = () => {
    navigate('/create');
  };

  return (
    <Box sx={{ display: 'flex', marginLeft: '170px' }}>
      <Box sx={{ width: 250, height: '100vh', backgroundColor: '#f4f4f4', padding: 2 }}>
        <Sidebar />
      </Box>

      <Box sx={{ flexGrow: 1, padding: 3 }}>
        <Typography variant="h4" gutterBottom>
          Dashboard
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 2 }}>
          <TextField
            variant="outlined"
            placeholder="Search events..."
            size="small"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{ flexGrow: 1, marginRight: 2 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <Button variant="contained" color="primary" onClick={handleCreate}>
            Add Event
          </Button>
        </Box>

        <EventList events={filteredEvents} />
      </Box>
    </Box>
  );
};

export default Dashboard;
