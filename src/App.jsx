import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import PracticePage from './pages/PracticePage';
import ProfilePage from './pages/ProfilePage';
import LeetCodeStatsPage from './pages/LeetCodeStatsPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen text-white selection:bg-primary selection:text-white">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/practice" element={
              <ProtectedRoute>
                <PracticePage />
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            } />
            <Route path="/leetcode-stats" element={
              <ProtectedRoute>
                <LeetCodeStatsPage />
              </ProtectedRoute>
            } />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
