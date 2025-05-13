import { lazy, Suspense, useState, useEffect, useRef } from "react";
import FadeInWrapper from "../Components/FadeInWrapper";

// Lazy load all components
const InfoForm = lazy(() => import("../Components/InfoForm"));
const Tailwind = lazy(() => import("./TailwindTest"));
const Features = lazy(() => import("../Components/Features"));
const LeaderboardW = lazy(() => import("../Components/LeaderboardW"));
const Test = lazy(() => import("../Components/test"));

// Loading component for suspense fallback
const ComponentLoader = () => (
  <div className="flex justify-center items-center py-12">
    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
  </div>
);

function SuccessPage() {
  // Define our component sequence - only the first is visible initially
  const [loadSequence, setLoadSequence] = useState({
    tailwind: { loaded: false, loading: true },
    features: { loaded: false, loading: false },
    test: { loaded: false, loading: false },
    leaderboard: { loaded: false, loading: false },
  });

  // Create refs for each section
  const sectionRefs = {
    infoForm: useRef(null),
    tailwind: useRef(null),
    features: useRef(null),
    test: useRef(null),
    leaderboard: useRef(null),
  };

  // Sequence control to load one component at a time
  const triggerNextComponent = (currentId) => {
    // Mark the current component as fully loaded
    setLoadSequence((prev) => ({
      ...prev,
      [currentId]: { loaded: true, loading: false },
    }));

    // Find the next component in our sequence
    const componentIds = Object.keys(loadSequence);
    const currentIndex = componentIds.indexOf(currentId);

    if (currentIndex < componentIds.length - 1) {
      const nextId = componentIds[currentIndex + 1];

      // Start loading the next component
      setTimeout(() => {
        setLoadSequence((prev) => ({
          ...prev,
          [nextId]: { ...prev[nextId], loading: true },
        }));
      }, 200); // Small delay to ensure sequential loading
    }
  };

  // Handle component load completion
  const handleComponentLoaded = (id) => {
    triggerNextComponent(id);
  };

  // Initialize by setting the first component to loading
  useEffect(() => {
    // Start with the first component loading
    setLoadSequence((prev) => ({
      ...prev,
      infoForm: { ...prev.infoForm, loading: true },
    }));
  }, []);

  // Setup intersection observer for lazy loading beyond first component
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "50px",
      threshold: 0.1,
    };

    const observerCallback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.dataset.componentId;
          if (id && !loadSequence[id].loading && !loadSequence[id].loaded) {
            // Only start loading if it's not already loading or loaded
            setLoadSequence((prev) => ({
              ...prev,
              [id]: { ...prev[id], loading: true },
            }));
            observer.unobserve(entry.target);
          }
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );

    // Observe all section refs
    Object.entries(sectionRefs).forEach(([id, ref]) => {
      if (ref.current && id !== "infoForm") {
        // Skip first component
        observer.observe(ref.current);
      }
    });

    return () => {
      // Clean up observer
      Object.values(sectionRefs).forEach((ref) => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
    };
  }, [loadSequence]);

  return (
    <div className="success-page">
      {/* Tailwind Section */}

      <div
        ref={sectionRefs.tailwind}
        data-component-id="tailwind"
        className="min-h-screen"
      >
        {loadSequence.tailwind.loading && (
          <FadeInWrapper>
            <Suspense fallback={<ComponentLoader />}>
              <InfoForm />
              <Tailwind onLoaded={() => handleComponentLoaded("tailwind")} />
            </Suspense>
          </FadeInWrapper>
        )}
      </div>

      {/* Features Section */}
      <div
        ref={sectionRefs.features}
        data-component-id="features"
        className="min-h-screen"
      >
        {loadSequence.features.loading && (
          <FadeInWrapper>
            <Suspense fallback={<ComponentLoader />}>
              <Features onLoaded={() => handleComponentLoaded("features")} />
            </Suspense>
          </FadeInWrapper>
        )}
      </div>

      {/* Test Section */}
      <div
        ref={sectionRefs.test}
        data-component-id="test"
        className="min-h-screen"
      >
        {loadSequence.test.loading && (
          <FadeInWrapper>
            <Suspense fallback={<ComponentLoader />}>
              <Test onLoaded={() => handleComponentLoaded("test")} />
            </Suspense>
          </FadeInWrapper>
        )}
      </div>

      {/* Leaderboard Section */}
      <div
        ref={sectionRefs.leaderboard}
        data-component-id="leaderboard"
        className="min-h-screen"
      >
        {loadSequence.leaderboard.loading && (
          <FadeInWrapper>
            <Suspense fallback={<ComponentLoader />}>
              <LeaderboardW
                onLoaded={() => handleComponentLoaded("leaderboard")}
              />
            </Suspense>
          </FadeInWrapper>
        )}
      </div>
    </div>
  );
}

export default SuccessPage;
