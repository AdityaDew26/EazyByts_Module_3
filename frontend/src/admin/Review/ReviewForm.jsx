import React, { useEffect, useState } from 'react';
import { TextField, Button, Stack, Typography, Divider, Box, Snackbar } from '@mui/material';
import API from '../../api/EventApi';

const ReviewForm = ({ eventId }) => {
  const [comment, setComment] = useState('');
  const [reviews, setReviews] = useState([]);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await API.get(`/events/${eventId}`);
        if (res.data.reviews) {
          setReviews(res.data.reviews);
        }
      } catch (err) {
        console.error('Failed to fetch event reviews', err);
      }
    };

    fetchEvent();
  }, [eventId]);

  const handleSubmit = async () => {
    if (!comment.trim()) {
      setSnackbar({ open: true, message: 'Please write a review before submitting.', severity: 'error' });
      return;
    }

    try {
      const res = await API.post(`/events/${eventId}/review`, { comment });
      setSnackbar({ open: true, message: '✅ Review submitted!', severity: 'success' });
      setReviews((prev) => [...prev, res.data]);
      setComment('');
    } catch (err) {
      console.error('Review Error:', err);
      setSnackbar({ open: true, message: err.response?.data?.error || '❌ Failed to submit review.', severity: 'error' });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Stack spacing={3} mt={4}>
      <Typography variant="h6">Leave a Review</Typography>

      <TextField
        label="Your Review"
        multiline
        rows={3}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        fullWidth
      />
      <Button variant="contained" onClick={handleSubmit}>
        Submit Review
      </Button>

      <Divider sx={{ my: 2 }} />

      <Typography variant="h6">Reviews</Typography>
      {reviews.length === 0 ? (
        <Typography>No reviews yet.</Typography>
      ) : (
        reviews.map((review, index) => (
          <Box key={index} p={1} borderBottom="1px solid #ccc">
            <Typography>{review.comment}</Typography>
            <Typography variant="caption" color="text.secondary">
              {new Date(review.date).toLocaleString()}
            </Typography>
          </Box>
        ))
      )}

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={snackbar.message}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      />
    </Stack>
  );
};

export default ReviewForm;
