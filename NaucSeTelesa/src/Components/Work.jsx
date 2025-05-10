import React from "react";
import UserPageIMG from "/testimg1.webp";
import LeaderboardIMG from "/leaderboard.webp";
import TasksIMG from "/tasks.webp";
import "../App.css";

function Work() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center pb-20">
      <h1 className="text-2xl sm:text-6xl md:text-7xl xl:text-9xl font-bold md:mb-7 text-white p-11 userlvl">
        UKÁZKA PROJEKTU
      </h1>

      {/* Hlavní obrázek */}
      <div className="w-[90vw]">
        <div className="w-full bg-black rounded-2xl mb-6 flex flex-col items-center justify-center usergradient-glow p-6">
          <p className="userlvl text-xl text-white">Sledujte svůj pokrok</p>
          <img
            src={TasksIMG}
            alt="Ukázka sledování úkolů"
            loading="lazy"
            className="w-full h-auto rounded-2xl object-contain"
          />
        </div>
      </div>

      {/* Dva menší obrázky vedle sebe */}
      <div className="w-[90vw] flex flex-col md:flex-row gap-6">
        {[
          {
            img: UserPageIMG,
            text: "Sledujte svůj pokrok",
            alt: "Uživatelská stránka",
          },
          {
            img: LeaderboardIMG,
            text: "Soutěžte s ostatními",
            alt: "Žebříček uživatelů",
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
