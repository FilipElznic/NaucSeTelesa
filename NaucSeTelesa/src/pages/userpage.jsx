import { lazy, Suspense } from "react";
import "../App.css";
import FadeInWrapper from "../Components/FadeInWrapper";

// Lazy load components that are not immediately visible on screen
const Robot = lazy(() => import("../Components/Robot"));
const Overused = lazy(() => import("../Components/Overused"));
const Work = lazy(() => import("../Components/Work"));
const Project = lazy(() => import("../Components/Project"));
const Help = lazy(() => import("../Components/Help"));

// Loading component for Suspense fallbacks
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="w-10 h-10 border-4 border-gray-300 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

function UserPage() {
  return (
    <>
      {/* Hero section - prioritize this for First Contentful Paint */}
      <Suspense fallback={<LoadingSpinner />}>
        <Robot />
      </Suspense>

      <div className="border-t border-gray-700 min-h-screen bg-gradient-to-br from-black via-zinc-950 to-black text-white">
        {/* Below-the-fold content - lazy load */}
        <FadeInWrapper>
          <Suspense fallback={<LoadingSpinner />}>
            <Overused />
          </Suspense>
        </FadeInWrapper>

        <FadeInWrapper>
          <Suspense fallback={<LoadingSpinner />}>
            <Project />
          </Suspense>
        </FadeInWrapper>

        <div className="md:mt-20 md:pb-20">
          <FadeInWrapper>
            <Suspense fallback={<LoadingSpinner />}>
              <Work />
            </Suspense>
          </FadeInWrapper>
        </div>

        <FadeInWrapper>
          <Suspense fallback={<LoadingSpinner />}>
            <Help />
          </Suspense>
        </FadeInWrapper>
      </div>
    </>
  );
}

export default UserPage;
