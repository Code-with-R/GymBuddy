import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  // Personal Information
  name: {
    type: String,
    required: [true, 'Please add a name'],
    trim: true,
    maxlength: [50, 'Name cannot be more than 50 characters'],
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true,
    lowercase: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email',
    ],
  },
  mobile: {
    type: String,
    unique: true,
    sparse: true,
    match: [/^[0-9]{10}$/, 'Please add a valid 10-digit mobile number'],
  },
  password: {
    type: String,
    required: [true, 'Please add a password'],
    minlength: 6,
    select: false,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  profilePicture: {
    type: String,
    default: '',
  },
  
  // Fitness Profile
  age: {
    type: Number,
    min: 10,
    max: 100,
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
  },
  height: {
    type: Number, // in cm
    min: 100,
    max: 250,
  },
  weight: {
    type: Number, // in kg
    min: 20,
    max: 300,
  },
  bmi: {
    type: Number,
  },
  fitnessGoal: {
    type: String,
    enum: ['fat_loss', 'muscle_gain', 'general_fitness'],
    default: 'general_fitness',
  },
  experienceLevel: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    default: 'beginner',
  },
  activityLevel: {
    type: String,
    enum: ['sedentary', 'lightly_active', 'moderately_active', 'very_active', 'extra_active'],
    default: 'moderately_active',
  },
  healthConditions: {
    type: [String],
    default: [],
  },
  
  // Preferences
  dietPreference: {
    type: String,
    enum: ['vegetarian', 'non_vegetarian'],
    default: 'non_vegetarian',
  },
  
  // Account Status
  isActive: {
    type: Boolean,
    default: true,
  },
  lastLogin: {
    type: Date,
  },
  workoutStreak: {
    type: Number,
    default: 0,
  },
  totalWorkouts: {
    type: Number,
    default: 0,
  },
  
  // Timestamps
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true,
});

// Encrypt password using bcrypt
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Calculate BMI before saving
userSchema.pre('save', function(next) {
  if (this.height && this.weight) {
    const heightInMeters = this.height / 100;
    this.bmi = parseFloat((this.weight / (heightInMeters * heightInMeters)).toFixed(1));
  }
  next();
});

// Match user entered password to hashed password in database
userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);
export default User;