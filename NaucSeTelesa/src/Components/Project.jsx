import { useState, useEffect, useMemo, lazy, Suspense, useRef } from "react";

// Lazy load Spline
const Spline = lazy(() =>
  import(/* webpackChunkName: "project-spline" */ "@splinetool/react-spline")
);

function Project() {
  // Memoized initial screen size check
  const initialScreenSize = useMemo(() => window.innerWidth > 550, []);
  const [isLargeScreen, setIsLargeScreen] = useState(initialScreenSize);
  const [isVisible, setIsVisible] = useState(false);
  const splineRef = useRef(null);

  // Setup intersection observer for lazy loading
  useEffect(() => {
    if (!splineRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Check if our element is intersecting
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          // Once it's visible, stop observing
          observer.disconnect();
        }
      },
      { threshold: 0.1 } // Trigger when 10% of the element is visible
    );

    observer.observe(splineRef.current);

    return () => observer.disconnect();
  }, []);

  // Handle resize with debounce
  useEffect(() => {
    let timeoutId;

    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setIsLargeScreen(window.innerWidth > 550);
      }, 300); // Debounce to reduce updates
    };

    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="w-full flex flex-col md:flex-row justify-center items-center text-center md:text-start md:justify-evenly md:items-center mt-20 md:mt-10 md:pb-20">
      {/* Lazy-loaded Spline model */}
      <div ref={splineRef} className="w-full md:w-1/2 flex justify-center">
        {isLargeScreen && isVisible && (
          <Suspense
            fallback={
              <div className="w-10 h-10 border-4 border-gray-300 border-t-transparent rounded-full animate-spin"></div>
            }
          >
            <Spline
              scene="https://prod.spline.design/9Y6401k6pdaEhQPu/scene.splinecode"
              className="w-full h-96"
            />
          </Suspense>
        )}
      </div>

      {/* Text section */}
      <div className="w-full max-w-screen-lg">
        <h1 className="text-2xl sm:text-6xl md:text-7xl xl:text-8xl font-bold m-5 userlvl">
          About the Project
        </h1>
        <p className="text-xl text-gray-800 m-2">
          This project is part of a hackathon - Shipwrecked
        </p>
        <p className="text-xl text-gray-400 m-5 md:w-2/3">
          The goal of this project is to create an interactive web application
          that allows users to learn about various geometric solids in a fun and
          engaging way. The application contains interactive models that allow
          users to explore the properties of individual solids and gain a better
          understanding of their geometric properties.
        </p>
      </div>
    </div>
  );
}

export default Project;
