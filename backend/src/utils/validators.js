import { body, validationResult } from 'express-validator';

export const validateRegister = [
  body('name').notEmpty().withMessage('Name is required').trim(),
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
];

export const validateLogin = [
  body('identifier').notEmpty().withMessage('Email or mobile is required'),
  body('password').notEmpty().withMessage('Password is required'),
];

export const validateProfileUpdate = [
  body('age').optional().isInt({ min: 10, max: 100 }).withMessage('Age must be between 10 and 100'),
  body('height').optional().isFloat({ min: 100, max: 250 }).withMessage('Height must be between 100cm and 250cm'),
  body('weight').optional().isFloat({ min: 20, max: 300 }).withMessage('Weight must be between 20kg and 300kg'),
  body('fitnessGoal').optional().isIn(['fat_loss', 'muscle_gain', 'general_fitness']),
  body('experienceLevel').optional().isIn(['beginner', 'intermediate', 'advanced']),
];

export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }
  next();
};