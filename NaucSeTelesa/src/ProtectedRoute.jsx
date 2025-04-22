import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";

export const ProtectedRoute = ({ children, redirectTo }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  // Wait for session check before deciding what to render
  if (loading) return null; // Optionally return a loading spinner or nothing

  if (!user) {
    return (
      <Navigate
        to={redirectTo}
        state={{
          from: location.pathname,
          protected: true,
        }}
        replace
      />
    );
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
