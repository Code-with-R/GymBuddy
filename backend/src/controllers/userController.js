import User from '../models/User.js';
import { upload } from '../config/cloudinary.js';

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
export const updateProfile = async (req, res) => {
  try {
    const fieldsToUpdate = {
      name: req.body.name,
      age: req.body.age,
      gender: req.body.gender,
      height: req.body.height,
      weight: req.body.weight,
      fitnessGoal: req.body.fitnessGoal,
      experienceLevel: req.body.experienceLevel,
      activityLevel: req.body.activityLevel,
      healthConditions: req.body.healthConditions,
      dietPreference: req.body.dietPreference,
    };

    // Remove undefined fields
    Object.keys(fieldsToUpdate).forEach(key => {
      if (fieldsToUpdate[key] === undefined) {
        delete fieldsToUpdate[key];
      }
    });

    const user = await User.findByIdAndUpdate(
      req.user._id,
      fieldsToUpdate,
      {
        new: true,
        runValidators: true,
      }
    ).select('-password');

    res.json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

// @desc    Upload profile picture
// @route   POST /api/users/profile-picture
// @access  Private
export const uploadProfilePicture = async (req, res) => {
  try {
    upload.single('profilePicture')(req, res, async (err) => {
      if (err) {
        return res.status(400).json({
          success: false,
          message: err.message,
        });
      }

      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: 'Please upload a file',
        });
      }

      const user = await User.findByIdAndUpdate(
        req.user._id,
        { profilePicture: req.file.path },
        { new: true }
      ).select('-password');

      res.json({
        success: true,
        data: user,
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};

// @desc    Get user stats
// @route   GET /api/users/stats
// @access  Private
export const getUserStats = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    
    const stats = {
      bmi: user.bmi,
      totalWorkouts: user.totalWorkouts,
      workoutStreak: user.workoutStreak,
      profile: {
        name: user.name,
        age: user.age,
        gender: user.gender,
        height: user.height,
        weight: user.weight,
        fitnessGoal: user.fitnessGoal,
        experienceLevel: user.experienceLevel,
      },
    };

    res.json({
      success: true,
      data: stats,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};