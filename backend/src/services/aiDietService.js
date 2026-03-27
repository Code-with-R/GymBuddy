import User from '../models/User.js';

// Food database with nutritional information
const foodDatabase = {
  // Proteins
  proteins: {
    vegetarian: [
      { name: 'Lentils (Cooked)', calories: 116, protein: 9, carbs: 20, fat: 0.4, serving: '1 cup (200g)' },
      { name: 'Chickpeas', calories: 269, protein: 15, carbs: 45, fat: 4, serving: '1 cup (164g)' },
      { name: 'Tofu', calories: 144, protein: 16, carbs: 3, fat: 8, serving: '100g' },
      { name: 'Tempeh', calories: 193, protein: 20, carbs: 9, fat: 11, serving: '100g' },
      { name: 'Greek Yogurt', calories: 150, protein: 20, carbs: 8, fat: 5, serving: '200g' },
      { name: 'Cottage Cheese', calories: 206, protein: 28, carbs: 6, fat: 9, serving: '1 cup (226g)' },
      { name: 'Edamame', calories: 122, protein: 11, carbs: 10, fat: 5, serving: '1 cup (155g)' },
      { name: 'Quinoa', calories: 222, protein: 8, carbs: 39, fat: 4, serving: '1 cup (185g)' },
      { name: 'Seitan', calories: 120, protein: 25, carbs: 5, fat: 1, serving: '100g' },
      { name: 'Paneer', calories: 321, protein: 25, carbs: 10, fat: 21, serving: '100g' },
    ],
    non_vegetarian: [
      { name: 'Chicken Breast', calories: 165, protein: 31, carbs: 0, fat: 3.6, serving: '100g' },
      { name: 'Eggs', calories: 155, protein: 13, carbs: 1.1, fat: 11, serving: '2 large eggs' },
      { name: 'Salmon', calories: 208, protein: 22, carbs: 0, fat: 13, serving: '100g' },
      { name: 'Tuna', calories: 132, protein: 28, carbs: 0, fat: 1.5, serving: '100g' },
      { name: 'Lean Beef', calories: 176, protein: 26, carbs: 0, fat: 7, serving: '100g' },
      { name: 'Turkey Breast', calories: 135, protein: 30, carbs: 0, fat: 1.5, serving: '100g' },
      { name: 'Pork Tenderloin', calories: 143, protein: 26, carbs: 0, fat: 3.5, serving: '100g' },
      { name: 'Greek Yogurt', calories: 150, protein: 20, carbs: 8, fat: 5, serving: '200g' },
      { name: 'Cottage Cheese', calories: 206, protein: 28, carbs: 6, fat: 9, serving: '1 cup (226g)' },
      { name: 'Whey Protein', calories: 120, protein: 24, carbs: 3, fat: 1, serving: '1 scoop (30g)' },
    ],
  },
  
  // Complex Carbs
  carbs: [
    { name: 'Oats', calories: 307, protein: 11, carbs: 55, fat: 5, serving: '1 cup (80g)' },
    { name: 'Brown Rice', calories: 216, protein: 5, carbs: 45, fat: 1.8, serving: '1 cup (195g)' },
    { name: 'Sweet Potato', calories: 180, protein: 4, carbs: 41, fat: 0.3, serving: '1 medium (180g)' },
    { name: 'Whole Wheat Bread', calories: 80, protein: 4, carbs: 14, fat: 1, serving: '1 slice' },
    { name: 'Quinoa', calories: 222, protein: 8, carbs: 39, fat: 4, serving: '1 cup (185g)' },
    { name: 'Banana', calories: 105, protein: 1.3, carbs: 27, fat: 0.4, serving: '1 medium' },
    { name: 'Apple', calories: 95, protein: 0.5, carbs: 25, fat: 0.3, serving: '1 medium' },
    { name: 'Oatmeal', calories: 158, protein: 5.5, carbs: 27, fat: 3, serving: '1 packet (40g)' },
    { name: 'Brown Pasta', calories: 174, protein: 7, carbs: 37, fat: 1.5, serving: '1 cup (140g)' },
    { name: 'Lentils', calories: 116, protein: 9, carbs: 20, fat: 0.4, serving: '1 cup (200g)' },
  ],
  
  // Healthy Fats
  fats: [
    { name: 'Avocado', calories: 234, protein: 2.9, carbs: 12, fat: 21, serving: '1/2 avocado (100g)' },
    { name: 'Almonds', calories: 164, protein: 6, carbs: 6, fat: 14, serving: '1/4 cup (30g)' },
    { name: 'Olive Oil', calories: 119, protein: 0, carbs: 0, fat: 13.5, serving: '1 tbsp (15ml)' },
    { name: 'Peanut Butter', calories: 190, protein: 8, carbs: 7, fat: 16, serving: '2 tbsp (32g)' },
    { name: 'Chia Seeds', calories: 138, protein: 4.5, carbs: 12, fat: 9, serving: '2 tbsp (28g)' },
    { name: 'Walnuts', calories: 185, protein: 4.3, carbs: 4, fat: 18.5, serving: '1/4 cup (30g)' },
    { name: 'Salmon', calories: 208, protein: 22, carbs: 0, fat: 13, serving: '100g' },
    { name: 'Flax Seeds', calories: 150, protein: 5, carbs: 8, fat: 12, serving: '2 tbsp (20g)' },
  ],
  
  // Vegetables
  vegetables: [
    { name: 'Broccoli', calories: 55, protein: 3.7, carbs: 11, fat: 0.6, serving: '1 cup (150g)' },
    { name: 'Spinach', calories: 23, protein: 2.9, carbs: 3.6, fat: 0.4, serving: '3 cups (85g)' },
    { name: 'Bell Peppers', calories: 30, protein: 1, carbs: 7, fat: 0.3, serving: '1 medium' },
    { name: 'Carrots', calories: 52, protein: 1.2, carbs: 12, fat: 0.3, serving: '1 cup (128g)' },
    { name: 'Cucumber', calories: 45, protein: 2, carbs: 11, fat: 0.3, serving: '1 large' },
    { name: 'Tomatoes', calories: 22, protein: 1.1, carbs: 4.8, fat: 0.2, serving: '1 medium' },
    { name: 'Kale', calories: 33, protein: 2.9, carbs: 6.7, fat: 0.6, serving: '1 cup (67g)' },
    { name: 'Cauliflower', calories: 25, protein: 2, carbs: 5, fat: 0.3, serving: '1 cup (100g)' },
    { name: 'Zucchini', calories: 19, protein: 1.5, carbs: 3.5, fat: 0.4, serving: '1 medium' },
  ],
  
  // Fruits
  fruits: [
    { name: 'Apple', calories: 95, protein: 0.5, carbs: 25, fat: 0.3, serving: '1 medium' },
    { name: 'Banana', calories: 105, protein: 1.3, carbs: 27, fat: 0.4, serving: '1 medium' },
    { name: 'Berries (mixed)', calories: 70, protein: 1.5, carbs: 17, fat: 0.5, serving: '1 cup (150g)' },
    { name: 'Orange', calories: 62, protein: 1.2, carbs: 15, fat: 0.2, serving: '1 medium' },
    { name: 'Grapes', calories: 62, protein: 0.6, carbs: 16, fat: 0.3, serving: '1 cup (92g)' },
    { name: 'Strawberries', calories: 49, protein: 1, carbs: 12, fat: 0.5, serving: '1 cup (150g)' },
  ],
};

