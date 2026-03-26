import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-primary-600">GymBuddy</span>
              <span className="text-sm text-gray-500">AI Fitness Planner</span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                {!isAdmin && (
                  <>
                    <Link to="/dashboard" className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium">
                      Dashboard
                    </Link>
                    <Link to="/workout-planner" className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium">
                      Workout Planner
                    </Link>
                    <Link to="/diet-planner" className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium">
                      Diet Planner
                    </Link>
                    <Link to="/progress" className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium">
                      Progress
                    </Link>
                  </>
                )}
                
                {isAdmin && (
                  <Link to="/admin/dashboard" className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium">
                    Admin Panel
                  </Link>
                )}
                
                <Link to="/profile" className="flex items-center space-x-2">
                  {user?.profilePicture ? (
                    <img
                      src={user.profilePicture}
                      alt={user.name}
                      className="h-8 w-8 rounded-full object-cover"
                    />
                  ) : (
                    <div className="h-8 w-8 rounded-full bg-primary-600 flex items-center justify-center">
                      <span className="text-white text-sm font-medium">
                        {user?.name?.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                  <span className="text-gray-700 text-sm font-medium hidden md:block">
                    {user?.name}
                  </span>
                </Link>
                
                <button
                  onClick={handleLogout}
                  className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium">
                  Login
                </Link>
                <Link to="/register" className="btn-primary">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;