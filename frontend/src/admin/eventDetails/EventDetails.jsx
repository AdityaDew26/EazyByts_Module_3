import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, TextField } from '@mui/material';
import Payment from '../../components/booking/Payment';
import './details.css';


const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [review, setReview] = useState('');
  const [reviews, setReviews] = useState([]);
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [peopleCount, setPeopleCount] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/events/${id}`)
      .then((response) => {
        setEvent(response.data);
        setReviews(response.data.reviews || []);
      })
      .catch((error) => console.error('Error fetching event:', error));
  }, [id]);

  const handleReviewSubmit = () => {
    if (!review.trim()) return;
    const newReview = {
      comment: review,
      date: new Date().toISOString(),
    };
    axios
      .post(`http://localhost:5000/api/events/${id}/review`, newReview)
      .then((response) => {
        setReviews([...reviews, response.data]);
        setReview('');
      })
      .catch((error) => console.error('Error adding review:', error));
  };

 const handlePaymentChange = () => {
  console.log('Booking request data:', { peopleCount }); 
  axios
    .patch(`http://localhost:5000/api/events/${id}/booking`, { peopleCount })
    .then((response) => {
      console.log('Booking success:', response.data);
      setPaymentOpen(true); // Show payment modal or continue with payment flow
    })
    .catch((error) => {
      console.error('Booking error:', error);
      alert('Error booking event. Please try again.');
    });
};

  const handlePaymentSuccess = (method, details) => {
    alert('Payment successful!');
    navigate(`/event/${id}`);
  };

  const handleIncrease = () => {
    setPeopleCount(peopleCount + 1);
  };

  const handleDecrease = () => {
    setPeopleCount(peopleCount - 1);
  };

  if (!event) return <div>Loading...</div>;

  return (
    <div className="event-details-container">
      {event.image && (
        <img
          src={event.image}
          alt={event.title}
          className="event-image"
        />
      )}
      <h2>{event.title}</h2>
      <p>{event.description}</p>
      <p><strong>Date:</strong> {new Date(event.date).toLocaleString()}</p>
      <p><strong>Location:</strong> {event.location}</p>
      <p><strong>Price:</strong> ${event.price || 'Free'}</p>
      <p><strong>Available Spots:</strong> {event.availableSpots}</p>

      <div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Button onClick={handleDecrease} disabled={peopleCount <= 1}>-</Button>
          <TextField
            value={peopleCount}
            onChange={(e) => setPeopleCount(Number(e.target.value))}
            type="number"
            inputProps={{
              min: 1,
              max: event.availableSpots,
            }}
            style={{ marginLeft: 10, marginRight: 10, width: '100px' }}
          />
          <Button onClick={handleIncrease} disabled={peopleCount >= event.availableSpots}>+</Button>
        </div>
        <Button
          variant="contained"
          color="primary"
          onClick={handlePaymentChange}
          style={{ marginTop: '10px' }}
        >
          Book Now
        </Button>
      </div>

      <div className="reviews-section">
        <h3>Reviews</h3>
        {reviews.length > 0 ? (
          reviews.map((r, index) => (
            <div key={index} className="review">
              <p>{r.comment}</p>
              <small>{new Date(r.date).toLocaleString()}</small>
            </div>
          ))
        ) : (
          <p>No reviews yet. Be the first to review!</p>
        )}
        <div className="add-review">
          <TextField
            label="Write a review"
            fullWidth
            value={review}
            onChange={(e) => setReview(e.target.value)}
          />
          <Button
            variant="contained"
            color="secondary"
            onClick={handleReviewSubmit}
            style={{ marginTop: '10px' }}
          >
            Submit Review
          </Button>
        </div>
      </div>

      <Payment
        open={paymentOpen}
        onClose={() => setPaymentOpen(false)}
        onPaymentSuccess={handlePaymentSuccess}
      />
    </div>
  );
};

export default EventDetails;
