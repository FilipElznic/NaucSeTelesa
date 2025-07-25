import { memo } from "react";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import NeonBall from "./Neonball";

// Memoize component to prevent unnecessary re-renders
const Overused = memo(function Overused() {
  // Create reusable card component for consistency and better code organization
  const InfoCard = ({ title, description }) => (
    <div className="w-2/3 h-60 md:w-72 md:h-60 lg:w-96 bg-zinc-900 rounded-3xl">
      <div className="w-full h-full flex flex-col justify-center items-center text-center">
        <h1 className="text-xl md:text-2xl lg:text-3xl mb-2 userlvl">
          {title}
        </h1>
        <p>{description}</p>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col justify-center min-h-screen text-white">
      <h1 className="text-white text-3xl sm:text-5xl md:text-7xl flex justify-center items-center font-bold p-5 userlvl">
        How does it work...?
      </h1>
      <div className="flex flex-col">
        <div className="flex flex-col items-center gap-5 mt-10 md:flex-row md:justify-center">
          <InfoCard
            title="Discover 3D solids"
            description="Immerse yourself in the fascinating world of 3D geometry, where each solid reveals new possibilities for learning and visualization."
          />
          <InfoCard
            title="Dive into interactive learning"
            description="Learning geometric shapes playfully, interactively and meaningfully. This is the idea of this web application."
          />
        </div>
        <div className="flex flex-col items-center mt-10 md:flex-row md:justify-center">
          <InfoCard
            title="Test your knowledge"
            description="Immerse yourself in the fascinating world of 3D geometry, where each solid reveals new possibilities for learning and visualization."
          />
          <div className="w-2/3 md:w-72 md:h-60 lg:w-96 flex flex-col justify-evenly items-center md:mx-4 my-5">
            <div className="w-full mb-5 md:w-full md:h-full h-24 bg-zinc-900 rounded-3xl">
              <Link to="/login">
                <div className="w-full h-full flex justify-center items-center flex-col">
                  <h1 className="text-xl lg:text-2xl userlvl text-center">
                    Start your learning journey with us
                  </h1>
                  <div className="flex flex-row items-center gap-2">
                    <p>sign in</p>
                    <ArrowRightOnRectangleIcon className="w-5 h-5 mr-2 text-white" />
                  </div>
                </div>
              </Link>
            </div>
            <div className="w-full md:w-full md:h-full h-24 bg-zinc-900 rounded-3xl">
              <NeonBall />
            </div>
          </div>
          <InfoCard
            title="Track your progress and compete with others"
            description="Earn points for completed tasks, improve your skills and compete with other users."
          />
        </div>
      </div>
    </div>
  );
});

export default Overused;
