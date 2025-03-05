import { CiLogin } from "react-icons/ci";
import NeonBall from "./Neonball";
import { Link } from "react-router-dom";
function Overused() {
  return (
    <div className="flex  flex-col justify-center min-h-screen text-white">
      <h1 className="text-white text-3xl sm:text-5xl md:text-7xl flex justify-center items-center font-bold p-5 userlvl">
        Jak to funguje...?
      </h1>
      <div className="flex flex-col">
        <div className="flex flex-col items-center gap-5 mt-10 md:flex-row md:justify-center">
          <div className="w-2/3 h-60 md:w-72 md:h-60 lg:w-96  bg-zinc-900 rounded-3xl">
            <div className="w-full h-full flex flex-col justify-center items-center text-center">
              <h1 className="text-xl md:text-2xl lg:text-3xl mb-2 userlvl">
                Objevte 3D tělesa
              </h1>
              <p>
                Ponořte se do fascinujícího světa 3D geometrie, kde každé těleso
                odhaluje nové možnosti pro učení a vizualizaci.
              </p>
            </div>
          </div>
          <div className="w-2/3 h-60 md:w-72 md:h-60 lg:w-96 bg-zinc-900 rounded-3xl">
            <div className="w-full h-full flex flex-col justify-center items-center text-center">
              <h1 className="text-xl md:text-2xl lg:text-3xl mb-2 userlvl">
                Ponořte se do interaktivního účení
              </h1>
              <p>
                Poznávání geometrických tvarů hravě, interaktivně a hlavně
                smysluplně. To je myšlenka této webové aplikace.
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center mt-10 md:flex-row md:justify-center">
          <div className="w-2/3 h-60 md:w-72 md:h-60 lg:w-96 bg-zinc-900 rounded-3xl lg:ml-4">
            <div className="w-full h-full flex flex-col justify-center items-center text-center ">
              <h1 className="text-xl md:text-2xl lg:text-3xl mb-2 userlvl">
                Vyzkoušejte svoje znalosti
              </h1>
              <p>
                Ponořte se do fascinujícího světa 3D geometrie, kde každé těleso
                odhaluje nové možnosti pro učení a vizualizaci.
              </p>
            </div>
          </div>
          <div className="w-2/3  md:w-72 md:h-60 lg:w-96 flex flex-col justify-evenly items-center md:mx-4 my-5 ">
            <div className="w-full mb-5 md:w-full md:h-full h-24 bg-zinc-900 rounded-3xl">
              <Link to="/prihlaseni">
                <div className="w-full h-full flex justify-center items-center flex-col text-center">
                  <h1 className="text-xl lg:text-2xl userlvl">
                    Začnětě svou cestu učení s námi
                  </h1>
                  <div className="flex flex-row items-center gap-2">
                    <p>přihlásit se</p>
                    <CiLogin className="text-xl font-bold" />
                  </div>
                </div>
              </Link>
            </div>
            <div className="w-full md:w-full md:h-full h-24 bg-zinc-900 rounded-3xl">
              <NeonBall />
            </div>
          </div>
          <div className="w-2/3 h-60 md:w-72 md:h-60 lg:w-96 bg-zinc-900 rounded-3xl lg:mr-4">
            <div className="w-full h-full flex flex-col justify-center items-center text-center mr-4">
              <h1 className="text-xl md:text-2xl lg:text-3xl mb-2 userlvl">
                Sledujte svůj pokrok a soutěžte s ostatními
              </h1>
              <p>
                Získejte body za splněné úkoly, zlepšujte své dovednosti a
                soutěžte s ostatními uživateli.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Overused;
