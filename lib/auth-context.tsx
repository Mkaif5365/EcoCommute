"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Mock user data - in a real app, this would come from a database
const USERS = [
  { id: '1', name: 'Test User', email: 'user@example.com', password: 'password123' },
  { id: '2', name: 'Admin User', email: 'admin@example.com', password: 'admin123' },
  { id: '3', name: 'Rahul Sharma', email: 'rahul@example.com', password: 'rahul123' },
  { id: '4', name: 'Priya Patel', email: 'priya@example.com', password: 'priya123' },
  { id: '5', name: 'Amit Kumar', email: 'amit@example.com', password: 'amit123' },
];

export type User = {
  id: string;
  name: string;
  email: string;
} | null;

export type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
  signup: (name: string, email: string, password: string) => Promise<{ success: boolean; message: string }>;
  isLoading: boolean;
  error: string | null;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  login: async () => ({ success: false, message: '' }),
  logout: () => {},
  signup: async () => ({ success: false, message: '' }),
  isLoading: false,
  error: null,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Login function
  const login = async (email: string, password: string): Promise<{ success: boolean; message: string }> => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Find user with matching email and password
      const foundUser = USERS.find(u => u.email === email && u.password === password);
      
      if (foundUser) {
        // Create a user object without the password
        const { password: _, ...userWithoutPassword } = foundUser;
        setUser(userWithoutPassword);
        return { success: true, message: 'Login successful' };
      } else {
        setError('Invalid email or password');
        return { success: false, message: 'Invalid email or password' };
      }
    } catch (err) {
      setError('Something went wrong');
      console.error(err);
      return { success: false, message: 'Something went wrong' };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
  };

  // Check for existing session on mount
  useEffect(() => {
    const checkAuth = async () => {
      setIsLoading(true);
      try {
        // Check if user is stored in localStorage
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
          setUser(JSON.parse(savedUser));
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Save user to localStorage when it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  // Signup function
  const signup = async (name: string, email: string, password: string): Promise<{ success: boolean; message: string }> => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Mock signup - in a real app, you would create a new user in the database
      // For now, we'll just simulate a successful signup
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
      
      return { success: true, message: 'Signup successful' };
    } catch (err) {
      setError('Something went wrong');
      console.error(err);
      return { success: false, message: 'Something went wrong' };
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout, signup, isLoading, error }}>
      {children}
    </AuthContext.Provider>
  );
}; 