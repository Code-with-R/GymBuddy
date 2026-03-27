import express from 'express';
import {
  getTodaysWorkout,
  getWeeklyPlan,
  logWorkout,
  getWorkoutHistory,
  getRecommendations,
  regenerateWorkout,
  getWorkoutStats,
} from '../controllers/workoutController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.use(protect); // All routes require authentication

router.get('/today', getTodaysWorkout);
router.get('/weekly', getWeeklyPlan);
router.get('/history', getWorkoutHistory);
router.get('/recommendations', getRecommendations);
router.get('/stats', getWorkoutStats);
router.post('/regenerate', regenerateWorkout);
router.post('/:id/log', logWorkout);

export default router;