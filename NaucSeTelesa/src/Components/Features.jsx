import Features1 from "./Features1";
import Features2 from "./Features2";
import { BiBrain } from "react-icons/bi";
import { FaChalkboardTeacher } from "react-icons/fa";
import { GiProgression } from "react-icons/gi";
import { GiCube } from "react-icons/gi";
import { BiRectangle } from "react-icons/bi";

function Features() {
  return (
    <div className="lg:flex lg:flex-row lg:w-full lg:justify-evenly min-h-screen lg:items-center text-white">
      <div className="md:full md:flex md:flex-col md:justify-center md:items-center md:mt-20 lg:flex lg:flex-col lg:items-start lg:w-1/4 ">
        <h2
          className="text-2xl sm:text-6xl md:text-7xl xl:text-9xl font-bold md:text-start text-center md:pb-20 userlvl
           "
        >
          FUNKCE WEBU
        </h2>
        <p className="text-xl xl:2xl  md:text-start p-5 ">
          Následující funkce vám pomohou lépe pochopit geometrii a zlepšit vaše
          znalosti. Díky těmto funkcím se budete moci učit efektivněji a
          zábavněji.
        </p>
      </div>
      <div className="md:mr-8">
        {/*div pro karticky*/}
        <div className="flex flex-col items-center gap-5 mt-10 md:flex-row md:justify-end">
          <Features1
            name="3D modely"
            text="vám pomůžou si lépe vizualizovat jakékoliv geometrické těleso"
            icon={<GiCube />}
          />
          <Features2
            name="2D modely"
            text="vám umožní snadno pochopit tvary a vlastnosti geometrických útvarů"
            icon={<BiRectangle />}
          />
        </div>
        <div className="flex flex-col items-center gap-5 mt-5 md:flex-row md:justify-end md">
          <Features1
            name="Interaktivní učení"
            text="promění geometrii ve zábavný zážitek díky dynamickým prvkům"
            icon={<BiBrain />}
          />
          <Features2
            name="Následné procvičování"
            text="vám pomůže upevnit znalosti prostřednictvím úkolů a kvízů"
            icon={<FaChalkboardTeacher />}
          />
          <Features1
            name="Sledování progresu"
            text="získávejte XP za splněné úkoly a sledujte svůj pokrok"
            icon={<GiProgression />}
          />
        </div>
      </div>
    </div>
  );
}

export default Features;
