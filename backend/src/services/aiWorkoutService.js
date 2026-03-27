import User from '../models/User.js';
import Workout from '../models/Workout.js';

// Exercise database
const exerciseDatabase = {
  // Chest exercises
  chest: {
    beginner: [
      { name: 'Push-ups', sets: 3, reps: '8-12', rest: 60, equipment: 'bodyweight', difficulty: 1 },
      { name: 'Dumbbell Bench Press', sets: 3, reps: '10-12', rest: 60, equipment: 'dumbbells', difficulty: 2 },
      { name: 'Chest Fly', sets: 3, reps: '12-15', rest: 60, equipment: 'dumbbells', difficulty: 2 },
      { name: 'Incline Push-ups', sets: 3, reps: '10-15', rest: 60, equipment: 'bodyweight', difficulty: 1 },
    ],
    intermediate: [
      { name: 'Barbell Bench Press', sets: 4, reps: '8-10', rest: 90, equipment: 'barbell', difficulty: 3 },
      { name: 'Incline Dumbbell Press', sets: 4, reps: '8-12', rest: 90, equipment: 'dumbbells', difficulty: 3 },
      { name: 'Decline Bench Press', sets: 4, reps: '8-10', rest: 90, equipment: 'barbell', difficulty: 3 },
      { name: 'Dumbbell Pullover', sets: 3, reps: '10-12', rest: 60, equipment: 'dumbbell', difficulty: 3 },
      { name: 'Cable Crossovers', sets: 3, reps: '12-15', rest: 60, equipment: 'cable', difficulty: 3 },
    ],
    advanced: [
      { name: 'Weighted Dips', sets: 5, reps: '6-8', rest: 120, equipment: 'weight belt', difficulty: 4 },
      { name: 'Incline Barbell Press', sets: 5, reps: '6-8', rest: 120, equipment: 'barbell', difficulty: 4 },
      { name: 'Pec Deck Machine', sets: 4, reps: '10-12', rest: 90, equipment: 'machine', difficulty: 4 },
      { name: 'Smith Machine Press', sets: 4, reps: '8-10', rest: 90, equipment: 'smith machine', difficulty: 4 },
      { name: 'Dumbbell Floor Press', sets: 4, reps: '8-10', rest: 90, equipment: 'dumbbells', difficulty: 4 },
    ],
  },
  
  // Back exercises
  back: {
    beginner: [
      { name: 'Lat Pulldowns', sets: 3, reps: '10-12', rest: 60, equipment: 'cable', difficulty: 2 },
      { name: 'Seated Cable Rows', sets: 3, reps: '10-12', rest: 60, equipment: 'cable', difficulty: 2 },
      { name: 'Dumbbell Rows', sets: 3, reps: '10-12', rest: 60, equipment: 'dumbbell', difficulty: 2 },
      { name: 'Face Pulls', sets: 3, reps: '12-15', rest: 60, equipment: 'cable', difficulty: 2 },
    ],
    intermediate: [
      { name: 'Bent Over Barbell Rows', sets: 4, reps: '8-10', rest: 90, equipment: 'barbell', difficulty: 3 },
      { name: 'Pull-ups', sets: 4, reps: '8-12', rest: 90, equipment: 'pull-up bar', difficulty: 3 },
      { name: 'T-bar Rows', sets: 4, reps: '8-10', rest: 90, equipment: 'machine', difficulty: 3 },
      { name: 'Single Arm Dumbbell Rows', sets: 4, reps: '10-12', rest: 60, equipment: 'dumbbell', difficulty: 3 },
      { name: 'Reverse Flyes', sets: 3, reps: '12-15', rest: 60, equipment: 'dumbbells', difficulty: 3 },
    ],
    advanced: [
      { name: 'Deadlifts', sets: 5, reps: '5-8', rest: 120, equipment: 'barbell', difficulty: 5 },
      { name: 'Weighted Pull-ups', sets: 5, reps: '6-8', rest: 120, equipment: 'weight belt', difficulty: 4 },
      { name: 'Pendlay Rows', sets: 5, reps: '5-8', rest: 120, equipment: 'barbell', difficulty: 4 },
      { name: 'Rack Pulls', sets: 4, reps: '6-8', rest: 120, equipment: 'barbell', difficulty: 4 },
      { name: 'Meadows Rows', sets: 4, reps: '8-10', rest: 90, equipment: 'barbell', difficulty: 4 },
    ],
  },
  
  // Leg exercises
  legs: {
    beginner: [
      { name: 'Bodyweight Squats', sets: 3, reps: '12-15', rest: 60, equipment: 'bodyweight', difficulty: 1 },
      { name: 'Lunges', sets: 3, reps: '10-12', rest: 60, equipment: 'bodyweight', difficulty: 2 },
      { name: 'Leg Press', sets: 3, reps: '10-12', rest: 60, equipment: 'machine', difficulty: 2 },
      { name: 'Leg Curls', sets: 3, reps: '12-15', rest: 60, equipment: 'machine', difficulty: 2 },
      { name: 'Calf Raises', sets: 3, reps: '15-20', rest: 45, equipment: 'bodyweight', difficulty: 1 },
    ],
    intermediate: [
      { name: 'Goblet Squats', sets: 4, reps: '8-12', rest: 90, equipment: 'dumbbell', difficulty: 3 },
      { name: 'Romanian Deadlifts', sets: 4, reps: '8-10', rest: 90, equipment: 'barbell', difficulty: 3 },
      { name: 'Bulgarian Split Squats', sets: 4, reps: '8-10', rest: 90, equipment: 'dumbbells', difficulty: 3 },
      { name: 'Leg Extensions', sets: 3, reps: '10-12', rest: 60, equipment: 'machine', difficulty: 2 },
      { name: 'Hip Thrusts', sets: 4, reps: '10-12', rest: 90, equipment: 'barbell', difficulty: 3 },
    ],
    advanced: [
      { name: 'Barbell Back Squats', sets: 5, reps: '5-8', rest: 120, equipment: 'barbell', difficulty: 5 },
      { name: 'Front Squats', sets: 5, reps: '6-8', rest: 120, equipment: 'barbell', difficulty: 4 },
      { name: 'Sumo Deadlifts', sets: 5, reps: '5-8', rest: 120, equipment: 'barbell', difficulty: 5 },
      { name: 'Nordic Curls', sets: 4, reps: '8-10', rest: 90, equipment: 'bodyweight', difficulty: 4 },
      { name: 'Pistol Squats', sets: 4, reps: '6-8', rest: 90, equipment: 'bodyweight', difficulty: 4 },
    ],
  },
  
  // Shoulder exercises
  shoulders: {
    beginner: [
      { name: 'Dumbbell Overhead Press', sets: 3, reps: '10-12', rest: 60, equipment: 'dumbbells', difficulty: 2 },
      { name: 'Lateral Raises', sets: 3, reps: '12-15', rest: 60, equipment: 'dumbbells', difficulty: 2 },
      { name: 'Front Raises', sets: 3, reps: '12-15', rest: 60, equipment: 'dumbbells', difficulty: 2 },
      { name: 'Bent-over Lateral Raises', sets: 3, reps: '12-15', rest: 60, equipment: 'dumbbells', difficulty: 2 },
    ],
    intermediate: [
      { name: 'Arnold Press', sets: 4, reps: '8-12', rest: 90, equipment: 'dumbbells', difficulty: 3 },
      { name: 'Upright Rows', sets: 4, reps: '10-12', rest: 90, equipment: 'barbell', difficulty: 3 },
      { name: 'Cable Lateral Raises', sets: 4, reps: '10-12', rest: 60, equipment: 'cable', difficulty: 3 },
      { name: 'Face Pulls', sets: 4, reps: '12-15', rest: 60, equipment: 'cable', difficulty: 3 },
    ],
    advanced: [
      { name: 'Military Press', sets: 5, reps: '5-8', rest: 120, equipment: 'barbell', difficulty: 4 },
      { name: 'Handstand Push-ups', sets: 4, reps: '6-10', rest: 90, equipment: 'bodyweight', difficulty: 5 },
      { name: 'Plate Raises', sets: 4, reps: '10-12', rest: 90, equipment: 'weight plate', difficulty: 4 },
      { name: 'Reverse Pec Deck', sets: 4, reps: '10-12', rest: 90, equipment: 'machine', difficulty: 3 },
    ],
  },
  
  // Arm exercises
  arms: {
    beginner: [
      { name: 'Bicep Curls', sets: 3, reps: '10-12', rest: 60, equipment: 'dumbbells', difficulty: 2 },
      { name: 'Tricep Pushdowns', sets: 3, reps: '10-12', rest: 60, equipment: 'cable', difficulty: 2 },
      { name: 'Hammer Curls', sets: 3, reps: '10-12', rest: 60, equipment: 'dumbbells', difficulty: 2 },
      { name: 'Overhead Tricep Extensions', sets: 3, reps: '10-12', rest: 60, equipment: 'dumbbell', difficulty: 2 },
    ],
    intermediate: [
      { name: 'Barbell Curls', sets: 4, reps: '8-10', rest: 90, equipment: 'barbell', difficulty: 3 },
      { name: 'Close Grip Bench Press', sets: 4, reps: '8-10', rest: 90, equipment: 'barbell', difficulty: 3 },
      { name: 'Preacher Curls', sets: 4, reps: '10-12', rest: 90, equipment: 'machine', difficulty: 3 },
      { name: 'Skull Crushers', sets: 4, reps: '8-10', rest: 90, equipment: 'barbell', difficulty: 3 },
      { name: 'Concentration Curls', sets: 3, reps: '10-12', rest: 60, equipment: 'dumbbell', difficulty: 3 },
    ],
    advanced: [
      { name: 'Weighted Chin-ups', sets: 5, reps: '6-8', rest: 120, equipment: 'weight belt', difficulty: 4 },
      { name: 'Dips', sets: 5, reps: '8-12', rest: 120, equipment: 'bodyweight', difficulty: 4 },
      { name: 'Spider Curls', sets: 4, reps: '8-10', rest: 90, equipment: 'barbell', difficulty: 4 },
      { name: 'French Press', sets: 4, reps: '8-10', rest: 90, equipment: 'dumbbell', difficulty: 4 },
    ],
  },
  
  // Core exercises
  core: {
    beginner: [
      { name: 'Planks', sets: 3, reps: '30-60 sec', rest: 60, equipment: 'bodyweight', difficulty: 1 },
      { name: 'Crunches', sets: 3, reps: '15-20', rest: 45, equipment: 'bodyweight', difficulty: 1 },
      { name: 'Leg Raises', sets: 3, reps: '10-15', rest: 60, equipment: 'bodyweight', difficulty: 2 },
      { name: 'Russian Twists', sets: 3, reps: '10-12', rest: 45, equipment: 'bodyweight', difficulty: 2 },
    ],
    intermediate: [
      { name: 'Hanging Leg Raises', sets: 4, reps: '10-12', rest: 90, equipment: 'pull-up bar', difficulty: 3 },
      { name: 'Cable Crunches', sets: 4, reps: '12-15', rest: 60, equipment: 'cable', difficulty: 3 },
      { name: 'Side Planks', sets: 4, reps: '45 sec', rest: 60, equipment: 'bodyweight', difficulty: 3 },
      { name: 'Ab Wheel Rollouts', sets: 4, reps: '8-10', rest: 90, equipment: 'ab wheel', difficulty: 3 },
    ],
    advanced: [
      { name: 'Dragon Flags', sets: 4, reps: '6-8', rest: 90, equipment: 'bodyweight', difficulty: 5 },
      { name: 'Weighted Planks', sets: 4, reps: '60 sec', rest: 90, equipment: 'weight plate', difficulty: 4 },
      { name: 'V-ups', sets: 4, reps: '12-15', rest: 60, equipment: 'bodyweight', difficulty: 4 },
      { name: 'L-sits', sets: 4, reps: '20-30 sec', rest: 60, equipment: 'parallel bars', difficulty: 4 },
    ],
  },
  
  // Cardio exercises
  cardio: {
    beginner: [
      { name: 'Walking', duration: '20-30 min', intensity: 'moderate', equipment: 'none', difficulty: 1 },
      { name: 'Stationary Bike', duration: '15-20 min', intensity: 'moderate', equipment: 'bike', difficulty: 1 },
      { name: 'Elliptical', duration: '15-20 min', intensity: 'moderate', equipment: 'elliptical', difficulty: 1 },
    ],
    intermediate: [
      { name: 'Jogging', duration: '20-30 min', intensity: 'moderate-high', equipment: 'none', difficulty: 2 },
      { name: 'Rowing Machine', duration: '15-20 min', intensity: 'high', equipment: 'rower', difficulty: 2 },
      { name: 'Jump Rope', duration: '10-15 min', intensity: 'high', equipment: 'jump rope', difficulty: 2 },
    ],
    advanced: [
      { name: 'Running', duration: '30-45 min', intensity: 'high', equipment: 'none', difficulty: 3 },
      { name: 'HIIT Sprints', duration: '20 min', intensity: 'maximum', equipment: 'none', difficulty: 4 },
      { name: 'Stair Climber', duration: '20-30 min', intensity: 'high', equipment: 'stairmaster', difficulty: 3 },
    ],
  },
};

