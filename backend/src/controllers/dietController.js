import AIDietService from '../services/aiDietService.js';

// @desc    Get today's meal plan
// @route   GET /api/diet/today
// @access  Private
export const getTodaysMealPlan = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // For now, generate fresh plan each time
    // In production, you'd store meal plans in database
    const mealPlan = await AIDietService.generateDailyMealPlan(req.user._id, today);
    
    res.json({
      success: true,
      data: mealPlan,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

// @desc    Get weekly meal plan
// @route   GET /api/diet/weekly
// @access  Private
export const getWeeklyMealPlan = async (req, res) => {
  try {
    const startDate = req.query.startDate ? new Date(req.query.startDate) : new Date();
    
    const weeklyPlan = await AIDietService.generateWeeklyMealPlan(req.user._id, startDate);
    
    res.json({
      success: true,
      data: weeklyPlan,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

// @desc    Get nutritional information
// @route   GET /api/diet/nutrition
// @access  Private
export const getNutritionInfo = async (req, res) => {
  try {
    const { food } = req.query;
    
    if (!food) {
      return res.status(400).json({
        success: false,
        message: 'Food name is required',
      });
    }
    
    // Search for food in database
    let foundFood = null;
    for (const category of Object.values(AIDietService.foodDatabase || {})) {
      if (Array.isArray(category)) {
        foundFood = category.find(f => f.name.toLowerCase() === food.toLowerCase());
        if (foundFood) break;
      } else if (typeof category === 'object') {
        for (const subCategory of Object.values(category)) {
          foundFood = subCategory.find(f => f.name.toLowerCase() === food.toLowerCase());
          if (foundFood) break;
        }
      }
      if (foundFood) break;
    }
    
    if (!foundFood) {
      return res.status(404).json({
        success: false,
        message: 'Food not found in database',
      });
    }
    
    res.json({
      success: true,
      data: foundFood,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

// @desc    Get food alternatives
// @route   GET /api/diet/alternatives/:foodName
// @access  Private
export const getFoodAlternatives = async (req, res) => {
  try {
    const { foodName } = req.params;
    const dietPreference = req.user.dietPreference || 'non_vegetarian';
    
    const alternatives = await AIDietService.getFoodAlternatives(foodName, dietPreference);
    
    res.json({
      success: true,
      data: alternatives,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

// @desc    Log meal consumption
// @route   POST /api/diet/log
// @access  Private
export const logMeal = async (req, res) => {
  try {
    const { mealType, foods, notes } = req.body;
    
    const result = await AIDietService.logMeal(req.user._id, {
      mealType,
      foods,
      notes,
      date: new Date(),
    });
    
    res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

// @desc    Get nutritional tips
// @route   GET /api/diet/tips
// @access  Private
export const getNutritionalTips = async (req, res) => {
  try {
    const tips = await AIDietService.getNutritionalTips(req.user);
    
    res.json({
      success: true,
      data: tips,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};