// Meal templates
const mealTemplates = {
  breakfast: {
    muscle_gain: [
      { name: 'Protein Oatmeal', items: ['Oats', 'Whey Protein', 'Banana', 'Peanut Butter'] },
      { name: 'Egg & Avocado Toast', items: ['Whole Wheat Bread', 'Eggs', 'Avocado'] },
      { name: 'Greek Yogurt Bowl', items: ['Greek Yogurt', 'Berries', 'Almonds', 'Honey'] },
    ],
    fat_loss: [
      { name: 'Vegetable Omelette', items: ['Eggs', 'Spinach', 'Mushrooms', 'Tomatoes'] },
      { name: 'Smoothie Bowl', items: ['Spinach', 'Berries', 'Protein Powder', 'Almond Milk'] },
      { name: 'Cottage Cheese', items: ['Cottage Cheese', 'Berries', 'Chia Seeds'] },
    ],
    general_fitness: [
      { name: 'Oatmeal with Fruits', items: ['Oats', 'Banana', 'Berries', 'Almonds'] },
      { name: 'Scrambled Eggs', items: ['Eggs', 'Whole Wheat Toast', 'Avocado'] },
      { name: 'Fruit & Yogurt', items: ['Greek Yogurt', 'Mixed Fruits', 'Granola'] },
    ],
  },
  
  lunch: {
    muscle_gain: [
      { name: 'Chicken Rice Bowl', items: ['Chicken Breast', 'Brown Rice', 'Broccoli', 'Avocado'] },
      { name: 'Salmon Quinoa Bowl', items: ['Salmon', 'Quinoa', 'Spinach', 'Sweet Potato'] },
      { name: 'Lentil Soup', items: ['Lentils', 'Brown Rice', 'Vegetables', 'Olive Oil'] },
    ],
    fat_loss: [
      { name: 'Grilled Chicken Salad', items: ['Chicken Breast', 'Mixed Greens', 'Tomatoes', 'Olive Oil'] },
      { name: 'Tuna Salad', items: ['Tuna', 'Lettuce', 'Cucumber', 'Lemon Juice'] },
      { name: 'Vegetable Stir-fry', items: ['Tofu', 'Broccoli', 'Bell Peppers', 'Brown Rice'] },
    ],
    general_fitness: [
      { name: 'Turkey Wrap', items: ['Turkey Breast', 'Whole Wheat Wrap', 'Lettuce', 'Avocado'] },
      { name: 'Quinoa Salad', items: ['Quinoa', 'Chickpeas', 'Cucumber', 'Feta Cheese'] },
      { name: 'Grilled Fish', items: ['White Fish', 'Brown Rice', 'Steamed Vegetables'] },
    ],
  },
  
  dinner: {
    muscle_gain: [
      { name: 'Steak & Sweet Potato', items: ['Lean Beef', 'Sweet Potato', 'Asparagus'] },
      { name: 'Chicken Pasta', items: ['Chicken Breast', 'Whole Wheat Pasta', 'Tomato Sauce'] },
      { name: 'Fish Rice Bowl', items: ['Salmon', 'Brown Rice', 'Mixed Vegetables'] },
    ],
    fat_loss: [
      { name: 'Baked Fish', items: ['White Fish', 'Zucchini', 'Cauliflower Rice'] },
      { name: 'Turkey Burger', items: ['Ground Turkey', 'Lettuce Wrap', 'Tomato'] },
      { name: 'Vegetable Soup', items: ['Mixed Vegetables', 'Lentils', 'Vegetable Broth'] },
    ],
    general_fitness: [
      { name: 'Grilled Chicken', items: ['Chicken Breast', 'Roasted Vegetables', 'Quinoa'] },
      { name: 'Vegetable Curry', items: ['Chickpeas', 'Spinach', 'Brown Rice', 'Coconut Milk'] },
      { name: 'Shrimp Stir-fry', items: ['Shrimp', 'Broccoli', 'Bell Peppers', 'Brown Rice'] },
    ],
  },
  
  snacks: {
    muscle_gain: [
      { name: 'Protein Shake', items: ['Whey Protein', 'Banana', 'Almond Milk'] },
      { name: 'Greek Yogurt', items: ['Greek Yogurt', 'Almonds', 'Honey'] },
      { name: 'Peanut Butter Toast', items: ['Whole Wheat Bread', 'Peanut Butter', 'Banana'] },
    ],
    fat_loss: [
      { name: 'Apple with Almonds', items: ['Apple', 'Almonds'] },
      { name: 'Cottage Cheese', items: ['Cottage Cheese', 'Berries'] },
      { name: 'Vegetable Sticks', items: ['Carrot', 'Cucumber', 'Hummus'] },
    ],
    general_fitness: [
      { name: 'Mixed Nuts', items: ['Almonds', 'Walnuts', 'Cashews'] },
      { name: 'Fruit Bowl', items: ['Mixed Fruits'] },
      { name: 'Rice Cakes', items: ['Rice Cakes', 'Avocado', 'Tomato'] },
    ],
  },
};

