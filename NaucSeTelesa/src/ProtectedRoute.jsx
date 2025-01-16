import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

export const ProtectedRoute = ({ children, redirectTo }) => {
  const { user, loading } = useAuth();

  // Wait for session check before deciding what to render
  if (loading) return null; // Optionally return a loading spinner or nothing

  if (!user) {
    return <Navigate to={redirectTo} replace />;
  }

  return children;
};

export const RedirectIfLoggedIn = ({ children, redirectTo }) => {
  const { user, loading } = useAuth();

  // Wait for session check before deciding what to render
  if (loading) return null; // Optionally return a loading spinner or nothing

  if (user) {
    return <Navigate to={redirectTo} replace />;
  }

  return children;
};
