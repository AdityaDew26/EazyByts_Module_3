import React, { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./hero.css";  // Import the CSS file

function Hero() {
  const [events] = useState([
    {
      title: "Music Concert",
      description: "Join us for an amazing night of live music!",
      date: "2024-01-15",
      image: "https://images.pexels.com/photos/976866/pexels-photo-976866.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      title: "Art Exhibition",
      description: "Explore the latest art creations from local artists.",
      date: "2024-02-20",
      image: "https://images.pexels.com/photos/1839919/pexels-photo-1839919.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      title: "Tech Conference",
      description: "Attend workshops and network with industry leaders.",
      date: "2024-03-10",
      image: "https://images.pexels.com/photos/3321791/pexels-photo-3321791.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
  ]);

  return (
    <Box className="hero-container">
      <Carousel infiniteLoop showThumbs={false} showStatus={false} autoPlay interval={5000} emulateTouch>
        {events.map((event, index) => (
          <Box key={index} sx={{ position: "relative" }}>
            <img
              src={event.image}
              alt={event.title}
              className="hero-image"
            />
            <Box className="hero-overlay">
              <Typography className="hero-title">
                {event.title}
              </Typography>
              <Typography className="hero-description">
                {event.description}
              </Typography>
              <Typography className="hero-date">
                Date: {event.date}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                className="hero-button"
              >
                Learn More
              </Button>
            </Box>
          </Box>
        ))}
      </Carousel>
    </Box>
  );
}

export default Hero;
