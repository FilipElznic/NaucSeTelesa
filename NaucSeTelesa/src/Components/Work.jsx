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
        <div className="w-full md:h-[80vh] lg:h-[90vh] xl:h-screen bg-black rounded-2xl mb-6 flex justify-center items-center">
          <div className="flex flex-col items-center">
            <p className="userlvl text-xl text-white pt-4">
              Sledujte svůj pokrok
            </p>
            <img
              src={TasksIMG}
              className="max-w-full max-h-full rounded-2xl object-contain"
            />
          </div>
        </div>
      </div>

      {/* Smaller divs */}
      <div className="w-[90vw] flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/2 md:h-[60vh] bg-black rounded-2xl flex justify-center items-center">
          <div className="flex flex-col items-center">
            <p className="userlvl text-xl text-white ">Sledujte svůj pokrok</p>
            <img
              src={UserPageIMG}
              className="max-w-full max-h-full rounded-2xl object-contain"
            />
          </div>
        </div>
        <div className="w-full md:w-1/2 md:h-[60vh] bg-black rounded-2xl flex justify-center items-center">
          <div className="flex flex-col items-center">
            <p className="userlvl text-xl text-white ">Soutěžte s ostatními</p>
            <img
              src={LeaderboardIMG}
              className="max-w-full max-h-full rounded-2xl object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Work;
