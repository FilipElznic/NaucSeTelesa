import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

// Create authentication context
const AuthContext = createContext();

// Auth provider component that wraps the application and provides auth data
export const AuthProvider = ({ children }) => {
  // State for storing authenticated user info
  const [user, setUser] = useState(null);
  // State for tracking if user data is loading
  const [loading, setLoading] = useState(true);

  // Effect for checking user session on app load
  useEffect(() => {
    const checkSession = async () => {
      try {
        // Get current session from Supabase
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();

        if (error) {
          console.error("Session error:", error);
        }

        // Set user (or null if not logged in)
        setUser(session?.user ?? null);
      } catch (err) {
        console.error("Auth error:", err);
      } finally {
        // Stop loading state after session check completes
        setLoading(false);
      }
    };

    // Call session check function
    checkSession();

    // Set up auth state change listener
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      // Update user state when auth state changes
      setUser(session?.user ?? null);
    });

    // Clean up listener when component unmounts
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Return provider with context values
  return (
    <AuthContext.Provider value={{ user, loading, supabase }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for easy access to AuthContext values
export const useAuth = () => useContext(AuthContext);
