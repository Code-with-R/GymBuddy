import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { userService } from '../services/api';
import Alert from '../components/Common/Alert';
import LoadingSpinner from '../components/Common/LoadingSpinner';

const Profile = () => {
  const { user, logout } = useAuth();
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    age: '',
    gender: '',
    height: '',
    weight: '',
    fitnessGoal: 'general_fitness',
    experienceLevel: 'beginner',
    activityLevel: 'moderately_active',
    dietPreference: 'non_vegetarian',
    healthConditions: [],
  });

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    setLoading(true);
    try {
      const response = await userService.getUserStats();
      const stats = response.data.data;
      setProfileData({
        name: stats.profile?.name || user?.name || '',
        age: stats.profile?.age || '',
        gender: stats.profile?.gender || '',
        height: stats.profile?.height || '',
        weight: stats.profile?.weight || '',
        fitnessGoal: stats.profile?.fitnessGoal || 'general_fitness',
        experienceLevel: stats.profile?.experienceLevel || 'beginner',
        activityLevel: stats.profile?.activityLevel || 'moderately_active',
        dietPreference: stats.profile?.dietPreference || 'non_vegetarian',
        healthConditions: stats.profile?.healthConditions || [],
      });
    } catch (error) {
      setError('Failed to load profile data');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);
    setError('');
    setSuccess('');

    try {
      await userService.updateProfile(profileData);
      setSuccess('Profile updated successfully');
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to update profile');
    } finally {
      setUpdating(false);
    }
  };

  const handleProfilePicture = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('profilePicture', file);

    try {
      await userService.uploadProfilePicture(formData);
      setSuccess('Profile picture updated');
      setTimeout(() => setSuccess(''), 3000);
      window.location.reload();
    } catch (error) {
      setError('Failed to upload profile picture');
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Profile Settings</h1>
      
      <Alert type="success" message={success} />
      <Alert type="error" message={error} />
      
      {/* Profile Picture */}
      <div className="card mb-8">
        <h2 className="text-xl font-bold mb-4">Profile Picture</h2>
        <div className="flex items-center space-x-6">
          {user?.profilePicture ? (
            <img
              src={user.profilePicture}
              alt={user.name}
              className="h-24 w-24 rounded-full object-cover"
            />
          ) : (
            <div className="h-24 w-24 rounded-full bg-primary-600 flex items-center justify-center">
              <span className="text-white text-2xl font-medium">
                {user?.name?.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
          <div>
            <label className="btn-secondary cursor-pointer inline-block">
              Upload New Picture
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleProfilePicture}
              />
            </label>
            <p className="text-sm text-gray-500 mt-2">JPG, PNG or GIF. Max 5MB</p>
          </div>
        </div>
      </div>
      
      {/* Profile Form */}
      <form onSubmit={handleSubmit} className="card">
        <h2 className="text-xl font-bold mb-4">Personal Information</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={profileData.name}
              onChange={handleChange}
              className="input-field"
              required
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Age
              </label>
              <input
                type="number"
                name="age"
                value={profileData.age}
                onChange={handleChange}
                className="input-field"
                min="10"
                max="100"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Gender
              </label>
              <select
                name="gender"
                value={profileData.gender}
                onChange={handleChange}
                className="input-field"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Height (cm)
              </label>
              <input
                type="number"
                name="height"
                value={profileData.height}
                onChange={handleChange}
                className="input-field"
                min="100"
                max="250"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Weight (kg)
              </label>
              <input
                type="number"
                name="weight"
                value={profileData.weight}
                onChange={handleChange}
                className="input-field"
                min="20"
                max="300"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Fitness Goal
            </label>
            <select
              name="fitnessGoal"
              value={profileData.fitnessGoal}
              onChange={handleChange}
              className="input-field"
            >
              <option value="fat_loss">Fat Loss</option>
              <option value="muscle_gain">Muscle Gain</option>
              <option value="general_fitness">General Fitness</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Experience Level
            </label>
            <select
              name="experienceLevel"
              value={profileData.experienceLevel}
              onChange={handleChange}
              className="input-field"
            >
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Activity Level
            </label>
            <select
              name="activityLevel"
              value={profileData.activityLevel}
              onChange={handleChange}
              className="input-field"
            >
              <option value="sedentary">Sedentary (Little or no exercise)</option>
              <option value="lightly_active">Lightly Active (1-3 days/week)</option>
              <option value="moderately_active">Moderately Active (3-5 days/week)</option>
              <option value="very_active">Very Active (6-7 days/week)</option>
              <option value="extra_active">Extra Active (Athlete/Physical job)</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Diet Preference
            </label>
            <select
              name="dietPreference"
              value={profileData.dietPreference}
              onChange={handleChange}
              className="input-field"
            >
              <option value="non_vegetarian">Non-Vegetarian</option>
              <option value="vegetarian">Vegetarian</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Health Conditions
            </label>
            <input
              type="text"
              name="healthConditions"
              value={profileData.healthConditions.join(', ')}
              onChange={(e) => {
                const conditions = e.target.value.split(',').map(c => c.trim());
                setProfileData({
                  ...profileData,
                  healthConditions: conditions,
                });
              }}
              className="input-field"
              placeholder="e.g., Asthma, Knee pain (separate with commas)"
            />
          </div>
          
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={updating}
              className="btn-primary"
            >
              {updating ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Profile;