import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Avatar from '@mui/material/Avatar'; 
import HomeIcon from '@mui/icons-material/Home';
import EventIcon from '@mui/icons-material/Event';
import SendIcon from '@mui/icons-material/Send';
import NotificationsIcon from '@mui/icons-material/Notifications';
import "./sidebar.css";

const Sidebar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const response = await axios.get('http://localhost:5000/api/auth/profile', {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUser(response.data);

        }
      } catch (error) {
        console.error("Error fetching profile", error);
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleProfileChange = () => {
    navigate('/profile');
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="sidebar">
      <nav className="sidebar-nav">
        <ul>
          <li><Link to="/"><HomeIcon /> Home</Link></li>
          <li><Link to="/manage"><EventIcon /> Events</Link></li>
          <li><Link to="/invites"><SendIcon /> Invites</Link></li>
          <li><Link to="/rsvp"><SendIcon /> RSVP</Link></li>
          <li><Link to="/notifications"><NotificationsIcon /> Notifications</Link></li>
        </ul>
      </nav>

      <div className="user-profile">
        <Avatar src={user.avatar} alt={user.username} sx={{ width: 50, height: 50 }} />
        <p>{user.username}</p>
        <div className="profile-actions">
          <Link to="/profile" onClick={handleProfileChange}>Change Profile</Link>
          <Link to="/" onClick={handleLogout}>Logout</Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
