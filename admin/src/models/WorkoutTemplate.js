import mongoose from 'mongoose';

const workoutTemplateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  fitnessGoal: {
    type: String,
    enum: ['fat_loss', 'muscle_gain', 'general_fitness'],
    required: true,
  },
  experienceLevel: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    required: true,
  },
  dayOfWeek: {
    type: String,
    enum: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday', 'any'],
  },
  workoutType: {
    type: String,
    enum: ['strength', 'cardio', 'hiit', 'flexibility', 'recovery'],
    default: 'strength',
  },
  exercises: [{
    exercise: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Exercise',
      required: true,
    },
    sets: {
      type: Number,
      required: true,
    },
    reps: {
      type: String, // Can be number or "to failure"
      required: true,
    },
    restInterval: {
      type: Number, // seconds
      default: 60,
    },
    notes: {
      type: String,
    },
    alternativeExercises: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Exercise',
    }],
  }],
  duration: {
    type: Number, // minutes
    required: true,
  },
  intensity: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium',
  },
  isActive: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

const WorkoutTemplate = mongoose.model('WorkoutTemplate', workoutTemplateSchema);
export default WorkoutTemplate;