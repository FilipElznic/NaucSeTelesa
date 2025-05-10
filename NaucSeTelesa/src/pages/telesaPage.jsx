import { Divide } from "lucide-react";
import Telesa from "../Components/Telesa";

function TelesaPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl md:text-5xl lg:text-8xl font-bold mb-6 text-transparent bg-clip-text userlvl text-center relative pt-6">
        Geometrická tělesa
        <div className="absolute inset-0 blur-md opacity-50 bg-clip-text userlvl z-[-1] pt-6">
          Geometrická tělesa
        </div>
      </h1>

      <div className="w-full h-[60vh] bg-white mb-14 flex flex-row ">
        <div className="flex-1 bg-zinc-800 flex flex-col justify-center items-center ml-32">
          <div className="text-7xl font-black text-start">
            <div className="text-start">
              <h2 className="mb-1">Efektivně.</h2>
              <h2 className="mb-1">Pohodlně.</h2>
              <h2 className="mb-1">
                <span className="userlvl">Srozumitelně.</span>
              </h2>
              <p className="text-base font-normal mt-2 max-w-2xl">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Laudantium, vel quae. Quam, fuga natus, blanditiis error
                architecto expedita cupiditate aliquid, et impedit molestiae
                eaque. Odit porro labore inventore ratione facere?
              </p>
            </div>
          </div>
        </div>

        <div className="flex-1 bg-blue-800"></div>
      </div>
      <Telesa />
      <p>This is the Telesa page.</p>
    </div>
  );
}

export default TelesaPage;