// Split routines based on experience level
const workoutSplits = {
  beginner: {
    name: 'Full Body',
    days: {
      monday: ['chest', 'back', 'legs', 'core'],
      wednesday: ['chest', 'back', 'legs', 'core'],
      friday: ['chest', 'back', 'legs', 'core'],
    },
  },
  intermediate: {
    name: 'Upper/Lower Split',
    days: {
      monday: ['chest', 'back', 'shoulders', 'arms'],
      tuesday: ['legs', 'core'],
      thursday: ['chest', 'back', 'shoulders', 'arms'],
      friday: ['legs', 'core'],
    },
  },
  advanced: {
    name: 'Push/Pull/Legs',
    days: {
      monday: ['chest', 'shoulders', 'arms'], // Push
      tuesday: ['back', 'arms'], // Pull
      wednesday: ['legs', 'core'],
      thursday: ['chest', 'shoulders', 'arms'], // Push
      friday: ['back', 'arms'], // Pull
      saturday: ['legs', 'core'],
    },
  },
};

class AIWorkoutService {
  // Generate personalized workout plan
  static async generateWorkoutPlan(userId, date = new Date()) {
    try {
      const user = await User.findById(userId);
      if (!user) {
        throw new Error('User not found');
      }

      const experienceLevel = user.experienceLevel || 'beginner';
      const fitnessGoal = user.fitnessGoal || 'general_fitness';
      const dayOfWeek = this.getDayOfWeek(date);
      
      // Get appropriate split for experience level
      const split = workoutSplits[experienceLevel];
      const muscleGroups = split.days[dayOfWeek];
      
      if (!muscleGroups) {
        return null; // Rest day
      }
      
      // Generate exercises for each muscle group
      const exercises = [];
      for (const muscleGroup of muscleGroups) {
        const groupExercises = this.selectExercisesForGroup(
          muscleGroup,
          experienceLevel,
          fitnessGoal
        );
        exercises.push(...groupExercises);
      }
      
      // Calculate estimated duration and calories
      const duration = this.calculateWorkoutDuration(exercises);
      const caloriesBurned = this.calculateCaloriesBurned(user, duration, exercises);
      
      // Create workout object
      const workout = {
        user: userId,
        date: date,
        dayOfWeek: dayOfWeek,
        workoutType: this.determineWorkoutType(muscleGroups),
        exercises: exercises,
        duration: duration,
        caloriesBurned: caloriesBurned,
        isAIGenerated: true,
      };
      
      // Save to database
      const savedWorkout = await Workout.create(workout);
      
      return savedWorkout;
    } catch (error) {
      console.error('Error generating workout plan:', error);
      throw error;
    }
  }
  
