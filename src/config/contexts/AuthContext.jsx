import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('user');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    } catch (error) {
      console.error('Error loading user:', error);
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    console.log('AuthContext login called with:', email, password);
    try {
      if (!email || !password) return false;
      const userData = { email, name: email.split('@')[0] || 'User' };
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      console.log('Login successful:', userData);
      return true;
    } catch (error) {
      console.error('Login error in AuthContext:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const contextValue = {
    user,
    login,
    logout,
    loading
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
