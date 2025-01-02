import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box, Link, IconButton, InputAdornment } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import './login.css';  // Import the CSS file

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });

      const data = response.data;
      if (data.token) {
        localStorage.setItem('token', data.token);
        navigate('/');
      }
    } catch (error) {
      console.error("Error logging in", error);
      alert("Invalid credentials or error logging in");
    }
  };

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  return (
    <div style={{position:"relative"}}>
       <div className="image">
        <img src="https://img.freepik.com/premium-vector/events-big-text-online-corporate-party-meeting-friends-colleagues-video-conference_501813-9.jpg?semt=ais_hybrid" alt="" />
      </div>
       <Container component="main" maxWidth="xs" className='main-container'>
     
      <Box className="login-container">
        <Typography variant="h5">Login</Typography>
        <form onSubmit={handleSubmit} className="login-form">
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="text-field"
          />
          <TextField
            label="Password"
            type={showPassword ? 'text' : 'password'}
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="text-field"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                    className="password-toggle"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button type="submit" variant="contained" fullWidth className="submit-button">
            Login
          </Button>
          <Box className="signup-link">
            <Link href="/signup" variant="body2">
              Don't have an account? Sign Up
            </Link>
          </Box>
        </form>
      </Box>
    </Container>
    </div>
   
  );
};

export default Login;
