import express from 'express';
import {
  addEvent,
  upload,
  getAllEvents,
  addReview,
  bookEvent,
  getEvent,
  updateEvent,
  deleteEvent,
  getBill
} from '../controllers/eventController.js';

const router = express.Router();

router.get('/', getAllEvents);
router.post('/add', upload.single('image'), addEvent);
router.post('/:id/review', addReview);
router.patch('/:id/booking', bookEvent);
router.get('/:id', getEvent);
router.put('/:id', upload.single('image'), updateEvent);
router.delete('/:id', deleteEvent);
router.get('/:id/bill', getBill);

export default router;
