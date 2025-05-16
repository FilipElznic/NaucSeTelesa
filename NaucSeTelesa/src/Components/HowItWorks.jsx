import React from "react";
import "katex/dist/katex.min.css";
import { InlineMath } from "react-katex";

function HowItWorks() {
  return (
    <>
      <div className="flex-1 flex flex-col justify-center items-start px-4 sm:px-8 md:mx-16 lg:px-22 py-6">
        <div className="text-start text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black">
          <h2 className="mb-5 userlvl pb-5">Jak to funguje..?</h2>
          <p className="text-sm sm:text-base font-normal mt-4 md:mt-7 max-w-xl lg:max-w-2xl">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium,
            vel quae. Quam, fuga natus, blanditiis error architecto expedita
            cupiditate aliquid, et impedit molestiae eaque. Odit porro labore
            inventore ratione facere?
          </p>
        </div>
      </div>
      <div className="w-full h-[100vh]  flex justify-center items-center relative">
        <img
          src="/howitworkss.png"
          alt="How it works"
          className="w-full h-full object-contain"
        />
      </div>
    </>
  );
}

export default HowItWorks;