class AIDietService {
  // Calculate BMR using Mifflin-St Jeor Equation
  static calculateBMR(user) {
    let bmr;
    const weight = user.weight || 70;
    const height = user.height || 170;
    const age = user.age || 30;
    
    if (user.gender === 'female') {
      bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    } else {
      bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    }
    
    return Math.round(bmr);
  }
  
  // Calculate TDEE based on activity level
  static calculateTDEE(bmr, activityLevel) {
    const activityMultipliers = {
      sedentary: 1.2,
      lightly_active: 1.375,
      moderately_active: 1.55,
      very_active: 1.725,
      extra_active: 1.9,
    };
    
    const multiplier = activityMultipliers[activityLevel] || 1.55;
    return Math.round(bmr * multiplier);
  }
  
  // Calculate calorie target based on fitness goal
  static calculateCalorieTarget(tdee, fitnessGoal) {
    let target;
    
    switch (fitnessGoal) {
      case 'fat_loss':
        target = tdee - 500; // 500 calorie deficit
        break;
      case 'muscle_gain':
        target = tdee + 300; // 300 calorie surplus
        break;
      default:
        target = tdee; // Maintenance
    }
    
    // Ensure minimum safe calories
    return Math.max(target, 1500);
  }
  
  // Calculate macronutrient distribution
  static calculateMacros(calorieTarget, fitnessGoal) {
    let proteinPercent, carbsPercent, fatPercent;
    
    switch (fitnessGoal) {
      case 'fat_loss':
        proteinPercent = 0.40; // 40% protein
        carbsPercent = 0.30;   // 30% carbs
        fatPercent = 0.30;      // 30% fat
        break;
      case 'muscle_gain':
        proteinPercent = 0.30;  // 30% protein
        carbsPercent = 0.50;    // 50% carbs
        fatPercent = 0.20;      // 20% fat
        break;
      default:
        proteinPercent = 0.25;  // 25% protein
        carbsPercent = 0.50;    // 50% carbs
        fatPercent = 0.25;      // 25% fat
    }
    
    const proteinGrams = Math.round((calorieTarget * proteinPercent) / 4);
    const carbsGrams = Math.round((calorieTarget * carbsPercent) / 4);
    const fatGrams = Math.round((calorieTarget * fatPercent) / 9);
    
    return {
      protein: { grams: proteinGrams, percent: Math.round(proteinPercent * 100) },
      carbs: { grams: carbsGrams, percent: Math.round(carbsPercent * 100) },
      fat: { grams: fatGrams, percent: Math.round(fatPercent * 100) },
    };
  }
  
