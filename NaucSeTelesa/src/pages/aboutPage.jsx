import React from "react";
import {
  BookOpen,
  Code,
  Award,
  Users,
  Monitor,
  GitBranch,
  Layers,
  Activity,
} from "lucide-react";
import "../App.css";

const AboutPage = () => {
  return (
    <div className="bg-transparent text-white min-h-screen p-4 sm:p-6 md:p-12 lg:p-16 flex flex-col items-center">
      {/* Page Title */}
      <div className="flex w-full justify-center">
        <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-bold text-center mb-8 sm:mb-12 pb-4 sm:pb-6">
          <span className="userlvl">O Projektu</span>
        </h1>
      </div>

      {/* Project Introduction */}
      <div className="w-full max-w-6xl mx-auto mt-4 sm:mt-8">
        <section
          className="usergradient p-6 sm:p-8 rounded-2xl sm:rounded-3xl 
         
          
          mb-6 sm:mb-8"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl text-center font-semibold mb-4 sm:mb-6">
            Úvod do Projektu
          </h2>
          <p className="text-zinc-300 mb-4 sm:mb-6 leading-relaxed text-base sm:text-lg">
            Projekt vznikl jako ročníková práce pro Střední průmyslovou školu v
            Ústí nad Labem. Cílem bylo vytvořit moderní webovou aplikaci pro
            výuku geometrie, která by byla atraktivní, interaktivní a zábavná.
            Autor Filip Elznic se inspiroval svým kladným vztahem k matematice a
            touhou zlepšit své dovednosti ve webovém vývoji.
          </p>
          <p className="text-zinc-300 leading-relaxed text-base sm:text-lg">
            Projekt slouží jako online platforma pro výuku geometrických těles.
            Nabízí 3D modely těles, vzorce pro výpočet jejich vlastností (jako
            objem a povrch) a interaktivní úkoly pro ověření znalostí. Uživatelé
            mohou sledovat svůj pokrok pomocí bodového systému.
          </p>
        </section>
      </div>

      {/* Technologies */}
      <div className="w-full max-w-6xl mx-auto">
        <section
          className="usergradient p-6 sm:p-8 rounded-2xl sm:rounded-3xl 
          
          mb-6 sm:mb-8"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl text-center font-semibold mb-6 sm:mb-8">
            Technologie
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div className="bg-zinc-800 p-4 sm:p-6 rounded-2xl sm:rounded-3xl flex flex-col items-center text-center transition-all duration-100 hover:bg-zinc-700">
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center bg-purple-900 mb-3 sm:mb-4">
                <Code size={24} className="text-purple-300 sm:w-8 sm:h-8" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2">
                Frontend
              </h3>
              <p className="text-zinc-400 text-sm sm:text-base">
                React, JavaScript, Vite.js
              </p>
            </div>

            <div className="bg-zinc-800 p-4 sm:p-6 rounded-2xl sm:rounded-3xl flex flex-col items-center text-center transition-all duration-100 hover:bg-zinc-700">
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center bg-blue-900 mb-3 sm:mb-4">
                <Layers size={24} className="text-blue-300 sm:w-8 sm:h-8" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2">Backend</h3>
              <p className="text-zinc-400 text-sm sm:text-base">Supabase</p>
            </div>

            <div className="bg-zinc-800 p-4 sm:p-6 rounded-2xl sm:rounded-3xl flex flex-col items-center text-center transition-all duration-100 hover:bg-zinc-700">
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center bg-purple-900 mb-3 sm:mb-4">
                <Monitor size={24} className="text-purple-300 sm:w-8 sm:h-8" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2">Styling</h3>
              <p className="text-zinc-400 text-sm sm:text-base">
                Tailwind CSS, Figma
              </p>
            </div>

            <div className="bg-zinc-800 p-4 sm:p-6 rounded-2xl sm:rounded-3xl flex flex-col items-center text-center transition-all duration-100 hover:bg-zinc-700">
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center bg-blue-900 mb-3 sm:mb-4">
                <GitBranch size={24} className="text-blue-300 sm:w-8 sm:h-8" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2">
                Nástroje
              </h3>
              <p className="text-zinc-400 text-sm sm:text-base">
                Spline, GitHub
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* Features */}
      <div className="flex flex-col lg:flex-row w-full max-w-6xl mx-auto mt-4 sm:mt-8 gap-4 sm:gap-6">
        <div className="usergradient p-6 sm:p-8 rounded-2xl sm:rounded-3xl w-full">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">
            Hlavní Funkce
          </h2>
          <div className="space-y-3 sm:space-y-4">
            <div className="bg-zinc-800 p-3 sm:p-4 rounded-2xl sm:rounded-3xl transition-all duration-100 hover:bg-zinc-700">
              <div className="flex">
                <div className="flex-shrink-0 mr-3 sm:mr-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center bg-purple-900">
                    <Layers
                      size={20}
                      className="text-purple-300 sm:w-6 sm:h-6"
                    />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2">
                    3D Modely
                  </h3>
                  <p className="text-zinc-300 text-sm sm:text-base">
                    Prohlížení interaktivních 3D modelů geometrických těles
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-zinc-800 p-3 sm:p-4 rounded-2xl sm:rounded-3xl transition-all duration-100 hover:bg-zinc-700">
              <div className="flex">
                <div className="flex-shrink-0 mr-3 sm:mr-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center bg-blue-900">
                    <BookOpen
                      size={20}
                      className="text-blue-300 sm:w-6 sm:h-6"
                    />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2">
                    Vzorce
                  </h3>
                  <p className="text-zinc-300 text-sm sm:text-base">
                    Studium vzorců pro výpočet vlastností těles
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-zinc-800 p-3 sm:p-4 rounded-2xl sm:rounded-3xl transition-all duration-100 hover:bg-zinc-700">
              <div className="flex">
                <div className="flex-shrink-0 mr-3 sm:mr-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center bg-purple-900">
                    <Award
                      size={20}
                      className="text-purple-300 sm:w-6 sm:h-6"
                    />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2">
                    Interaktivní Úkoly
                  </h3>
                  <p className="text-zinc-300 text-sm sm:text-base">
                    Řešení úkolů s bodovým hodnocením pro ověření znalostí
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="usergradient p-6 sm:p-8 rounded-2xl sm:rounded-3xl w-full">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">
            Další Vlastnosti
          </h2>
          <div className="space-y-3 sm:space-y-4">
            <div className="bg-zinc-800 p-3 sm:p-4 rounded-2xl sm:rounded-3xl transition-all duration-100 hover:bg-zinc-700">
              <div className="flex">
                <div className="flex-shrink-0 mr-3 sm:mr-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center bg-blue-900">
                    <Users size={20} className="text-blue-300 sm:w-6 sm:h-6" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2">
                    Uživatelský Účet
                  </h3>
                  <p className="text-zinc-300 text-sm sm:text-base">
                    Možnost sledování pokroku a ukládání výsledků
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-zinc-800 p-3 sm:p-4 rounded-2xl sm:rounded-3xl transition-all duration-100 hover:bg-zinc-700">
              <div className="flex">
                <div className="flex-shrink-0 mr-3 sm:mr-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center bg-purple-900">
                    <Activity
                      size={20}
                      className="text-purple-300 sm:w-6 sm:h-6"
                    />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2">
                    Responzivní Design
                  </h3>
                  <p className="text-zinc-300 text-sm sm:text-base">
                    Optimalizace pro různé velikosti obrazovek
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Target Audience */}
      <div className="flex flex-col h-full w-full max-w-6xl mt-6 sm:mt-8">
        <section className="usergradient p-6 sm:p-8 rounded-2xl sm:rounded-3xl mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl text-center font-semibold mb-4 sm:mb-6">
            Pro Koho Je Projekt Určen
          </h2>
          <p className="text-lg sm:text-xl text-zinc-200 leading-relaxed text-center">
            Projekt je určen pro uživatele všech věkových skupin, kteří se
            chtějí naučit nebo procvičit geometrická tělesa. Primárně je zaměřen
            na studenty, ale může být užitečný i pro učitele nebo kohokoli s
            zájmem o matematiku.
          </p>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;
