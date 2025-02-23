import { CiCircleInfo } from "react-icons/ci";
import { CiHeart } from "react-icons/ci";
import "../App.css";

function TaskLayout() {
  return (
    <div className="bg-black min-h-screen flex flex-col items-center p-4 text-white ">
      <div className="w-full flex flex-col gap-4 p-6 bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl">
        {/* Top Bar */}
        <div className="w-full h-24 usergradient rounded-3xl usergradient-glow"></div>

        <div className="flex flex-col md:flex-row gap-4 w-full min-h[70vh]">
          <div className="w-full h-[70vh] md:w-3/5 usergradient rounded-3xl flex flex-col usergradient-glow">
            <div className="w-full flex justify-between mt-16 p-5 px-10">
              <h1 className="text-5xl w-3/4 text-zinc-100/90">
                Určete, které těleso má jednu podstavu a vrchol.
              </h1>
              <p className="text-xl text-zinc-300">10 xp</p>
            </div>
            <div className="w-full md:w-3/4 p-10 text-3xl text-gray-500 flex-grow">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime,
              nihil eum? Totam veritatis quibusdam illum ducimus deleniti, quae
              magni voluptatum omnis aliquam tempore quo sed explicabo eius vero
              consequatur modi?
            </div>
            <div className="w-full flex justify-between text-3xl p-10 mt-auto">
              <CiCircleInfo />
              <CiHeart />
            </div>
          </div>
          <div className="w-full h-[30vh] md:h-[70vh] md:w-1/5 usergradient rounded-3xl usergradient-glow">
            <div className="h-full w-full flex justify-evenly flex-row md:flex-col items-center ">
              <div className="w-48 h-28  rounded-3xl items-center flex flex-row">
                <p className="text-3xl p-4">{"A)"}</p>
                <div className="h-28 w-28 usergradient rounded-3xl flex justify-center items-center usergradient-glow">
                  <p className="text-3xl">Koule</p>
                </div>
              </div>
              <div className="w-48 h-28  rounded-3xl items-center flex flex-row">
                <p className="text-3xl p-4">{"B)"}</p>
                <div className="h-28 w-28 usergradient rounded-3xl flex justify-center items-center usergradient-glow">
                  <p className="text-3xl">Kužel</p>
                </div>
              </div>
              <div className="w-48 h-28  rounded-3xl items-center flex flex-row">
                <p className="text-3xl p-4">{"C)"}</p>
                <div className="h-28 w-28 usergradient rounded-3xl flex justify-center items-center usergradient-glow">
                  <p className="text-3xl">Hranol</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col md:flex-row gap-4 w-full h-[70vh]">
          <div className="w-full h-full md:w-3/5 usergradient rounded-3xl usergradient-glow"></div>
          <div className="w-full h-full md:w-1/5 usergradient rounded-3xl usergradient-glow"></div>
        </div>
      </div>
    </div>
  );
}

export default TaskLayout;