  // Generate meal plan for a specific meal
  static generateMeal(mealType, fitnessGoal, dietPreference) {
    const mealOptions = mealTemplates[mealType][fitnessGoal];
    if (!mealOptions || mealOptions.length === 0) {
      return null;
    }
    
    // Randomly select a meal option
    const selectedMeal = mealOptions[Math.floor(Math.random() * mealOptions.length)];
    
    // Get detailed nutritional info for each food item
    const itemsWithNutrition = selectedMeal.items.map(itemName => {
      // Find food in database
      let foodItem = null;
      
      // Search in all food categories
      for (const category of Object.values(foodDatabase)) {
        if (Array.isArray(category)) {
          foodItem = category.find(f => f.name === itemName);
          if (foodItem) break;
        } else if (typeof category === 'object') {
          for (const subCategory of Object.values(category)) {
            foodItem = subCategory.find(f => f.name === itemName);
            if (foodItem) break;
          }
        }
        if (foodItem) break;
      }
      
      return {
        name: itemName,
        ...(foodItem || { name: itemName, calories: 0, protein: 0, carbs: 0, fat: 0, serving: '1 serving' }),
      };
    });
    
    // Calculate total nutrition for the meal
    const totalNutrition = itemsWithNutrition.reduce((total, item) => ({
      calories: total.calories + (item.calories || 0),
      protein: total.protein + (item.protein || 0),
      carbs: total.carbs + (item.carbs || 0),
      fat: total.fat + (item.fat || 0),
    }), { calories: 0, protein: 0, carbs: 0, fat: 0 });
    
    return {
      name: selectedMeal.name,
      items: itemsWithNutrition,
      nutrition: totalNutrition,
    };
  }
  
