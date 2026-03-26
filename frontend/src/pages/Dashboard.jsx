import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { userService } from '../services/api';
import LoadingSpinner from '../components/Common/LoadingSpinner';
import Alert from '../components/Common/Alert';

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUserStats();
  }, []);

  const fetchUserStats = async () => {
    try {
      const response = await userService.getUserStats();
      setStats(response.data.data);
    } catch (error) {
      setError('Failed to load user stats');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        Welcome back, {user?.name}!
      </h1>
      
      <Alert type="error" message={error} />
      
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="card">
          <p className="text-gray-500 text-sm">BMI</p>
          <p className="text-2xl font-bold text-gray-900">{stats?.bmi || 'N/A'}</p>
        </div>
        
        <div className="card">
          <p className="text-gray-500 text-sm">Total Workouts</p>
          <p className="text-2xl font-bold text-gray-900">{stats?.totalWorkouts || 0}</p>
        </div>
        
        <div className="card">
          <p className="text-gray-500 text-sm">Current Streak</p>
          <p className="text-2xl font-bold text-gray-900">{stats?.workoutStreak || 0} days</p>
        </div>
        
        <div className="card">
          <p className="text-gray-500 text-sm">Fitness Goal</p>
          <p className="text-2xl font-bold text-gray-900 capitalize">
            {stats?.profile?.fitnessGoal?.replace('_', ' ') || 'Not set'}
          </p>
        </div>
      </div>
      
      {/* Profile Overview */}
      <div className="card mb-8">
        <h2 className="text-xl font-bold mb-4">Profile Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-gray-600">
              <span className="font-medium">Age:</span> {stats?.profile?.age || 'Not set'}
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Gender:</span> {stats?.profile?.gender || 'Not set'}
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Height:</span> {stats?.profile?.height ? `${stats.profile.height} cm` : 'Not set'}
            </p>
          </div>
          <div>
            <p className="text-gray-600">
              <span className="font-medium">Weight:</span> {stats?.profile?.weight ? `${stats.profile.weight} kg` : 'Not set'}
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Experience Level:</span> {stats?.profile?.experienceLevel || 'Not set'}
            </p>
          </div>
        </div>
      </div>
      
      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <button className="card text-center hover:shadow-lg transition-shadow">
          <div className="text-3xl mb-2">💪</div>
          <h3 className="font-bold mb-1">Today's Workout</h3>
          <p className="text-sm text-gray-600">View your AI-generated workout plan</p>
        </button>
        
        <button className="card text-center hover:shadow-lg transition-shadow">
          <div className="text-3xl mb-2">🍽️</div>
          <h3 className="font-bold mb-1">Meal Plan</h3>
          <p className="text-sm text-gray-600">Check your personalized diet recommendations</p>
        </button>
        
        <button className="card text-center hover:shadow-lg transition-shadow">
          <div className="text-3xl mb-2">📈</div>
          <h3 className="font-bold mb-1">Track Progress</h3>
          <p className="text-sm text-gray-600">View your fitness analytics and achievements</p>
        </button>
      </div>
    </div>
  );
};

export default Dashboard;