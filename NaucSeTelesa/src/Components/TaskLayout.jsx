import { CiCircleInfo } from "react-icons/ci";
import { CiHeart } from "react-icons/ci";
import "../App.css";

function TaskLayout() {
  return (
    <div className="bg-black min-h-screen flex flex-col items-center p-2 md:p-4 text-white ">
      <div className="w-full h-full bg-white/5 md:p-5 rounded-3xl">
        <div className="w-full flex flex-col gap-4 p-3 md:p-6 usergradient backdrop-blur-lg rounded-3xl">
          {/* Top Bar */}
          <div className="w-full h-24 usergradient rounded-full usergradient-glow"></div>

          <div className="flex flex-col lg:flex-row gap-4 w-full min-h[70vh]">
            <div className="w-full min-h-[40vh] md:min-h-[70vh] lg:w-3/5 usergradient rounded-3xl flex flex-col usergradient-glow">
              <div className="w-full flex justify-between mt-4 lg:mt-16  p-5 px-5 lg:px-10">
                <h1 className="text-3xl md:text-4xl lg:text-5xl w-full md:w-3/4 userlvl3">
                  {/* name */}
                </h1>
                <p className="text-md md:text-lg lg:text-2xl text-zinc-300 hidden sm:block">
                  {/* xp */}
                </p>
              </div>
              <div className="w-full xl:w-3/4 p-3 lg:p-10 text-md sm:text-xl md:text-2xl text-gray-500 flex-grow">
                {/* description */}
              </div>
              <div className="w-full flex justify-between text-xl lg:text-3xl p-10 mt-auto">
                <CiCircleInfo />
                <CiHeart />
              </div>
            </div>
            <div className="w-full h-[30vh] lg:h-[70vh] lg:w-1/5  usergradient rounded-3xl usergradient-glow">
              <div className="h-full w-full flex justify-evenly flex-row lg:flex-col items-center ">
                <div className="w-1/3 h-1/3 md:w-40 md:h-28  rounded-3xl items-center flex flex-col md:flex-row m-1 sm:m-4">
                  <div className="h-full w-full usergradient rounded-3xl flex justify-center items-center usergradient-glow">
                    <p className="text-xl md:text-3xl"> {/* answera */}</p>
                  </div>
                </div>
                <div className="w-1/3 h-1/3 md:w-40 md:h-28  rounded-3xl items-center flex flex-col md:flex-row m-1 sm:m-4">
                  <div className="h-full w-full usergradient rounded-3xl flex justify-center items-center usergradient-glow ">
                    <p className="text-xl md:text-3xl">{/* answerb */}</p>
                  </div>
                </div>
                <div className="w-1/3 h-1/3 md:w-40 md:h-28  rounded-3xl items-center flex flex-col md:flex-row m-1 sm:m-4">
                  <div className="h-full w-full usergradient rounded-3xl flex justify-center items-center usergradient-glow ">
                    <p className="text-xl md:text-3xl">{/* answerc */}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-4 w-full min-h[70vh]">
            <div className="w-full min-h-[40vh] md:min-h-[70vh] lg:w-3/5 usergradient rounded-3xl flex flex-col usergradient-glow">
              <div className="w-full flex justify-between mt-4 lg:mt-16  p-5 px-5 lg:px-10">
                <h1 className="text-3xl md:text-4xl lg:text-5xl w-full md:w-3/4 userlvl3">
                  {/* name */}
                </h1>
                <p className="text-md md:text-lg lg:text-2xl text-zinc-300 hidden sm:block">
                  {/* xp */}
                </p>
              </div>
              <div className="w-full xl:w-3/4 p-3 lg:p-10 text-md sm:text-xl md:text-2xl text-gray-500 flex-grow">
                {/* description */}
              </div>
              <div className="w-full flex justify-between text-xl lg:text-3xl p-10 mt-auto">
                <CiCircleInfo />
                <CiHeart />
              </div>
            </div>
            <div className="w-full h-[30vh] lg:h-[70vh] lg:w-1/5  usergradient rounded-3xl usergradient-glow">
              <div className="h-full w-full flex justify-evenly flex-row lg:flex-col items-center ">
                <div className="w-1/3 h-1/3 md:w-40 md:h-28  rounded-3xl items-center flex flex-col md:flex-row m-1 sm:m-4">
                  <div className="h-full w-full usergradient rounded-3xl flex justify-center items-center usergradient-glow">
                    <p className="text-xl md:text-3xl"> {/* answera */}</p>
                  </div>
                </div>
                <div className="w-1/3 h-1/3 md:w-40 md:h-28  rounded-3xl items-center flex flex-col md:flex-row m-1 sm:m-4">
                  <div className="h-full w-full usergradient rounded-3xl flex justify-center items-center usergradient-glow ">
                    <p className="text-xl md:text-3xl">{/* answerb */}</p>
                  </div>
                </div>
                <div className="w-1/3 h-1/3 md:w-40 md:h-28  rounded-3xl items-center flex flex-col md:flex-row m-1 sm:m-4">
                  <div className="h-full w-full usergradient rounded-3xl flex justify-center items-center usergradient-glow ">
                    <p className="text-xl md:text-3xl">{/* answerc */}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskLayout;
