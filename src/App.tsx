import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import UsersPage from './pages/UsersPage';
import UserDetailsPage from './pages/UserDetailsPage';
import { fetchUsersFromApi } from './services/api';
import { storage } from './services/storage';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(storage.isAuthenticated());
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const initializeData = async () => {
      const existingUsers = storage.getUsers();
      
      // If no users in storage, fetch from API
      if (existingUsers.length === 0) {
        setIsLoading(true);
        const users = await fetchUsersFromApi();
        if (users.length > 0) {
          storage.saveUsers(users);
        }
        setIsLoading(false);
      }
    };

    initializeData();
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
    storage.setAuthenticated(true);
  };
  const handleLogout = () => {
    storage.logout();
    setIsAuthenticated(false);
    localStorage.removeItem('currentUser');
  };
  if (isLoading) {
    return (
      <div style={{ 
        height: '100vh', 
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'center', 
        justifyContent: 'center',
        fontFamily: 'Work Sans, sans-serif',
        color: '#213F7D'
      }}>
        <div className="spinner" style={{ 
          width: '50px', 
          height: '50px', 
          border: '5px solid #f3f3f3', 
          borderTop: '5px solid #39CDCC', 
          borderRadius: '50%', 
          animation: 'spin 1s linear infinite',
          marginBottom: '20px'
        }}></div>
        <p>Fetching latest user data...</p>
        <style>{`
          @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        `}</style>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route 
          path="/login" 
          element={!isAuthenticated ? <LoginPage onLogin={handleLogin} /> : <Navigate to="/users" />} 
        />
        <Route 
          path="/users" 
          element={isAuthenticated ? <UsersPage onLogout={handleLogout}/> : <Navigate to="/login" />} 
        />
        <Route 
          path="/users/:id" 
          element={isAuthenticated ? <UserDetailsPage onLogout={handleLogout} /> : <Navigate to="/login" />} 
        />
        <Route path="/" element={<Navigate to={isAuthenticated ? "/users" : "/login"} />} />
      </Routes>
    </Router>
  );
};

export default App;