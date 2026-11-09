import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = (username, password, role = 'regular') => {
    setUser({
      username,
      role,
    });
  };

  const logout = () => {
    setUser(null);
  };

  const isAdmin = () => {
  return user?.role === 'admin';
  };

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
    isAdmin,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}