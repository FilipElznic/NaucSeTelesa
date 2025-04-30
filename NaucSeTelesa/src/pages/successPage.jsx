import { lazy, Suspense, memo } from "react";
import FadeInWrapper from "../Components/FadeInWrapper";

// Lazy load components to improve initial page load
const InfoForm = lazy(() => import("../Components/InfoForm"));
const Tailwind = lazy(() => import("./TailwindTest"));
const Features = lazy(() => import("../Components/Features"));
const LeaderboardW = lazy(() => import("../Components/LeaderboardW"));
const Test = lazy(() => import("../Components/test"));

// Loading fallback component
const LoadingFallback = () => (
  <div className="w-full flex justify-center items-center py-8">
    <div className="animate-pulse bg-gray-200 rounded-md h-40 w-full max-w-3xl"></div>
  </div>
);

// Create memoized section components to prevent unnecessary re-renders
const Section = memo(({ children }) => (
  <FadeInWrapper>
    <Suspense fallback={<LoadingFallback />}>{children}</Suspense>
  </FadeInWrapper>
));

Section.displayName = "Section";

function SuccessPage() {
  return (
    <div className="space-y-8">
      <Section>
        <InfoForm />
      </Section>

      <Section>
        <Tailwind />
      </Section>

      <Section>
        <Features />
      </Section>

      <Section>
        <Test />
      </Section>

      <Section>
        <LeaderboardW />
      </Section>
    </div>
  );
}

export default memo(SuccessPage);
