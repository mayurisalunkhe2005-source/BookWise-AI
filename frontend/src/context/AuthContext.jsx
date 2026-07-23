import { createContext, useContext, useEffect, useState } from "react";
import API from "../api/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

  // ------------------------
  // Register
  // ------------------------

  const register = async (userData) => {
    const response = await API.post("/auth/register", userData);

    return response.data;
  };

  // ------------------------
  // Login
  // ------------------------

  const login = async (credentials) => {
    const response = await API.post("/auth/login", credentials);

    localStorage.setItem(
      "token",
      response.data.access_token
    );

    await getCurrentUser();

    return response.data;
  };

  // ------------------------
  // Current User
  // ------------------------

  const getCurrentUser = async () => {
    try {
      const response = await API.get("/auth/me");

      setUser(response.data);
    } catch (error) {
      console.error(error);

      localStorage.removeItem("token");

      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // ------------------------
  // Logout
  // ------------------------

  const logout = () => {
    localStorage.removeItem("token");

    setUser(null);
  };

  // ------------------------
  // Auto Login
  // ------------------------

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      getCurrentUser();
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        register,
        login,
        logout,
        getCurrentUser,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);