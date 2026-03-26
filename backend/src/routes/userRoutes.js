import express from 'express';
import {
  updateProfile,
  uploadProfilePicture,
  getUserStats,
} from '../controllers/userController.js';
import { protect } from '../middleware/auth.js';
import { validateProfileUpdate, handleValidationErrors } from '../utils/validators.js';

const router = express.Router();

router.use(protect); // All routes require authentication

router.put('/profile', validateProfileUpdate, handleValidationErrors, updateProfile);
router.post('/profile-picture', uploadProfilePicture);
router.get('/stats', getUserStats);

export default router;