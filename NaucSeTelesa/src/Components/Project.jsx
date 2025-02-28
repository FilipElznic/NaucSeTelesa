import { useState, useEffect } from "react";
import Spline from "@splinetool/react-spline";

function Project() {
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 550);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth > 550);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="w-full flex justify-center items-center flex-col mt-52 text-center md:text-start md:flex md:flex-row md:justify-evenly md:items-center md:mt-20 md:pb-20">
      {isLargeScreen ? (
        <Spline
          scene="https://prod.spline.design/9Y6401k6pdaEhQPu/scene.splinecode"
          className="w-full h-96 md:w-1/2"
        />
      ) : (
        <></>
      )}
      <div className="w-full md:w-full">
        <h1 className="text-2xl sm:text-6xl md:text-7xl xl:text-8xl font-bold m-5 userlvl">
          O Projektu
        </h1>
        <p className="text-xl  text-gray-800 m-2">
          Tento projekt je součástí ročníkové práce 3. ročníku
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
