import React from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

function AboutPage() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-black text-white p-8">
        {/* Animated Heading */}
        <div className="flex w-full justify-center">
          <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold text-center mb-12 pb-6 typing-animation">
            <span className="userlvl">O Projektu</span>
          </h1>
        </div>

        {/* Project Description */}
        <div className="max-w-4xl mx-auto text-lg md:text-xl lg:text-2xl text-gray-300 leading-relaxed">
          <p className="mb-6">
            Jako téma své ročníkové práce jsem zvolil vytvoření webové aplikace
            zaměřené na procvičování geometrických těles. Uživatelé se budou
            moci přihlásit a sledovat svůj pokrok. Na stránce najdou různá
            cvičení, která budou obsahovat buď obrázky, nebo interaktivní 3D
            modely těles, aby si je lépe dokázali představit.
          </p>
          <p className="mb-6">
            Dále zde budou vzorce pro výpočet objemu, povrchu a dalších
            vlastností těles. Webová aplikace je postavena pomocí moderních
            technologií jako React, Vite, JavaScript a Spline. Hlavním cílem
            projektu je poskytnout lidem lepší povědomí o geometrických tělesech
            a usnadnit jim jejich vizuální a praktické pochopení.
          </p>
          <p>
            Projekt je nyní hotový a plně funkční. Doufám, že tato aplikace bude
            užitečným nástrojem pro všechny, kteří se chtějí zlepšit v geometrii
            a pochopit základy geometrických těles.
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default AboutPage;
