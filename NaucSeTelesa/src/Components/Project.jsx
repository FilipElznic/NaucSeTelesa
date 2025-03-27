import { useState, useEffect, useMemo, lazy, Suspense } from "react";

const Spline = lazy(() => import("@splinetool/react-spline"));

function Project() {
  // Memoized initial state
  const initialScreenSize = useMemo(() => window.innerWidth > 550, []);
  const [isLargeScreen, setIsLargeScreen] = useState(initialScreenSize);

  useEffect(() => {
    let timeoutId;

    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setIsLargeScreen(window.innerWidth > 550);
      }, 150); // Debounce ke snížení počtu aktualizací
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
      <div className="w-full md:w-1/2 flex justify-center">
        {isLargeScreen && (
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
          O Projektu
        </h1>
        <p className="text-xl text-gray-800 m-2">
          Tento projekt je součástí ročníkové práce 3. ročníku.
        </p>
        <p className="text-xl text-gray-400 m-5 md:w-2/3">
          Cílem tohoto projektu je vytvořit interaktivní webovou aplikaci, která
          umožní uživatelům učit se o různých geometrických tělesech zábavnou a
          poutavou formou. Aplikace obsahuje interaktivní modely, které
          uživatelům umožní prozkoumat vlastnosti jednotlivých těles a získat
          tak lepší představu o jejich geometrických vlastnostech.
        </p>
      </div>
    </div>
  );
}

export default Project;
