import express from 'express';
import {
  register,
  login,
  adminLogin,
  getMe,
} from '../controllers/authController.js';
import {
  validateRegister,
  validateLogin,
  handleValidationErrors,
} from '../utils/validators.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/register', validateRegister, handleValidationErrors, register);
router.post('/login', validateLogin, handleValidationErrors, login);
router.post('/admin/login', validateLogin, handleValidationErrors, adminLogin);
router.get('/me', protect, getMe);

export default router;