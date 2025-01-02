import express from 'express';
import { registerUser, loginUser, getUserProfile, updateUserProfile } from '../controllers/userControllers.js';
import { protect } from '../middleware/auth.js';  // Fixed typo here

const router = express.Router();

router.post('/signup', registerUser);
router.post('/login', loginUser);
router.get('/profile', protect, getUserProfile);
router.put('/update', protect, updateUserProfile);

export default router;