  // Select exercises for a muscle group based on experience and goal
  static selectExercisesForGroup(muscleGroup, experienceLevel, fitnessGoal) {
    const exercises = exerciseDatabase[muscleGroup];
    if (!exercises) return [];
    
    const levelExercises = exercises[experienceLevel] || exercises.beginner;
    
    // Select 2-3 exercises per muscle group based on goal
    let numberOfExercises = 2;
    if (experienceLevel === 'intermediate') numberOfExercises = 3;
    if (experienceLevel === 'advanced') numberOfExercises = 4;
    
    // Adjust based on fitness goal
    if (fitnessGoal === 'muscle_gain' && experienceLevel !== 'beginner') {
      numberOfExercises += 1;
    }
    
    // Shuffle and select exercises
    const shuffled = [...levelExercises];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    
    const selected = shuffled.slice(0, numberOfExercises);
    
    // Format exercises with proper reps and sets
    return selected.map(exercise => ({
      exerciseName: exercise.name,
      sets: exercise.sets,
      reps: this.calculateReps(exercise.reps, fitnessGoal),
      restInterval: exercise.rest,
      weight: 0, // Will be updated by user during tracking
      completed: false,
    }));
  }
  
  // Calculate reps based on fitness goal
  static calculateReps(repsRange, fitnessGoal) {
    if (typeof repsRange === 'string') {
      // Handle string ranges like "8-12"
      const [min, max] = repsRange.split('-').map(Number);
      if (fitnessGoal === 'muscle_gain') {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      } else if (fitnessGoal === 'fat_loss') {
        return Math.floor(Math.random() * (max - min + 1)) + min + 2;
      } else {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }
    }
    return repsRange;
  }
  
