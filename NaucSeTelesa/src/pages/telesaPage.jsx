import Telesa from "../Components/Telesa";
import "../App.css";
import Cube from "../Components/Cube";

function TelesaPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="w-full h-[70vh] flex flex-col lg:flex-row px-4 mb-8">
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
        <div className="flex-1 flex justify-center items-center h-auto py-6 md:py-0">
          <div className="cube-wrapper w-full h-full flex justify-center items-center">
            <Cube />
          </div>
        </div>
      </div>

      <div className="h-[60vh] w-full bg-zinc ">
        <div className="flex justify-center ">
          <div className="h-1  w-3/4 bg-white "></div>
        </div>
        <div className="w-full h-full bg-white"></div>
      </div>
      <Telesa />

      {/* Extra styles for 3D cube containment */}
      <style jsx>{`
        .cube-wrapper {
          min-height: 220px;
        }

        @media (max-width: 768px) {
          .cube-wrapper {
            min-height: 180px;
          }
        }

        @media (max-width: 480px) {
          .cube-wrapper {
            min-height: 140px;
          }
        }
      `}</style>
    </div>
  );
}

export default TelesaPage;
