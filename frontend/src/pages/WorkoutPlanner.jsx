import React, { useState, useEffect } from 'react';
import { workoutService } from '../services/workoutService';
import LoadingSpinner from '../components/Common/LoadingSpinner';
import Alert from '../components/Common/Alert';
import { format, startOfWeek, addDays } from 'date-fns';

const WorkoutPlanner = () => {
  const [todayWorkout, setTodayWorkout] = useState(null);
  const [weeklyPlan, setWeeklyPlan] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loggingWorkout, setLoggingWorkout] = useState(false);
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [activeTab, setActiveTab] = useState('today');
  const [recommendations, setRecommendations] = useState(null);

  useEffect(() => {
    fetchWorkoutData();
    fetchRecommendations();
  }, []);

  const fetchWorkoutData = async () => {
    setLoading(true);
    try {
      const [todayRes, weeklyRes] = await Promise.all([
        workoutService.getTodaysWorkout(),
        workoutService.getWeeklyPlan(),
      ]);
      setTodayWorkout(todayRes.data.data);
      setWeeklyPlan(weeklyRes.data.data);
    } catch (error) {
      setError('Failed to load workout data');
    } finally {
      setLoading(false);
    }
  };

  const fetchRecommendations = async () => {
    try {
      const response = await workoutService.getRecommendations();
      setRecommendations(response.data.data);
    } catch (error) {
      console.error('Failed to load recommendations');
    }
  };

  const handleLogWorkout = async (workout) => {
    setSelectedWorkout(workout);
  };

  const submitWorkoutLog = async (workoutData) => {
    setLoggingWorkout(true);
    try {
      await workoutService.logWorkout(selectedWorkout._id, workoutData);
      setSuccess('Workout logged successfully!');
      setTimeout(() => setSuccess(''), 3000);
      fetchWorkoutData(); // Refresh data
      setSelectedWorkout(null);
    } catch (error) {
      setError('Failed to log workout');
      setTimeout(() => setError(''), 3000);
    } finally {
      setLoggingWorkout(false);
    }
  };

  const handleRegenerateWorkout = async () => {
    if (!window.confirm('Are you sure you want to regenerate today\'s workout?')) return;
    
    setLoading(true);
    try {
      await workoutService.regenerateWorkout(new Date());
      await fetchWorkoutData();
      setSuccess('Workout regenerated successfully!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      setError('Failed to regenerate workout');
    } finally {
      setLoading(false);
    }
  };

  const renderWorkoutCard = (workout) => {
    if (!workout) return null;
    
    return (
      <div className="card mb-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-bold capitalize">
              {workout.dayOfWeek}'s Workout
            </h3>
            <p className="text-gray-600">
              {workout.workoutType} • {workout.duration} mins • {workout.caloriesBurned} cal
            </p>
          </div>
          {!workout.completed && (
            <button
              onClick={() => handleLogWorkout(workout)}
              className="btn-primary"
            >
              Log Workout
            </button>
          )}
          {workout.completed && (
            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
              Completed
            </span>
          )}
        </div>
        
        <div className="space-y-4">
          {workout.exercises.map((exercise, idx) => (
            <div key={idx} className="border-b pb-3 last:border-0">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-semibold text-lg">{exercise.exerciseName}</h4>
                  <p className="text-gray-600 text-sm">
                    {exercise.sets} sets × {exercise.reps} reps • Rest: {exercise.restInterval}s
                  </p>
                  {exercise.weight > 0 && (
                    <p className="text-gray-500 text-sm">Weight: {exercise.weight} kg</p>
                  )}
                </div>
                {workout.completed && exercise.completed && (
                  <span className="text-green-600">✓</span>
                )}
              </div>
            </div>
          ))}
        </div>
        
        {workout.notes && (
          <div className="mt-4 p-3 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">{workout.notes}</p>
          </div>
        )}
      </div>
    );
  };

  const renderLogModal = () => {
    if (!selectedWorkout) return null;
    
    const [logData, setLogData] = useState({
      exercises: selectedWorkout.exercises.map(e => ({ ...e })),
      duration: selectedWorkout.duration,
      notes: '',
      rating: 5,
    });
    
    const updateExercise = (idx, field, value) => {
      const updated = [...logData.exercises];
      updated[idx][field] = value;
      setLogData({ ...logData, exercises: updated });
    };
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Log Workout</h2>
              <button
                onClick={() => setSelectedWorkout(null)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-6">
              {logData.exercises.map((exercise, idx) => (
                <div key={idx} className="border rounded-lg p-4">
                  <h3 className="font-semibold mb-3">{exercise.exerciseName}</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Sets</label>
                      <input
                        type="number"
                        value={exercise.sets}
                        onChange={(e) => updateExercise(idx, 'sets', parseInt(e.target.value))}
                        className="input-field"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Reps</label>
                      <input
                        type="text"
                        value={exercise.reps}
                        onChange={(e) => updateExercise(idx, 'reps', e.target.value)}
                        className="input-field"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Weight (kg)</label>
                      <input
                        type="number"
                        value={exercise.weight}
                        onChange={(e) => updateExercise(idx, 'weight', parseFloat(e.target.value))}
                        className="input-field"
                      />
                    </div>
                  </div>
                  <div className="mt-2">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={exercise.completed}
                        onChange={(e) => updateExercise(idx, 'completed', e.target.checked)}
                        className="mr-2"
                      />
                      <span className="text-sm">Completed</span>
                    </label>
                  </div>
                </div>
              ))}
              
              <div>
                <label className="block text-sm font-medium mb-1">Duration (minutes)</label>
                <input
                  type="number"
                  value={logData.duration}
                  onChange={(e) => setLogData({ ...logData, duration: parseInt(e.target.value) })}
                  className="input-field"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Rating</label>
                <select
                  value={logData.rating}
                  onChange={(e) => setLogData({ ...logData, rating: parseInt(e.target.value) })}
                  className="input-field"
                >
                  {[1, 2, 3, 4, 5].map(r => (
                    <option key={r} value={r}>{r} Star{r !== 1 ? 's' : ''}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Notes</label>
                <textarea
                  value={logData.notes}
                  onChange={(e) => setLogData({ ...logData, notes: e.target.value })}
                  className="input-field"
                  rows="3"
                  placeholder="How did it go? Any difficulties?"
                />
              </div>
              
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setSelectedWorkout(null)}
                  className="btn-secondary"
                >
                  Cancel
                </button>
                <button
                  onClick={() => submitWorkoutLog(logData)}
                  disabled={loggingWorkout}
                  className="btn-primary"
                >
                  {loggingWorkout ? 'Saving...' : 'Save Workout'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderWeeklyPlan = () => {
    const weekStart = startOfWeek(new Date(), { weekStartsOn: 1 });
    
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {weeklyPlan.map((workout, idx) => {
          const date = addDays(weekStart, idx);
          const isToday = format(date, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd');
          
          return (
            <div key={idx} className={`card ${isToday ? 'border-2 border-primary-500' : ''}`}>
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-bold text-lg capitalize">{workout.dayOfWeek}</h3>
                  <p className="text-sm text-gray-500">{format(date, 'MMM d')}</p>
                </div>
                {workout.completed ? (
                  <span className="text-green-600 text-sm">✓ Completed</span>
                ) : (
                  <span className="text-gray-400 text-sm">Pending</span>
                )}
              </div>
              
              <p className="text-sm text-gray-600 mb-2">
                {workout.workoutType} • {workout.exercises.length} exercises
              </p>
              
              <div className="space-y-1 mb-3">
                {workout.exercises.slice(0, 2).map((ex, i) => (
                  <p key={i} className="text-xs text-gray-500">{ex.exerciseName}</p>
                ))}
                {workout.exercises.length > 2 && (
                  <p className="text-xs text-gray-400">+{workout.exercises.length - 2} more</p>
                )}
              </div>
              
              {isToday && !workout.completed && (
                <button
                  onClick={() => handleLogWorkout(workout)}
                  className="btn-primary w-full text-sm"
                >
                  Log Today's Workout
                </button>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Workout Planner</h1>
        <button
          onClick={handleRegenerateWorkout}
          className="btn-secondary"
        >
          Regenerate Today's Workout
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
          Today's Workout
        </button>
        <button
          onClick={() => setActiveTab('weekly')}
          className={`pb-2 px-4 ${activeTab === 'weekly' ? 'border-b-2 border-primary-500 text-primary-600' : 'text-gray-500'}`}
        >
          Weekly Plan
        </button>
        <button
          onClick={() => setActiveTab('recommendations')}
          className={`pb-2 px-4 ${activeTab === 'recommendations' ? 'border-b-2 border-primary-500 text-primary-600' : 'text-gray-500'}`}
        >
          Recommendations
        </button>
      </div>
      
      {/* Content */}
      {activeTab === 'today' && (
        <div>
          {todayWorkout ? (
            renderWorkoutCard(todayWorkout)
          ) : (
            <div className="card text-center py-12">
              <p className="text-gray-500">No workout scheduled for today. It's a rest day!</p>
              <p className="text-sm text-gray-400 mt-2">Take this time to recover and prepare for your next session.</p>
            </div>
          )}
        </div>
      )}
      
      {activeTab === 'weekly' && (
        <div>
          {weeklyPlan.length > 0 ? (
            renderWeeklyPlan()
          ) : (
            <div className="card text-center py-12">
              <p className="text-gray-500">No workouts scheduled for this week.</p>
            </div>
          )}
        </div>
      )}
      
      {activeTab === 'recommendations' && recommendations && (
        <div className="space-y-6">
          {recommendations.motivationalMessage && (
            <div className="card bg-gradient-to-r from-primary-50 to-blue-50">
              <div className="text-center">
                <span className="text-3xl mb-2 inline-block">💪</span>
                <p className="text-lg font-medium text-gray-800">
                  {recommendations.motivationalMessage}
                </p>
              </div>
            </div>
          )}
          
          {recommendations.suggestedAdjustments.length > 0 && (
            <div className="card">
              <h3 className="text-lg font-bold mb-3">Suggested Adjustments</h3>
              <ul className="space-y-2">
                {recommendations.suggestedAdjustments.map((suggestion, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="text-primary-600 mr-2">•</span>
                    <span>{suggestion}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {recommendations.improvementAreas.length > 0 && (
            <div className="card">
              <h3 className="text-lg font-bold mb-3">Areas for Improvement</h3>
              <ul className="space-y-2">
                {recommendations.improvementAreas.map((area, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="text-yellow-600 mr-2">⚠️</span>
                    <span>{area}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {recommendations.suggestedAdjustments.length === 0 && 
           recommendations.improvementAreas.length === 0 && (
            <div className="card text-center py-12">
              <p className="text-gray-500">Great job! Keep up the consistent work.</p>
              <p className="text-sm text-gray-400 mt-2">You're on the right track to achieving your fitness goals.</p>
            </div>
          )}
        </div>
      )}
      
      {renderLogModal()}
    </div>
  );
};

export default WorkoutPlanner;