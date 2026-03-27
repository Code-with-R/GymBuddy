import React, { useState, useEffect } from 'react';
import { dietService } from '../services/dietService';
import LoadingSpinner from '../components/Common/LoadingSpinner';
import Alert from '../components/Common/Alert';
import { format, startOfWeek, addDays } from 'date-fns';

const DietPlanner = () => {
  const [todayMealPlan, setTodayMealPlan] = useState(null);
  const [weeklyPlan, setWeeklyPlan] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [activeTab, setActiveTab] = useState('today');
  const [nutritionTips, setNutritionTips] = useState([]);
  const [selectedFood, setSelectedFood] = useState(null);
  const [alternatives, setAlternatives] = useState([]);
  const [showAlternatives, setShowAlternatives] = useState(false);

  useEffect(() => {
    fetchDietData();
    fetchNutritionTips();
  }, []);

  const fetchDietData = async () => {
    setLoading(true);
    try {
      const [todayRes, weeklyRes] = await Promise.all([
        dietService.getTodaysMealPlan(),
        dietService.getWeeklyMealPlan(),
      ]);
      setTodayMealPlan(todayRes.data.data);
      setWeeklyPlan(weeklyRes.data.data);
    } catch (error) {
      setError('Failed to load meal plan data');
    } finally {
      setLoading(false);
    }
  };

  const fetchNutritionTips = async () => {
    try {
      const response = await dietService.getNutritionalTips();
      setNutritionTips(response.data.data);
    } catch (error) {
      console.error('Failed to load nutrition tips');
    }
  };

  const handleFoodClick = async (foodName) => {
    setSelectedFood(foodName);
    try {
      const response = await dietService.getFoodAlternatives(foodName);
      setAlternatives(response.data.data);
      setShowAlternatives(true);
    } catch (error) {
      setError('Failed to load alternatives');
    }
  };

  const renderMealCard = (meal, mealType) => {
    if (!meal) return null;

    return (
      <div className="card mb-4">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-bold capitalize">{mealType}</h3>
          <div className="text-right">
            <p className="text-sm text-gray-600">{meal.nutrition.calories} cal</p>
            <p className="text-xs text-gray-500">
              P: {meal.nutrition.protein}g | C: {meal.nutrition.carbs}g | F: {meal.nutrition.fat}g
            </p>
          </div>
        </div>
        
        <h4 className="font-semibold text-lg mb-2">{meal.name}</h4>
        
        <div className="space-y-2">
          {meal.items.map((item, idx) => (
            <div 
              key={idx} 
              className="flex justify-between items-center p-2 hover:bg-gray-50 rounded cursor-pointer"
              onClick={() => handleFoodClick(item.name)}
            >
              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-xs text-gray-500">{item.serving}</p>
              </div>
              <div className="text-right">
                <p className="text-sm">{item.calories} cal</p>
                <p className="text-xs text-gray-500">
                  P: {item.protein}g | C: {item.carbs}g | F: {item.fat}g
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderTodayPlan = () => {
    if (!todayMealPlan) return null;

    return (
      <div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Nutrition Summary */}
          <div className="card">
            <h3 className="text-lg font-bold mb-3">Daily Nutrition Summary</h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between mb-1">
                  <span>Calories</span>
                  <span>{todayMealPlan.totalNutrition.calories} / {todayMealPlan.calorieTarget} cal</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-primary-600 rounded-full h-2" 
                    style={{ width: `${Math.min((todayMealPlan.totalNutrition.calories / todayMealPlan.calorieTarget) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span>Protein</span>
                  <span>{todayMealPlan.totalNutrition.protein}g / {todayMealPlan.macros.protein.grams}g</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-600 rounded-full h-2" 
                    style={{ width: `${Math.min((todayMealPlan.totalNutrition.protein / todayMealPlan.macros.protein.grams) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span>Carbs</span>
                  <span>{todayMealPlan.totalNutrition.carbs}g / {todayMealPlan.macros.carbs.grams}g</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 rounded-full h-2" 
                    style={{ width: `${Math.min((todayMealPlan.totalNutrition.carbs / todayMealPlan.macros.carbs.grams) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span>Fat</span>
                  <span>{todayMealPlan.totalNutrition.fat}g / {todayMealPlan.macros.fat.grams}g</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-yellow-600 rounded-full h-2" 
                    style={{ width: `${Math.min((todayMealPlan.totalNutrition.fat / todayMealPlan.macros.fat.grams) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Recommendations */}
          <div className="card">
            <h3 className="text-lg font-bold mb-3">Recommendations</h3>
            <ul className="space-y-2">
              {todayMealPlan.recommendations.map((rec, idx) => (
                <li key={idx} className="flex items-start">
                  <span className="text-primary-600 mr-2">•</span>
                  <span className="text-sm">{rec}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Meals */}
        <div className="space-y-6">
          {renderMealCard(todayMealPlan.meals.breakfast, 'Breakfast')}
          {renderMealCard(todayMealPlan.meals.lunch, 'Lunch')}
          {renderMealCard(todayMealPlan.meals.snack, 'Snack')}
          {renderMealCard(todayMealPlan.meals.dinner, 'Dinner')}
        </div>
      </div>
    );
  };

  const renderWeeklyPlan = () => {
    const weekStart = startOfWeek(new Date(), { weekStartsOn: 1 });
    
    return (
      <div className="space-y-6">
        {weeklyPlan.map((day, idx) => {
          const date = addDays(weekStart, idx);
          const isToday = format(date, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd');
          
          return (
            <div key={idx} className={`card ${isToday ? 'border-2 border-primary-500' : ''}`}>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold capitalize">
                    {format(date, 'EEEE')}
                  </h3>
                  <p className="text-sm text-gray-500">{format(date, 'MMM d, yyyy')}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold">
                    {day.totalNutrition.calories} / {day.calorieTarget} cal
                  </p>
                  <p className="text-xs text-gray-500">
                    P: {day.totalNutrition.protein}g | C: {day.totalNutrition.carbs}g | F: {day.totalNutrition.fat}g
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {Object.entries(day.meals).map(([mealType, meal]) => (
                  meal && (
                    <div key={mealType} className="border rounded-lg p-3">
                      <h4 className="font-semibold capitalize mb-2">{mealType}</h4>
                      <p className="text-sm font-medium">{meal.name}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {meal.nutrition.calories} cal
                      </p>
                    </div>
                  )
                ))}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const renderNutritionTips = () => {
    return (
      <div className="space-y-6">
        <div className="card">
          <h3 className="text-lg font-bold mb-3">Personalized Nutrition Tips</h3>
          <ul className="space-y-3">
            {nutritionTips.map((tip, idx) => (
              <li key={idx} className="flex items-start">
                <span className="text-green-600 text-xl mr-2">✓</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="card">
          <h3 className="text-lg font-bold mb-3">Hydration Reminder</h3>
          <div className="text-center py-4">
            <div className="text-4xl mb-2">💧</div>
            <p className="text-lg font-semibold">Drink water regularly</p>
            <p className="text-sm text-gray-600 mt-2">
              Aim for 8-10 glasses of water throughout the day to stay hydrated and support metabolism.
            </p>
          </div>
        </div>
        
        <div className="card">
          <h3 className="text-lg font-bold mb-3">Quick Tips</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-3 bg-blue-50 rounded-lg">
              <p className="font-semibold">🍽️ Meal Prep</p>
              <p className="text-sm">Prepare meals in advance to stay consistent with your nutrition goals.</p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg">
              <p className="font-semibold">🥗 Portion Control</p>
              <p className="text-sm">Use smaller plates and measure portions to avoid overeating.</p>
            </div>
            <div className="p-3 bg-yellow-50 rounded-lg">
              <p className="font-semibold">🍎 Whole Foods</p>
              <p className="text-sm">Focus on minimally processed foods for better nutrient absorption.</p>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <p className="font-semibold">⏰ Meal Timing</p>
              <p className="text-sm">Space meals 3-4 hours apart for stable energy levels.</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderAlternativesModal = () => {
    if (!showAlternatives) return null;
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl max-w-md w-full">
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Alternatives for {selectedFood}</h2>
              <button
                onClick={() => setShowAlternatives(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>
            
            {alternatives.length > 0 ? (
              <div className="space-y-3">
                {alternatives.map((alt, idx) => (
                  <div key={idx} className="border rounded-lg p-3">
                    <p className="font-semibold">{alt.name}</p>
                    <p className="text-sm text-gray-600">{alt.serving}</p>
                    <div className="text-xs text-gray-500 mt-1">
                      {alt.calories} cal | P: {alt.protein}g | C: {alt.carbs}g | F: {alt.fat}g
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">No alternatives found</p>
            )}
            
            <button
              onClick={() => setShowAlternatives(false)}
              className="btn-primary w-full mt-4"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Diet Planner</h1>
        <button
          onClick={fetchDietData}
          className="btn-secondary"
        >
          Refresh Plan
        </button>
      </div>
      
      <Alert type="success" message={success} />
      <Alert type="error" message={error} />
      
      {/* Tabs */}
      <div className="flex space-x-4 mb-6 border-b">
        <button
          onClick={() => setActiveTab('today')}
          className={`pb-2 px-4 ${activeTab === 'today' ? 'border-b-2 border-primary-500 text-primary-600' : 'text-gray-500'}`}
        >
          Today's Meal Plan
        </button>
        <button
          onClick={() => setActiveTab('weekly')}
          className={`pb-2 px-4 ${activeTab === 'weekly' ? 'border-b-2 border-primary-500 text-primary-600' : 'text-gray-500'}`}
        >
          Weekly Plan
        </button>
        <button
          onClick={() => setActiveTab('tips')}
          className={`pb-2 px-4 ${activeTab === 'tips' ? 'border-b-2 border-primary-500 text-primary-600' : 'text-gray-500'}`}
        >
          Nutrition Tips
        </button>
      </div>
      
      {/* Content */}
      {activeTab === 'today' && todayMealPlan && renderTodayPlan()}
      {activeTab === 'weekly' && weeklyPlan.length > 0 && renderWeeklyPlan()}
      {activeTab === 'tips' && renderNutritionTips()}
      
      {renderAlternativesModal()}
    </div>
  );
};

export default DietPlanner;