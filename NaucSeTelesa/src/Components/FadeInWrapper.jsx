import React, { useEffect, useRef, useState } from "react";

const FadeInWrapper = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    // Create a single observer instance per component
    const observer = new IntersectionObserver(
      (entries) => {
        // Use the first entry (our element)
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          // Once it's visible, no need to keep observing
          if (domRef.current) {
            observer.unobserve(domRef.current);
          }
        }
      },
      {
        threshold: 0.1, // Trigger when at least 10% is visible
        rootMargin: "0px 0px 50px 0px", // Slightly ahead of scroll
      }
    );

    // Start observing when component mounts
    if (domRef.current) {
      observer.observe(domRef.current);
    }

    // Clean up the observer on component unmount
    return () => {
      if (domRef.current) {
        observer.unobserve(domRef.current);
      }
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={domRef}
      className={`transition-opacity duration-1000 ease-in-out ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      {children}
    </div>
  );
};

export default FadeInWrapper;
