import { useEffect, useState, lazy, Suspense } from "react";

// Lazy load Spline
const Spline = lazy(() =>
  import(/* webpackChunkName: "spline-component" */ "@splinetool/react-spline")
);

function Robot() {
  const [isDesktop, setIsDesktop] = useState(() => window.innerWidth >= 1024);
  const [isSplineLoading, setIsSplineLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [splineRef, setSplineRef] = useState(null);

  // Setup intersection observer for lazy loading
  useEffect(() => {
    if (!splineRef) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(splineRef);

    return () => {
      if (splineRef) observer.disconnect();
    };
  }, [splineRef]);

  // Optimized resize handler with throttling
  useEffect(() => {
    let timeoutId;
    const handleResize = () => {
      if (!timeoutId) {
        timeoutId = setTimeout(() => {
          setIsDesktop(window.innerWidth >= 1024);
          timeoutId = null;
        }, 150);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timeoutId);
    };
  }, []);

  // Loading spinner component
  const LoadingSpinner = () => (
    <div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
  );

  return (
    <>
      {isDesktop ? (
        <div className="hidden lg:block bg-gradient-to-tr from-black to-zinc-950">
          <div className="flex flex-col justify-center items-center min-h-screen text-white relative">
            {/* Lottie Animation - Optimized */}
            <div className="absolute bottom-14 left-1/2 -translate-x-1/2 z-50">
              <iframe
                src="https://lottie.host/embed/8a69b819-9ee1-41e8-8360-9ecd4b0eee27/QYOR6xDR47.lottie"
                width="100"
                height="100"
                className="border-none"
                title="Lottie Animation"
                loading="lazy"
              />
            </div>

            <div className="relative flex flex-col md:flex-row md:justify-between md:items-start md:mt-14 w-full">
              {/* Spline Scene with Suspense */}
              <div
                className="relative w-full h-screen flex flex-row"
                ref={setSplineRef}
              >
                {isSplineLoading && isVisible && (
                  <div className="absolute inset-0 flex items-center justify-center z-10">
                    <LoadingSpinner />
                  </div>
                )}
                <div className="relative sm:flex sm:flex-col sm:justify-center sm:h-[90vh] w-1/3">
                  <h1 className="text-4xl md:text-2xl lg:text-5xl font-bold p-5 sm:pr-20 userlvl">
                    Nechte se vnést do světa geometrie
                  </h1>
                  <p className="text-xl lg:text-2xl p-5">
                    Poznejte tvary geometrie z nové perspektivy a ovládněte
                    jejich tajemství.
                  </p>
                </div>

                {/* Only load Spline when in viewport */}
                {isVisible && (
                  <Suspense
                    fallback={
                      <div className="flex items-center justify-center">
                        <LoadingSpinner />
                      </div>
                    }
                  >
                    <Spline
                      scene="https://prod.spline.design/VeV8EAaugsxDil4C/scene.splinecode"
                      onLoad={() => setIsSplineLoading(false)}
                    />
                  </Suspense>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="lg:hidden bg-gradient-to-tr from-black to-zinc-950">
          <div className="flex flex-col justify-center items-center min-h-screen text-white">
            {/* Lottie Animation - Optimized */}
            <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-50">
              <iframe
                src="https://lottie.host/embed/201e4d38-1bcf-4ede-9774-d02af3ec27f4/Yp7gkvwJiX.lottie"
                width="100"
                height="100"
                className="border-none"
                title="Lottie Animation"
                loading="lazy"
              />
            </div>

            {/* Mobile Content */}
            <div className="sm:flex sm:flex-col sm:justify-center sm:items-center sm:h-[90vh] text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
                Nechte se vnést <br />
                do světa geometrie
              </h1>
              <p className="text-xl lg:text-3xl">
                Pokud by se pro starý účel použil smysluplný text, bylo by těžké
                hodnotit pouze umění.
              </p>
            </div>

            {/* Spline Scene - Mobile */}
            <div className="w-full h-[90vh]" ref={setSplineRef}>
              {isVisible && (
                <Suspense
                  fallback={
                    <div className="flex h-full items-center justify-center">
                      <LoadingSpinner />
                    </div>
                  }
                >
                  <Spline scene="https://prod.spline.design/VeV8EAaugsxDil4C/scene.splinecode" />
                </Suspense>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Robot;
