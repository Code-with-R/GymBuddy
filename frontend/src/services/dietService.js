import api from './api';

export const dietService = {
  getTodaysMealPlan: () => api.get('/diet/today'),
  getWeeklyMealPlan: (startDate) => api.get('/diet/weekly', { params: { startDate } }),
  getNutritionInfo: (food) => api.get('/diet/nutrition', { params: { food } }),
  getFoodAlternatives: (foodName) => api.get(`/diet/alternatives/${foodName}`),
  logMeal: (data) => api.post('/diet/log', data),
  getNutritionalTips: () => api.get('/diet/tips'),
};