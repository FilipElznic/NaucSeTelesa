import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "./supabaseClient";
import { useAuth } from "./AuthContext";

const GlobalContext = createContext();

export function GlobalProvider({ children }) {
  // Use auth context to get authenticated user
  const { user: authUser } = useAuth();

  // State for storing user data from database
  const [userData, setUserData] = useState(null);
  // State for tracking if global data is loading
  const [loading, setLoading] = useState(true);

  // Fetch user data from 'user' table when auth state changes
  useEffect(() => {
    const fetchUserData = async () => {
      if (!authUser) {
        setLoading(false);
        return;
      }

      try {
        // Use proper quoting for table name to avoid SQL keyword conflicts
        const { data, error } = await supabase
          .from("user") // Using quotes in the query, not in JS string
          .select("*")
          .eq("authid", authUser.id)
          .single();

        if (error) {
          // PGRST116 is "no rows returned" error, which means we need to create the user
          if (error.code !== "PGRST116") {
            throw error;
          }

          // Create new user if doesn't exist
          const { data: newUser, error: insertError } = await supabase
            .from("user")
            .insert([
              {
                authid: authUser.id,
              },
            ])
            .select()
            .single();

          if (insertError) throw insertError;
          setUserData(newUser);
        } else {
          setUserData(data);
        }
      } catch (error) {
        console.error("User data error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [authUser]);

  // Function to refresh user data
  const refreshUserData = async () => {
    if (!authUser) return;

    try {
      const { data, error } = await supabase
        .from("user")
        .select("*")
        .eq("authid", authUser.id)
        .single();

      if (error) throw error;
      setUserData(data);
    } catch (error) {
      console.error("Refresh error:", error);
    }
  };

  const value = {
    authUser,
    userData,
    loading,
    refreshUserData,
  };

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
}

export function useGlobalData() {
  return useContext(GlobalContext);
}
