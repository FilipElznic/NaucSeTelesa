import { lazy, Suspense, useState, useEffect } from "react";
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
  // Track which components have been loaded
  const [visibleComponents, setVisibleComponents] = useState({
    infoForm: true,
    tailwind: false,
    features: false,
    test: false,
    leaderboard: false,
  });

  // Intersection Observer to load components as they come into view
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };

    const observerCallback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          setVisibleComponents((prev) => ({ ...prev, [id]: true }));
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );

    // Observe section placeholders
    const sections = document.querySelectorAll(".section-placeholder");
    sections.forEach((section) => {
      observer.observe(section);
    });

    return () => {
      sections.forEach((section) => {
        observer.unobserve(section);
      });
    };
  }, []);

  return (
    <div className="success-page">
      {/* Info Form Section */}
      <div id="infoForm" className="section-placeholder">
        <FadeInWrapper>
          <Suspense fallback={<ComponentLoader />}>
            <InfoForm />
          </Suspense>
        </FadeInWrapper>
      </div>

      {/* Tailwind Section */}
      <div id="tailwind" className="section-placeholder">
        <FadeInWrapper>
          <Suspense fallback={<ComponentLoader />}>
            {visibleComponents.tailwind && <Tailwind />}
          </Suspense>
        </FadeInWrapper>
      </div>

      {/* Features Section */}
      <div id="features" className="section-placeholder">
        <FadeInWrapper>
          <Suspense fallback={<ComponentLoader />}>
            {visibleComponents.features && <Features />}
          </Suspense>
        </FadeInWrapper>
      </div>

      {/* Test Section */}
      <div id="test" className="section-placeholder">
        <FadeInWrapper>
          <Suspense fallback={<ComponentLoader />}>
            {visibleComponents.test && <Test />}
          </Suspense>
        </FadeInWrapper>
      </div>

      {/* Leaderboard Section */}
      <div id="leaderboard" className="section-placeholder">
        <FadeInWrapper>
          <Suspense fallback={<ComponentLoader />}>
            {visibleComponents.leaderboard && <LeaderboardW />}
          </Suspense>
        </FadeInWrapper>
      </div>
    </div>
  );
}

export default SuccessPage;
