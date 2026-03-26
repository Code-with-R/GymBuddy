import mongoose from 'mongoose';

const workoutExerciseSchema = new mongoose.Schema({
  exerciseName: {
    type: String,
    required: true,
  },
  sets: {
    type: Number,
    required: true,
  },
  reps: {
    type: Number,
    required: true,
  },
  weight: {
    type: Number,
    default: 0,
  },
  restInterval: {
    type: Number, // in seconds
    default: 60,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  notes: {
    type: String,
  },
});

const workoutSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  dayOfWeek: {
    type: String,
    enum: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
  },
  workoutType: {
    type: String,
    enum: ['strength', 'cardio', 'hiit', 'flexibility', 'recovery'],
    default: 'strength',
  },
  exercises: [workoutExerciseSchema],
  duration: {
    type: Number, // in minutes
  },
  caloriesBurned: {
    type: Number,
  },
  notes: {
    type: String,
  },
  isAIGenerated: {
    type: Boolean,
    default: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  completedAt: {
    type: Date,
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
  },
}, {
  timestamps: true,
});

const Workout = mongoose.model('Workout', workoutSchema);
export default Workout;