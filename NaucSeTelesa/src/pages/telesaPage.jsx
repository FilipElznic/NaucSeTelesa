import Telesa from "../Components/Telesa";
import "../App.css";
import Cube from "../Components/Cube";

function TelesaPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="w-full min-h-[70vh] flex flex-col lg:flex-row px-4 mb-8">
        {/* Text content - responsive adjustments */}
        <div className="flex-1 flex flex-col justify-center items-start px-4 sm:px-8 md:mx-16 lg:px-22 py-6">
          <div className="text-start text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black">
            <h2 className=" mb-1">Efektivně.</h2>
            <h2 className="mb-1">Pohodlně.</h2>
            <h2 className=" mb-1">
              <span className="userlvl">Srozumitelně</span>.
            </h2>
            <p className="text-sm sm:text-base font-normal mt-4 md:mt-7 max-w-xl lg:max-w-2xl">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Laudantium, vel quae. Quam, fuga natus, blanditiis error
              architecto expedita cupiditate aliquid, et impedit molestiae
              eaque. Odit porro labore inventore ratione facere?
            </p>
          </div>
        </div>

        {/* 3D Cube with proper containment */}
        <div className="flex-1 flex justify-center items-center h-[60vh] py-6 md:py-0">
          <div className="cube-wrapper w-full h-[40vh] flex justify-center items-end bg-transparent">
            <Cube />
          </div>
        </div>
      </div>

      <div className="h-full w-full mb-20">
        <div className="flex justify-center ">
          <div className="h-1  w-3/4 bg-blue-400 "></div>
        </div>
        <div className="w-full h-full">
          <div className="flex flex-col md:flex-row items-center justify-evenly mt-7 gap-4 md:gap-2 px-4">
            <div className="bg-black p-4 w-full md:w-auto">
              <p className="text-3xl md:text-4xl lg:text-5xl text-center font-semibold text-white mb-2 md:mb-5">
                132
              </p>
              <h3 className="text-base md:text-lg lg:text-xl text-center font-light text-gray-400">
                Registrovaných uživatelů
              </h3>
            </div>
            <div className="bg-black p-4 w-full md:w-auto">
              <p className="text-3xl md:text-4xl lg:text-5xl text-center font-semibold text-white mb-2 md:mb-5">
                21
              </p>
              <h3 className="text-base md:text-lg lg:text-xl text-center font-light text-gray-400">
                Geometrických těles
              </h3>
            </div>
            <div className="bg-black p-4 w-full md:w-auto">
              <p className="text-3xl md:text-4xl lg:text-5xl text-center font-semibold text-white mb-2 md:mb-5">
                53
              </p>
              <h3 className="text-base md:text-lg lg:text-xl text-center font-light text-gray-400">
                Úkolů k vyřešení
              </h3>
            </div>
          </div>
        </div>
      </div>
      <div className="h-screen">
        <Telesa />
      </div>

      {/* Extra styles for 3D cube containment */}
    </div>
  );
}

export default TelesaPage;
