import type { User } from '../types';

const USERS_KEY = 'lendsqr_users_data';
const AUTH_KEY = 'lendsqr_is_logged_in';

export const storage = {
  getUsers: (): User[] => {
    const data = localStorage.getItem(USERS_KEY);
    return data ? JSON.parse(data) : [];
  },

  saveUsers: (users: User[]): void => {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  },

  getUserById: (id: string): User | undefined => {
    const users = storage.getUsers();
    return users.find(u => u.id === id);
  },

  isAuthenticated: (): boolean => {
    return localStorage.getItem(AUTH_KEY) === 'true';
  },

  setAuthenticated: (status: boolean): void => {
    localStorage.setItem(AUTH_KEY, status.toString());
  },

  // FIXED LOGOUT METHOD
  logout: (): void => {
    localStorage.removeItem(AUTH_KEY);
    // If you use a token, remove it here too:
    localStorage.removeItem('user_token'); 
    // Usually, you DON'T remove USERS_KEY on logout, 
    // otherwise the table will be empty when the next person logs in.
  },

  clearAll: (): void => {
    localStorage.clear();
  }
};