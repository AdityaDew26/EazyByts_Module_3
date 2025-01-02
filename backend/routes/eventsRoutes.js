import express from 'express';
import { addEvent, upload, getAllEvents, addReview, bookEvent, getEvent, updateEvent, deleteEvent, getBill } from '../controllers/eventController.js';


const router = express.Router();

// Get all events
router.get('/', getAllEvents);

// Add a new event
router.post('/add', upload.single('image'), addEvent);

// Add a review to an event
router.post('/:id/review', addReview);

// Book an event (patch request)
router.patch('/:id/booking', bookEvent);

// Get details of a single event
router.get('/:id', getEvent);

// Update an event (put request)
router.put('/:id', upload.single('image'), updateEvent);

// Delete an event
router.delete('/:id', deleteEvent);

// Get the most recent bill for the event
router.get('/:id/bill', getBill);

export default router;