  // Calculate workout duration in minutes
  static calculateWorkoutDuration(exercises) {
    let totalMinutes = 0;
    for (const exercise of exercises) {
      // Time per set: rest + execution time
      const setTime = (exercise.restInterval / 60) + 0.5; // 30 sec execution per set
      totalMinutes += setTime * exercise.sets;
    }
    // Add warm-up and cool-down time
    totalMinutes += 10;
    return Math.round(totalMinutes);
  }
  
  // Calculate calories burned
  static calculateCaloriesBurned(user, durationMinutes, exercises) {
    // MET values for different workout types
    let metValue = 6; // Default MET for moderate exercise
    
    // Adjust MET based on exercises
    const hasHighIntensity = exercises.some(ex => 
      exerciseDatabase[Object.keys(exerciseDatabase).find(key => 
        exerciseDatabase[key][user.experienceLevel]?.some(e => e.name === ex.exerciseName)
      )]?.advanced?.some(e => e.name === ex.exerciseName)
    );
    
    if (hasHighIntensity) metValue = 8;
    else if (user.experienceLevel === 'beginner') metValue = 5;
    
    // Calculate calories: MET * weight(kg) * (duration/60)
    const weight = user.weight || 70;
    const calories = Math.round(metValue * weight * (durationMinutes / 60));
    
    return calories;
  }
  
