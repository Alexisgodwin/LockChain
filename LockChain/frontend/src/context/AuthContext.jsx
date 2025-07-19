import React, { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  const login = (newToken) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
export function withAuth(Component) {
  return function AuthenticatedComponent(props) {
    const auth = useAuth();
    if (!auth.token) {
      // Redirect to login or show an error
      return <div>Please log in to access this page.</div>;
    }
    return <Component {...props} />;
  };
}