import Workout from '../models/Workout.js';
import AIWorkoutService from '../services/aiWorkoutService.js';

// @desc    Get today's workout
// @route   GET /api/workouts/today
// @access  Private
export const getTodaysWorkout = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    let workout = await Workout.findOne({
      user: req.user._id,
      date: {
        $gte: today,
        $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000),
      },
    });
    
    if (!workout) {
      // Generate new workout if none exists
      workout = await AIWorkoutService.generateWorkoutPlan(req.user._id, today);
    }
    
    res.json({
      success: true,
      data: workout,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

// @desc    Get weekly workout plan
// @route   GET /api/workouts/weekly
// @access  Private
export const getWeeklyPlan = async (req, res) => {
  try {
    const startDate = req.query.startDate ? new Date(req.query.startDate) : new Date();
    
    let weeklyPlan = await Workout.find({
      user: req.user._id,
      date: {
        $gte: new Date(startDate.setHours(0, 0, 0, 0)),
        $lt: new Date(startDate.getTime() + 7 * 24 * 60 * 60 * 1000),
      },
    }).sort({ date: 1 });
    
    if (weeklyPlan.length === 0) {
      weeklyPlan = await AIWorkoutService.generateWeeklyPlan(req.user._id, startDate);
    }
    
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

// @desc    Log completed workout
// @route   POST /api/workouts/:id/log
// @access  Private
export const logWorkout = async (req, res) => {
  try {
    const { exercises, duration, notes, rating } = req.body;
    
    const workout = await Workout.findById(req.params.id);
    
    if (!workout) {
      return res.status(404).json({
        success: false,
        message: 'Workout not found',
      });
    }
    
    // Verify workout belongs to user
    if (workout.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized',
      });
    }
    
    // Update workout with completion data
    workout.completed = true;
    workout.completedAt = Date.now();
    workout.exercises = exercises || workout.exercises;
    workout.duration = duration || workout.duration;
    workout.notes = notes;
    workout.rating = rating;
    
    await workout.save();
    
    // Update progression and generate next workout
    const nextWorkout = await AIWorkoutService.updateWorkoutProgression(workout._id);
    
    res.json({
      success: true,
      data: workout,
      nextWorkout: nextWorkout,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

// @desc    Get workout history
// @route   GET /api/workouts/history
// @access  Private
export const getWorkoutHistory = async (req, res) => {
  try {
    const { limit = 30, page = 1 } = req.query;
    
    const workouts = await Workout.find({
      user: req.user._id,
      completed: true,
    })
      .sort({ date: -1 })
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit));
    
    const total = await Workout.countDocuments({
      user: req.user._id,
      completed: true,
    });
    
    res.json({
      success: true,
      data: workouts,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit)),
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

// @desc    Get workout recommendations
// @route   GET /api/workouts/recommendations
// @access  Private
export const getRecommendations = async (req, res) => {
  try {
    const recommendations = await AIWorkoutService.getRecommendations(req.user._id);
    
    res.json({
      success: true,
      data: recommendations,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

// @desc    Regenerate workout plan
// @route   POST /api/workouts/regenerate
// @access  Private
export const regenerateWorkout = async (req, res) => {
  try {
    const { date } = req.body;
    const targetDate = date ? new Date(date) : new Date();
    
    // Delete existing workout for that day
    await Workout.deleteOne({
      user: req.user._id,
      date: {
        $gte: new Date(targetDate.setHours(0, 0, 0, 0)),
        $lt: new Date(targetDate.getTime() + 24 * 60 * 60 * 1000),
      },
    });
    
    // Generate new workout
    const newWorkout = await AIWorkoutService.generateWorkoutPlan(req.user._id, targetDate);
    
    res.json({
      success: true,
      data: newWorkout,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

// @desc    Get workout stats
// @route   GET /api/workouts/stats
// @access  Private
export const getWorkoutStats = async (req, res) => {
  try {
    const { period = 'week' } = req.query;
    
    let startDate = new Date();
    if (period === 'week') {
      startDate.setDate(startDate.getDate() - 7);
    } else if (period === 'month') {
      startDate.setMonth(startDate.getMonth() - 1);
    } else if (period === 'year') {
      startDate.setFullYear(startDate.getFullYear() - 1);
    }
    
    const workouts = await Workout.find({
      user: req.user._id,
      completed: true,
      date: { $gte: startDate },
    }).sort({ date: 1 });
    
    // Calculate stats
    const totalWorkouts = workouts.length;
    const totalDuration = workouts.reduce((sum, w) => sum + (w.duration || 0), 0);
    const totalCalories = workouts.reduce((sum, w) => sum + (w.caloriesBurned || 0), 0);
    const averageRating = workouts.reduce((sum, w) => sum + (w.rating || 0), 0) / (totalWorkouts || 1);
    
    // Group by day for chart data
    const dailyData = {};
    workouts.forEach(workout => {
      const dateKey = workout.date.toISOString().split('T')[0];
      if (!dailyData[dateKey]) {
        dailyData[dateKey] = {
          date: dateKey,
          duration: 0,
          calories: 0,
          exercises: 0,
        };
      }
      dailyData[dateKey].duration += workout.duration || 0;
      dailyData[dateKey].calories += workout.caloriesBurned || 0;
      dailyData[dateKey].exercises += workout.exercises.length;
    });
    
    const chartData = Object.values(dailyData);
    
    res.json({
      success: true,
      data: {
        totalWorkouts,
        totalDuration,
        totalCalories,
        averageRating: averageRating.toFixed(1),
        chartData,
        recentWorkouts: workouts.slice(-5).reverse(),
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};