  // Determine workout type based on muscle groups
  static determineWorkoutType(muscleGroups) {
    if (muscleGroups.includes('cardio')) return 'cardio';
    if (muscleGroups.includes('core') && muscleGroups.length === 1) return 'flexibility';
    if (muscleGroups.includes('chest') && muscleGroups.includes('back')) return 'strength';
    if (muscleGroups.length > 3) return 'strength';
    return 'strength';
  }
  
  // Get day of week
  static getDayOfWeek(date) {
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    return days[date.getDay()];
  }
  
  // Generate weekly workout plan
  static async generateWeeklyPlan(userId, startDate = new Date()) {
    try {
      const weeklyPlan = [];
      const startOfWeek = new Date(startDate);
      startOfWeek.setDate(startDate.getDate() - startDate.getDay() + 1); // Start from Monday
      
      for (let i = 0; i < 7; i++) {
        const currentDate = new Date(startOfWeek);
        currentDate.setDate(startOfWeek.getDate() + i);
        
        const workout = await this.generateWorkoutPlan(userId, currentDate);
        if (workout) {
          weeklyPlan.push(workout);
        }
      }
      
      return weeklyPlan;
    } catch (error) {
      console.error('Error generating weekly plan:', error);
      throw error;
    }
  }
  
  // Update workout progression
  static async updateWorkoutProgression(workoutId) {
    try {
      const workout = await Workout.findById(workoutId);
      if (!workout) throw new Error('Workout not found');
      
      const user = await User.findById(workout.user);
      
      // Update user stats
      user.totalWorkouts += 1;
      
      // Update streak
      const lastWorkout = await Workout.findOne({
        user: workout.user,
        completed: true,
        date: { $lt: workout.date },
      }).sort({ date: -1 });
      
      if (lastWorkout) {
        const daysDifference = Math.floor((workout.date - lastWorkout.date) / (1000 * 60 * 60 * 24));
        if (daysDifference === 1) {
          user.workoutStreak += 1;
        } else if (daysDifference > 1) {
          user.workoutStreak = 1;
        }
      } else {
        user.workoutStreak = 1;
      }
      
      await user.save();
      
      // Generate next workout with progressive overload
      const nextWorkout = await this.generateWorkoutPlan(
        workout.user,
        new Date(workout.date.getTime() + 24 * 60 * 60 * 1000)
      );
      
      // Apply progressive overload
      if (nextWorkout && user.experienceLevel !== 'beginner') {
        for (let i = 0; i < nextWorkout.exercises.length; i++) {
          const currentExercise = nextWorkout.exercises[i];
          const previousExercise = workout.exercises.find(e => e.exerciseName === currentExercise.exerciseName);
          
          if (previousExercise && previousExercise.completed) {
            // Increase weight or reps by 5-10%
            if (previousExercise.weight > 0) {
              currentExercise.weight = Math.round(previousExercise.weight * 1.05);
            }
            
            // Adjust reps for progression
            if (typeof currentExercise.reps === 'number') {
              currentExercise.reps = Math.min(currentExercise.reps + 1, 15);
            }
          }
        }
      }
      
      return nextWorkout;
    } catch (error) {
      console.error('Error updating workout progression:', error);
      throw error;
    }
  }
  
