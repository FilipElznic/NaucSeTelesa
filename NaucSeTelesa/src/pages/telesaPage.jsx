import { Divide } from "lucide-react";
import Telesa from "../Components/Telesa";
import "../App.css";

function TelesaPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="w-full h-[60vh]  mb-14 flex flex-row ">
        <div className="flex-1  flex flex-col justify-center items-center ml-32">
          <div className="text-7xl font-black text-start">
            <div className="text-start">
              <h2 className="mb-1">Efektivně.</h2>
              <h2 className="mb-1">Pohodlně.</h2>
              <h2 className="mb-1">
                <span className="userlvl">Srozumitelně</span>.
              </h2>
              <p className="text-base font-normal mt-7 max-w-2xl">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Laudantium, vel quae. Quam, fuga natus, blanditiis error
                architecto expedita cupiditate aliquid, et impedit molestiae
                eaque. Odit porro labore inventore ratione facere?
              </p>
            </div>
          </div>
        </div>

        <div className="flex-1">
          <div className="perspective">
            <div className="cube animate-spin-slow">
              <div className="face front">Front</div>
              <div className="face back">Back</div>
              <div className="face right">Right</div>
              <div className="face left">Left</div>
              <div className="face top">Top</div>
              <div className="face bottom">Bottom</div>
            </div>
          </div>
        </div>
      </div>
      <Telesa />
    </div>
  );
}

export default TelesaPage;
