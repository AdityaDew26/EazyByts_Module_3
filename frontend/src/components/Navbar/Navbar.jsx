import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Button, Box, Typography, Avatar } from '@mui/material';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <AppBar position="fixed" sx={{
       backdropFilter: "blur(5px)",
        backgroundColor:"rgba(0,0,0,0.5)"
    }}>
      <Toolbar>
        <Box sx={{ flexGrow: 1,
        
        }}>
          <Typography variant="h6">THE EVENT MANAGER</Typography>
        </Box>
        <Box>
          <Link to="/" style={{ textDecoration: 'none', color: 'white', marginRight: '20px' }}>
            <Button color="inherit">Explore</Button>
          </Link>

          {isLoggedIn ? (
            <>
              <Link to="/dashboard" style={{ textDecoration: 'none', color: 'white', marginRight: '20px' }}>
                <Button color="inherit">Dashboard</Button>
              </Link>
              <Button color="inherit" onClick={handleLogout}>Logout</Button>
            </>
          ) : (
            <>
              <Link to="/login" style={{ textDecoration: 'none', color: 'white', marginRight: '20px' }}>
                <Button color="inherit">Login</Button>
              </Link>
              <Link to="/signup" style={{ textDecoration: 'none', color: 'white' }}>
                <Button color="inherit">Sign Up</Button>
              </Link>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
