import api from './api';

export const workoutService = {
  getTodaysWorkout: () => api.get('/workouts/today'),
  getWeeklyPlan: (startDate) => api.get('/workouts/weekly', { params: { startDate } }),
  logWorkout: (workoutId, data) => api.post(`/workouts/${workoutId}/log`, data),
  getWorkoutHistory: (page = 1, limit = 30) => 
    api.get('/workouts/history', { params: { page, limit } }),
  getRecommendations: () => api.get('/workouts/recommendations'),
  regenerateWorkout: (date) => api.post('/workouts/regenerate', { date }),
  getWorkoutStats: (period = 'week') => api.get('/workouts/stats', { params: { period } }),
};