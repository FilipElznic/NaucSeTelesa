import UserPageIMG from "/testimg1.webp";
import LeaderboardIMG from "/leaderboard.webp";
import React from "react";
import TasksIMG from "/tasks.webp";
import "../App.css";

function Work() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center pb-20">
      <h1 className="text-2xl sm:text-6xl md:text-7xl xl:text-9xl font-bold md:mb-7 text-white p-11 userlvl">
        UKÁZKA WEBU
      </h1>
      <div className="w-[90vw]">
        {/* Larger div */}
        <div className="w-full md:h-[80vh] bg-black rounded-2xl mb-6">
          <div className="w-full h-full flex justify-center items-center relative">
            <img
              src={TasksIMG}
              className="max-w-full max-h-full rounded-2xl object-contain"
            />
            <p className="absolute top-3 left-1/2 transform -translate-x-1/2 userlvl text-xl">
              Sledujte svůj pokrok
            </p>
          </div>
        </div>
      </div>
      {/* Smaller divs */}
      <div className="w-[90vw] flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/2 md:h-[60vh] bg-black rounded-2xl relative">
          <img
            src={UserPageIMG}
            className="h-full w-full rounded-2xl object-contain"
          />
          <div className="w-full">
            <p className="absolute top-3 left-1/2 transform -translate-x-1/2 userlvl text-xl">
              Sledujte svůj pokrok
            </p>
          </div>
        </div>
        <div className="w-full md:w-1/2 md:h-[60vh] bg-black rounded-2xl relative">
          <img
            src={LeaderboardIMG}
            className="h-full w-full rounded-2xl object-contain"
          />
          <div className="w-full">
            <p className="absolute top-3 left-1/2 transform -translate-x-1/2 userlvl text-xl">
              Soutěžte s ostatními
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Work;
