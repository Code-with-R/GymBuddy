import mongoose from 'mongoose';

const exerciseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  category: {
    type: String,
    enum: ['chest', 'back', 'legs', 'shoulders', 'arms', 'core', 'cardio', 'full_body'],
    required: true,
  },
  muscleGroups: [{
    type: String,
    enum: ['chest', 'back', 'shoulders', 'biceps', 'triceps', 'quadriceps', 'hamstrings', 'glutes', 'calves', 'abs', 'lower_back'],
  }],
  equipment: {
    type: [String],
    default: ['bodyweight'],
  },
  difficulty: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  instructions: [{
    type: String,
  }],
  videoUrl: {
    type: String,
  },
  imageUrl: {
    type: String,
  },
  caloriesPerMinute: {
    type: Number,
    default: 5,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

const Exercise = mongoose.model('Exercise', exerciseSchema);
export default Exercise;