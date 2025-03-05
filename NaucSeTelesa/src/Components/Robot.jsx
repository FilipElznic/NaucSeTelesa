import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Spline from "@splinetool/react-spline";

function Robot() {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);
  const [isSplineLoading, setIsSplineLoading] = useState(true); // Loading state for Spline

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSplineLoad = () => {
    setIsSplineLoading(false); // Hide loader when Spline finishes loading
  };

  return (
    <>
      {isDesktop ? (
        <div className="hidden lg:block bg-gradient-to-tr from-black   to-zinc-950">
          <Navbar />
          <div className="flex flex-col justify-center items-center  min-h-screen text-white relative">
            <div className="absolute bottom-14 left-1/2 transform -translate-x-1/2 z-50">
              <iframe
                src="https://lottie.host/embed/8a69b819-9ee1-41e8-8360-9ecd4b0eee27/QYOR6xDR47.lottie"
                width="100px"
                height="100px"
                style={{ border: "none" }}
                title="Lottie Animation"
              ></iframe>
            </div>
            <div className="relative md:flex md:flex-row md:justify-between md:items-start md:mt-14 w-full">
              <div className="absolute inset-0 z-0">
                {isSplineLoading && (
                  <div className="absolute inset-0 flex items-center justify-center  rounded-3xl z-10">
                    <div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}
                <Spline
                  scene="https://prod.spline.design/VeV8EAaugsxDil4C/scene.splinecode"
                  onLoad={handleSplineLoad}
                />
              </div>
              <div className="relative sm:flex sm:flex-col sm:justify-center sm:h-[90vh]  w-1/4 ">
                <h1 className="text-4xl md:text-2xl lg:text-5xl font-bold p-5 sm:pr-20 userlvl">
                  Nechte se vnést do světa geometrie
                </h1>
                <p className="text-xl lg:text-2xl p-5">
                  Poznejte tvary geometrie z nové perspektivy a ovládněte jejich
                  tajemství.
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="lg:hidden bg-gradient-to-tr from-black   to-zinc-950">
          <Navbar />
          <div className="flex flex-col justify-center items-center  min-h-screen text-white">
            <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-50">
              <iframe
                src="https://lottie.host/embed/201e4d38-1bcf-4ede-9774-d02af3ec27f4/Yp7gkvwJiX.lottie"
                width="100px"
                height="100px"
                style={{ border: "none" }}
                title="Lottie Animation"
              ></iframe>
            </div>
            <div className="sm:flex sm:flex-col sm:justify-center sm:items-center sm:h-[90vh] text-center ">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold  text-center">
                Nechte se vnést <br />
                do světa geometrie
              </h1>
              <p className="text-xl lg:text-3xl ">
                Pokud by se pro starý účel použil smysluplný text, bylo by těžké
                hodnotit pouze umění.
              </p>
            </div>
            <div className="w-full h-[90v]">
              <Spline scene="https://prod.spline.design/VeV8EAaugsxDil4C/scene.splinecode" />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Robot;
