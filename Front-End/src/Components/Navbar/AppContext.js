import React, { useState, createContext, useEffect } from "react";

// Create the context
export const AuthContext = createContext();

// Context provider component
export const AppContext = ({ children }) => {
  const [value, setvalue] = useState(false);
  const [color, setcolor] = useState("profile");
  useEffect(() => {
    // Check if user data exists in localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      // If user data exists, set value to true
      setvalue(true);
    }
  }, []);
  return (
    <AuthContext.Provider value={{ value, setvalue, color, setcolor }}>
      {children}
    </AuthContext.Provider>
  );
};
