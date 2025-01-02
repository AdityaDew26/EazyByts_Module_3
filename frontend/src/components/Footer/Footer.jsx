import React from 'react';
import { Container, Grid, Typography, Link, Box, IconButton } from '@mui/material';
import { Facebook, Twitter, Instagram, LinkedIn } from '@mui/icons-material';

const Footer = () => {
  return (
    <Box sx={{ backgroundColor: '#333', color: 'white', padding: '2rem 0' }}>
      <Container maxWidth="lg">
        <Grid container spacing={3} justifyContent="space-between">
          {/* Contact Section */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>Contact Us</Typography>
            <Typography variant="body2">123 Event Street, City, Country</Typography>
            <Typography variant="body2">+1 234 567 890</Typography>
            <Typography variant="body2">contact@eventmanagement.com</Typography>
          </Grid>

          {/* Social Media Section */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>Follow Us</Typography>
            <Box>
              <IconButton color="inherit" href="https://facebook.com" target="_blank">
                <Facebook />
              </IconButton>
              <IconButton color="inherit" href="https://twitter.com" target="_blank">
                <Twitter />
              </IconButton>
              <IconButton color="inherit" href="https://instagram.com" target="_blank">
                <Instagram />
              </IconButton>
              <IconButton color="inherit" href="https://linkedin.com" target="_blank">
                <LinkedIn />
              </IconButton>
            </Box>
          </Grid>

          {/* Newsletter Section */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>Subscribe to Our Newsletter</Typography>
            <Link href="mailto:subscribe@eventmanagement.com" variant="body2">
              Subscribe Now
            </Link>
          </Grid>
        </Grid>

        {/* Footer Bottom */}
        <Box sx={{ marginTop: '2rem', textAlign: 'center' }}>
          <Typography variant="body2">&copy; 2024 Event Management. All Rights Reserved.</Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
