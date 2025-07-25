import React from "react";
import UserPageIMG from "/personalpage.png";
import LeaderboardIMG from "/leaderboard.png";
import TasksIMG from "/taskShowEn.png";
import "../App.css";

function Work() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center pb-20">
      <h1 className="text-2xl sm:text-6xl md:text-7xl xl:text-9xl font-bold md:mb-7 text-white p-11 userlvl">
        PROJECT SHOWCASE
      </h1>

      {/* Main image */}
      <div className="w-[90vw]">
        <div className="w-full bg-black rounded-2xl mb-6 flex flex-col items-center justify-center usergradient-glow p-6">
          <p className="userlvl text-xl text-white">Track your progress</p>
          <img
            src={TasksIMG}
            alt="Task  showcase"
            loading="lazy"
            className="w-full h-auto rounded-2xl object-contain"
          />
        </div>
      </div>

      {/* Two smaller images side by side */}
      <div className="w-[90vw] flex flex-col md:flex-row gap-6">
        {[
          {
            img: UserPageIMG,
            text: "Track your progress",
            alt: "User page",
          },
          {
            img: LeaderboardIMG,
            text: "Compete with others",
            alt: "User leaderboard",
          },
        ].map(({ img, text, alt }, index) => (
          <div
            key={index}
            className="w-full md:w-1/2 bg-black rounded-2xl flex flex-col items-center justify-center usergradient-glow p-6"
          >
            <p className="userlvl text-xl text-white">{text}</p>
            <img
              src={img}
              alt={alt}
              loading="lazy"
              className="w-full h-auto rounded-2xl object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Work;
