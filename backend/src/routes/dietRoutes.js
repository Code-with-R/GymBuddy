import express from 'express';
import {
  getTodaysMealPlan,
  getWeeklyMealPlan,
  getNutritionInfo,
  getFoodAlternatives,
  logMeal,
  getNutritionalTips,
} from '../controllers/dietController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.use(protect); // All routes require authentication

router.get('/today', getTodaysMealPlan);
router.get('/weekly', getWeeklyMealPlan);
router.get('/nutrition', getNutritionInfo);
router.get('/tips', getNutritionalTips);
router.get('/alternatives/:foodName', getFoodAlternatives);
router.post('/log', logMeal);

export default router;