import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="bg-linear-to-br from-primary-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-4">
            Welcome to <span className="text-primary-600">GymBuddy</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Your AI-powered fitness companion for personalized workout plans and nutrition guidance
          </p>
          
          {!isAuthenticated ? (
            <div className="space-x-4">
              <Link to="/register" className="btn-primary text-lg px-8 py-3">
                Get Started Free
              </Link>
              <Link to="/login" className="btn-secondary text-lg px-8 py-3">
                Sign In
              </Link>
            </div>
          ) : (
            <Link to="/dashboard" className="btn-primary text-lg px-8 py-3">
              Go to Dashboard
            </Link>
          )}
        </div>
        
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="card text-center">
            <div className="text-4xl mb-4">🤖</div>
            <h3 className="text-xl font-bold mb-2">AI-Powered Plans</h3>
            <p className="text-gray-600">Personalized workout routines based on your goals and fitness level</p>
          </div>
          
          <div className="card text-center">
            <div className="text-4xl mb-4">🍎</div>
            <h3 className="text-xl font-bold mb-2">Smart Nutrition</h3>
            <p className="text-gray-600">Customized diet plans with calorie and macronutrient tracking</p>
          </div>
          
          <div className="card text-center">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-xl font-bold mb-2">Progress Tracking</h3>
            <p className="text-gray-600">Visual analytics to monitor your fitness journey</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;