  // Generate full daily meal plan
  static async generateDailyMealPlan(userId, date = new Date()) {
    try {
      const user = await User.findById(userId);
      if (!user) {
        throw new Error('User not found');
      }
      
      const bmr = this.calculateBMR(user);
      const tdee = this.calculateTDEE(bmr, user.activityLevel);
      const calorieTarget = this.calculateCalorieTarget(tdee, user.fitnessGoal);
      const macros = this.calculateMacros(calorieTarget, user.fitnessGoal);
      
      // Generate meals
      const breakfast = this.generateMeal('breakfast', user.fitnessGoal, user.dietPreference);
      const lunch = this.generateMeal('lunch', user.fitnessGoal, user.dietPreference);
      const dinner = this.generateMeal('dinner', user.fitnessGoal, user.dietPreference);
      const snack = this.generateMeal('snacks', user.fitnessGoal, user.dietPreference);
      
      // Calculate total nutrition from meals
      const meals = [breakfast, lunch, dinner, snack].filter(m => m !== null);
      const totalNutrition = meals.reduce((total, meal) => ({
        calories: total.calories + meal.nutrition.calories,
        protein: total.protein + meal.nutrition.protein,
        carbs: total.carbs + meal.nutrition.carbs,
        fat: total.fat + meal.nutrition.fat,
      }), { calories: 0, protein: 0, carbs: 0, fat: 0 });
      
      const mealPlan = {
        user: userId,
        date: date,
        calorieTarget,
        macros,
        meals: {
          breakfast,
          lunch,
          dinner,
          snack,
        },
        totalNutrition,
        recommendations: this.generateRecommendations(user, calorieTarget, totalNutrition),
      };
      
      return mealPlan;
    } catch (error) {
      console.error('Error generating meal plan:', error);
      throw error;
    }
  }
  
  // Generate weekly meal plan
  static async generateWeeklyMealPlan(userId, startDate = new Date()) {
    try {
      const weeklyPlan = [];
      const startOfWeek = new Date(startDate);
      startOfWeek.setDate(startDate.getDate() - startDate.getDay() + 1);
      
      for (let i = 0; i < 7; i++) {
        const currentDate = new Date(startOfWeek);
        currentDate.setDate(startOfWeek.getDate() + i);
        
        const mealPlan = await this.generateDailyMealPlan(userId, currentDate);
        weeklyPlan.push(mealPlan);
      }
      
      return weeklyPlan;
    } catch (error) {
      console.error('Error generating weekly meal plan:', error);
      throw error;
    }
  }
  
