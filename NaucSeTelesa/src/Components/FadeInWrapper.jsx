import { useState, useEffect } from "react";
import { useAuth } from "../AuthContext";
import { useGlobalData } from "../Global";

// A wrapper component that fades in content after auth and data loading is complete
function FadeInWrapper({ children }) {
  const [visible, setVisible] = useState(false);
  const { loading: authLoading } = useAuth();
  const { loading: globalLoading } = useGlobalData();

  // Wait for both auth and global data to load before fading in
  useEffect(() => {
    if (!authLoading && !globalLoading) {
      // Small delay for smoother transition
      const timer = setTimeout(() => {
        setVisible(true);
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [authLoading, globalLoading]);

  return (
    <div
      className={`transition-opacity duration-200 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      {children}
    </div>
  );
}

export default FadeInWrapper;
