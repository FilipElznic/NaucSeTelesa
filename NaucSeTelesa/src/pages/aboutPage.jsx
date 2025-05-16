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
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Project Introduction */}
        <div className="mb-20">
          <div className="flex items-center mb-6">
            <div className="h-px bg-gradient-to-r from-purple-500 to-blue-400 flex-grow"></div>
            <h2 className="text-3xl md:text-5xl lg:text-7xl font-bold px-6">
              O Projektu
            </h2>
            <div className="h-px bg-gradient-to-l from-purple-500 to-blue-400 flex-grow"></div>
          </div>

          <div className="usergradient rounded-lg shadow-2xl p-8 border border-gray-700">
            <p className="text-gray-300 mb-6 leading-relaxed">
              Projekt vznikl jako ročníková práce pro Střední průmyslovou školu
              v Ústí nad Labem. Cílem bylo vytvořit moderní webovou aplikaci pro
              výuku geometrie, která by byla atraktivní, interaktivní a zábavná.
              Autor Filip Elznic se inspiroval svým kladným vztahem k matematice
              a touhou zlepšit své dovednosti ve webovém vývoji.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Projekt slouží jako online platforma pro výuku geometrických
              těles. Nabízí 3D modely těles, vzorce pro výpočet jejich
              vlastností (jako objem a povrch) a interaktivní úkoly pro ověření
              znalostí. Uživatelé mohou sledovat svůj pokrok pomocí bodového
              systému.
            </p>
          </div>
        </div>

        {/* Technologies */}
        <div className="mb-20">
          <div className="flex items-center mb-6">
            <div className="h-px bg-gradient-to-r from-purple-500 to-blue-400 flex-grow"></div>
            <h2 className="text-3xl font-bold px-6">Technologie</h2>
            <div className="h-px bg-gradient-to-l from-purple-500 to-blue-400 flex-grow"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="usergradient p-6 rounded-lg border border-gray-700 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full flex items-center justify-center bg-purple-900 mb-4">
                <Code size={32} className="text-purple-300" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Frontend</h3>
              <p className="text-gray-400">React, JavaScript, Vite.js</p>
            </div>

            <div className="usergradient p-6 rounded-lg border border-gray-700 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full flex items-center justify-center bg-blue-900 mb-4">
                <Layers size={32} className="text-blue-300" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Backend</h3>
              <p className="text-gray-400">Supabase</p>
            </div>

            <div className="usergradient p-6 rounded-lg border border-gray-700 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full flex items-center justify-center bg-purple-900 mb-4">
                <Monitor size={32} className="text-purple-300" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Styling</h3>
              <p className="text-gray-400">Tailwind CSS, Figma</p>
            </div>

            <div className="usergradient p-6 rounded-lg border border-gray-700 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full flex items-center justify-center bg-blue-900 mb-4">
                <GitBranch size={32} className="text-blue-300" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Nástroje</h3>
              <p className="text-gray-400">Spline, GitHub</p>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mb-20">
          <div className="flex items-center mb-6">
            <div className="h-px bg-gradient-to-r from-purple-500 to-blue-400 flex-grow"></div>
            <h2 className="text-3xl font-bold px-6">Funkce</h2>
            <div className="h-px bg-gradient-to-l from-purple-500 to-blue-400 flex-grow"></div>
          </div>

          <div className="bg-gray-800 rounded-lg shadow-2xl p-8 border usergradient">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex">
                <div className="flex-shrink-0 mr-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center bg-purple-900">
                    <Layers size={24} className="text-purple-300" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">3D Modely</h3>
                  <p className="text-gray-400">
                    Prohlížení interaktivních 3D modelů geometrických těles
                  </p>
                </div>
              </div>

              <div className="flex">
                <div className="flex-shrink-0 mr-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center bg-blue-900">
                    <BookOpen size={24} className="text-blue-300" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Vzorce</h3>
                  <p className="text-gray-400">
                    Studium vzorců pro výpočet vlastností těles
                  </p>
                </div>
              </div>

              <div className="flex">
                <div className="flex-shrink-0 mr-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center bg-purple-900">
                    <Award size={24} className="text-purple-300" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    Interaktivní Úkoly
                  </h3>
                  <p className="text-gray-400">
                    Řešení úkolů s bodovým hodnocením pro ověření znalostí
                  </p>
                </div>
              </div>

              <div className="flex">
                <div className="flex-shrink-0 mr-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center bg-blue-900">
                    <Users size={24} className="text-blue-300" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    Uživatelský Účet
                  </h3>
                  <p className="text-gray-400">
                    Možnost sledování pokroku a ukládání výsledků
                  </p>
                </div>
              </div>

              <div className="flex">
                <div className="flex-shrink-0 mr-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center bg-purple-900">
                    <Activity size={24} className="text-purple-300" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    Responzivní Design
                  </h3>
                  <p className="text-gray-400">
                    Optimalizace pro různé velikosti obrazovek
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Target Audience */}
        <div>
          <div className="flex items-center mb-6">
            <div className="h-px bg-gradient-to-r bg-transparent flex-grow"></div>
            <h2 className="text-3xl font-bold px-6">Pro Koho</h2>
            <div className="h-px bg-transparent flex-grow"></div>
          </div>

          <div className="bg-gradient-to-br usergradient rounded-lg shadow-2xl p-8 border border-gray-700 text-center">
            <p className="text-xl text-gray-200 leading-relaxed">
              Projekt je určen pro uživatele všech věkových skupin, kteří se
              chtějí naučit nebo procvičit geometrická tělesa. Primárně je
              zaměřen na studenty, ale může být užitečný i pro učitele nebo
              kohokoli s zájmem o matematiku.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
    </div>
  );
};

export default AboutPage;
