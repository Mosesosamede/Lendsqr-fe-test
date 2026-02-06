import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { storage } from '../services/storage'; 
import { Logo } from '../components/Icons';
import loginImg from '../assets/login-img.png';

interface LoginPageProps {
  onLogin: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Basic check for empty fields
    if (!email || !password) {
      alert('Please enter your credentials');
      return;
    }

    // 2. Get the users we fetched from the API (stored in localStorage)
    const allUsers = storage.getUsers();

    // 3. Check if the email exists in our data
    // We use find() to look through the 100 users fetched from MockAPI
    const userExists = allUsers.find(
      (u) => u.email.toLowerCase() === email.toLowerCase()
    );

    if (userExists) {
      // Success! User found in the database
      storage.setAuthenticated(true);
      localStorage.setItem('currentUser', JSON.stringify(userExists));
      
      onLogin(); 
      navigate('/users');
    } else {
      // Failure: Email doesn't match any of our records
      alert('Invalid email address. This user does not exist in our database.');
    }
  };

  return (
    <div className="login-page">
      {/* Left side with Logo and Illustration */}
      <div className="login-page__left">
        <div className="logo">
           <Logo />
        </div>
        <div className="illustration-wrapper">
          {/* Using the imported loginImg variable to ensure path is correct */}
          <img src={loginImg} alt="Lendsqr Login Illustration" />
        </div>
      </div>

      {/* Right side with Login Form */}
      <div className="login-page__right">
        <div className="login-container">
          {/* This logo only appears on mobile screens via your SCSS */}
          <div className="mobile-logo">
            <Logo />
          </div>

          <h1>Welcome!</h1>
          <p>Enter details to login.</p>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span 
                className="show-pwd" 
                onClick={() => setShowPassword(!showPassword)}
                style={{ cursor: 'pointer' }}
              >
                {showPassword ? 'HIDE' : 'SHOW'}
              </span>
            </div>

            <button type="button" className="forgot-pwd">
               FORGOT PASSWORD?
            </button>

            <button type="submit" className="login-btn">
              LOG IN
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;