  // Get workout recommendations based on user feedback
  static async getRecommendations(userId) {
    try {
      const user = await User.findById(userId);
      const recentWorkouts = await Workout.find({
        user: userId,
        completed: true,
      })
        .sort({ date: -1 })
        .limit(5);
      
      const recommendations = {
        suggestedAdjustments: [],
        improvementAreas: [],
        motivationalMessage: '',
      };
      
      // Analyze recent workouts
      if (recentWorkouts.length > 0) {
        const completionRate = recentWorkouts.filter(w => w.completed).length / recentWorkouts.length;
        
        if (completionRate < 0.6) {
          recommendations.suggestedAdjustments.push(
            'Consider reducing workout intensity or volume',
            'Take more rest days between sessions'
          );
          recommendations.motivationalMessage = 'Consistency is key! Start with smaller goals and build up.';
        } else if (completionRate > 0.9) {
          recommendations.suggestedAdjustments.push(
            'Increase weight by 5-10% for compound exercises',
            'Add an extra set to challenging exercises'
          );
          recommendations.motivationalMessage = 'Great progress! Time to level up your training.';
        }
        
        // Check muscle group balance
        const muscleGroupsWorked = new Set();
        recentWorkouts.forEach(workout => {
          workout.exercises.forEach(exercise => {
            for (const [group, exercises] of Object.entries(exerciseDatabase)) {
              if (Object.values(exercises).some(levelExercises => 
                levelExercises.some(e => e.name === exercise.exerciseName)
              )) {
                muscleGroupsWorked.add(group);
              }
            }
          });
        });
        
        if (muscleGroupsWorked.size < 3) {
          recommendations.improvementAreas.push(
            'Incorporate more variety in your workouts',
            'Add exercises for muscle groups you rarely train'
          );
        }
      }
      
      return recommendations;
    } catch (error) {
      console.error('Error getting recommendations:', error);
      throw error;
    }
  }
}

export default AIWorkoutService;