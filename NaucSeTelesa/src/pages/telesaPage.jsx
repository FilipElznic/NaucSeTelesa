import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import Telesa from "../Components/Telesa";
import Cube from "../Components/Cube";
import "../App.css";

import KnowHow from "../Components/KnowHow";

function TelesaPage() {
  const [counts, setCounts] = useState({
    user_count: 0,
    tasks_count: 0,
    geometric_bodies_count: 0,
  });

  useEffect(() => {
    const fetchCounts = async () => {
      const { data, error } = await supabase.rpc("get_table_counts");

      if (error) {
        console.error("Error fetching counts:", error);
      } else if (data && data.length > 0) {
        setCounts(data[0]);
      }
    };

    fetchCounts();
  }, []); // Only run on page load

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="w-full min-h-[70vh] flex flex-col lg:flex-row px-4 mb-8">
        {/* Text content */}
        <div className="flex-1 flex flex-col justify-center items-start px-4 sm:px-8 md:mx-16 lg:px-22 py-6">
          <div className="text-start text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black">
            <h2 className="mb-1">Efektivně.</h2>
            <h2 className="mb-1">Pohodlně.</h2>
            <h2 className="mb-1">
              <span className="userlvl">Srozumitelně</span>.
            </h2>
          </div>
        </div>

        {/* 3D Cube */}
        <div className="flex-1 flex justify-center items-center h-[60vh] py-6 md:py-0">
          <div className="cube-wrapper w-full h-[40vh] flex justify-center items-end bg-transparent">
            <Cube />
          </div>
        </div>
      </div>

      {/* Count Cards */}
      <div className="h-full w-full mb-20">
        <div className="flex justify-center">
          <div className="h-1 w-3/4 bg-blue-400"></div>
        </div>
        <div className="w-full h-full">
          <div className="flex flex-col md:flex-row items-center justify-evenly mt-7 gap-4 md:gap-2 px-4">
            <div className="bg-black p-4 w-full md:w-auto">
              <p className="text-3xl md:text-4xl lg:text-5xl text-center font-semibold text-white mb-2 md:mb-5">
                {counts.user_count}
              </p>
              <h3 className="text-base md:text-lg lg:text-xl text-center font-light text-gray-400">
                Registered users
              </h3>
            </div>
            <div className="bg-black p-4 w-full md:w-auto">
              <p className="text-3xl md:text-4xl lg:text-5xl text-center font-semibold text-white mb-2 md:mb-5">
                {counts.geometric_bodies_count}
              </p>
              <h3 className="text-base md:text-lg lg:text-xl text-center font-light text-gray-400">
                Geometric solids
              </h3>
            </div>
            <div className="bg-black p-4 w-full md:w-auto">
              <p className="text-3xl md:text-4xl lg:text-5xl text-center font-semibold text-white mb-2 md:mb-5">
                {counts.tasks_count}
              </p>
              <h3 className="text-base md:text-lg lg:text-xl text-center font-light text-gray-400">
                Tasks to solve
              </h3>
            </div>
          </div>
        </div>
      </div>
      <div className="min-h-screen w-full">
        <KnowHow
          title="How to handle solids?"
          text="Each card represents one geometric solid and contains its name, brief description, illustrative image and basic formulas. User can view detailed information by clicking the button at the bottom of the card."
          img="/howitworkss.png"
          alt="How does it work?"
        />
      </div>

      <div className="h-screen w-full ">
        <Telesa />
      </div>
    </div>
  );
}

export default TelesaPage;
