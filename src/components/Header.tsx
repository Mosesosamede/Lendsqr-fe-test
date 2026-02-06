import React from 'react';
import { useEffect, useState } from 'react';
import { Logo } from './Icons';
import { Link } from 'react-router-dom';
import type { User } from '../types';

const Header: React.FC = () => {
  const [currentUserName, setCurrentUserName] = useState('Admin'); // Default name

  useEffect(() => {
    // Look for the user we saved during login
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      const user = JSON.parse(savedUser) as User;
      setCurrentUserName(user.username); // Update the header with the logged-in user's name
    }
  }, []);
  return (
    <header className="header">
      <div className="header__left">
        <Link to="/">
          <Logo className="logo" />
        </Link>
        <div className="header__search">
          <input type="text" placeholder="Search for anything" />
          <button aria-label="Search">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M13 13L9 9M10.3333 5.66667C10.3333 8.244 8.244 10.3333 5.66667 10.3333C3.08934 10.3333 1 8.244 1 5.66667C1 3.08934 3.08934 1 5.66667 1C8.244 1 10.3333 3.08934 10.3333 5.66667Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>

      <div className="header__right">
        <a href="#" className="docs-link">Docs</a>
        <button className="notification-btn" aria-label="Notifications">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M15 14H5C4.44772 14 4 13.5523 4 13V9C4 5.68629 6.68629 3 10 3C13.3137 3 16 5.68629 16 9V13C16 13.5523 15.5523 14 15 14Z" stroke="#213F7D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M11.5 17C11.5 17.8284 10.8284 18.5 10 18.5C9.17157 18.5 8.5 17.8284 8.5 17" stroke="#213F7D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <div className="user-profile">
          <img src="https://picsum.photos/40/40" alt="Profile" />
          <span>{currentUserName}</span>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M3 4.5L6 7.5L9 4.5" stroke="#213F7D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
    </header>
  );
};

export default Header;