import React, { useEffect, useRef, useState } from "react";

const FadeInWrapper = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target); // Stop observing once the element is visible
        }
      });
    });

    observer.observe(domRef.current);

    return () => observer.disconnect(); // Cleanup observer on unmount
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