  // Generate dietary recommendations
  static generateRecommendations(user, calorieTarget, currentNutrition) {
    const recommendations = [];
    const calorieDifference = currentNutrition.calories - calorieTarget;
    
    if (Math.abs(calorieDifference) > 200) {
      if (calorieDifference > 0) {
        recommendations.push(`Your meal plan is ${calorieDifference} calories above target. Consider reducing portion sizes or choosing lower calorie options.`);
      } else {
        recommendations.push(`Your meal plan is ${Math.abs(calorieDifference)} calories below target. Consider adding healthy snacks or increasing portion sizes.`);
      }
    }
    
    // Protein recommendations
    const proteinTarget = (user.fitnessGoal === 'muscle_gain' ? 1.8 : 1.2) * (user.weight || 70);
    if (currentNutrition.protein < proteinTarget) {
      recommendations.push(`Aim to increase protein intake by ${Math.round(proteinTarget - currentNutrition.protein)}g to support your fitness goals. Good sources: chicken, fish, eggs, lentils.`);
    }
    
    // Hydration recommendation
    const waterIntake = (user.weight || 70) * 0.033; // 33ml per kg of body weight
    recommendations.push(`Stay hydrated! Aim for ${Math.round(waterIntake)} liters of water daily.`);
    
    // Meal timing recommendation
    if (user.fitnessGoal === 'muscle_gain') {
      recommendations.push('Consider having a protein-rich snack within 30 minutes post-workout for optimal recovery.');
    } else if (user.fitnessGoal === 'fat_loss') {
      recommendations.push('Eating smaller, frequent meals can help manage hunger and maintain energy levels throughout the day.');
    }
    
    return recommendations;
  }
  
  // Get food alternatives
  static getFoodAlternatives(foodName, dietPreference) {
    const alternatives = [];
    
    // Find similar foods by category
    for (const category of Object.values(foodDatabase)) {
      if (Array.isArray(category)) {
        const similar = category.find(f => f.name === foodName);
        if (similar) {
          // Find alternatives in same category
          const alternativesInCategory = category.filter(f => f.name !== foodName);
          alternatives.push(...alternativesInCategory.slice(0, 3));
        }
      } else if (typeof category === 'object') {
        const proteinCategory = dietPreference === 'vegetarian' ? category.vegetarian : category.non_vegetarian;
        const similar = proteinCategory?.find(f => f.name === foodName);
        if (similar && proteinCategory) {
          const alternativesInCategory = proteinCategory.filter(f => f.name !== foodName);
          alternatives.push(...alternativesInCategory.slice(0, 3));
        }
      }
    }
    
    return alternatives;
  }
  
  // Log meal consumption
  static async logMeal(userId, mealData) {
    try {
      // Store in database (you can create a MealLog model if needed)
      // For now, just return success
      return {
        success: true,
        message: 'Meal logged successfully',
      };
    } catch (error) {
      console.error('Error logging meal:', error);
      throw error;
    }
  }
  
  // Get nutritional tips based on user profile
  static getNutritionalTips(user) {
    const tips = [];
    
    if (user.fitnessGoal === 'fat_loss') {
      tips.push('Focus on high-fiber foods to increase satiety');
      tips.push('Limit liquid calories from sugary drinks and alcohol');
      tips.push('Include protein with every meal to preserve muscle mass');
    } else if (user.fitnessGoal === 'muscle_gain') {
      tips.push('Consume protein within 2 hours post-workout');
      tips.push('Don\'t fear carbohydrates - they fuel your workouts');
      tips.push('Eat slightly above maintenance calories consistently');
    }
    
    if (user.dietPreference === 'vegetarian') {
      tips.push('Combine different plant proteins to ensure complete amino acid profile');
      tips.push('Consider B12 supplementation as it\'s primarily found in animal products');
    }
    
    tips.push('Plan meals ahead to avoid impulsive unhealthy choices');
    tips.push('Listen to your body - eat when hungry, stop when satisfied');
    
    return tips;
  }
}

export default AIDietService;