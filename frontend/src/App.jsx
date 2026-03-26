import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import Home from './pages/Home';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import AdminLogin from './components/Auth/AdminLogin';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/admin-login" element={<AdminLogin />} />
              
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
              
              <Route path="/profile" element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } />
              
              {/* Placeholder routes for other pages */}
              <Route path="/workout-planner" element={
                <ProtectedRoute>
                  <div className="max-w-7xl mx-auto px-4 py-8">
                    <h1 className="text-3xl font-bold">Workout Planner (Coming Soon)</h1>
                  </div>
                </ProtectedRoute>
              } />
              
              <Route path="/diet-planner" element={
                <ProtectedRoute>
                  <div className="max-w-7xl mx-auto px-4 py-8">
                    <h1 className="text-3xl font-bold">Diet Planner (Coming Soon)</h1>
                  </div>
                </ProtectedRoute>
              } />
              
              <Route path="/progress" element={
                <ProtectedRoute>
                  <div className="max-w-7xl mx-auto px-4 py-8">
                    <h1 className="text-3xl font-bold">Progress Tracking (Coming Soon)</h1>
                  </div>
                </ProtectedRoute>
              } />
            </Routes>
          </main>
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
