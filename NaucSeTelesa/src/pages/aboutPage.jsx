import React, { useState } from "react";

const OverlappingHeadings = () => {
  const [activeSection, setActiveSection] = useState(1); // Start with first section active

  const sections = [
    {
      id: 1,
      number: "01",
      heading: "Proč projekt vznikl?",
      content:
        "Projekt vznikl jako ročníková práce pro Střední průmyslovou školu v Ústí nad Labem. Cílem bylo vytvořit moderní webovou aplikaci pro výuku geometrie, která by byla atraktivní, interaktivní a zábavná. Autor Filip Elznic se inspiroval svým kladným vztahem k matematice a touhou zlepšit své dovednosti ve webovém vývoji.",
    },
    {
      id: 2,
      number: "02",
      heading: "K čemu projekt slouží?",
      content:
        "Projekt slouží jako online platforma pro výuku geometrických těles. Nabízí 3D modely těles, vzorce pro výpočet jejich vlastností (jako objem a povrch) a interaktivní úkoly pro ověření znalostí. Uživatelé mohou sledovat svůj pokrok pomocí bodového systému.",
    },
    {
      id: 3,
      number: "03",
      heading: "Jaké technologie byly použity?",
      content:
        "Projekt využívá moderní technologie jako React, JavaScript a Vite.js pro frontend. Pro backend a databázi byl zvolen Supabase. Dále byly použity nástroje jako Spline pro 3D modely, Tailwind CSS pro styling, GitHub pro verzování kódu a další pomocné nástroje jako Figma pro design.",
    },
    {
      id: 4,
      number: "04",
      heading: "Jaké jsou hlavní funkce?",
      content:
        "Hlavní funkce zahrnují: 1) Prohlížení 3D modelů geometrických těles, 2) Studium vzorců pro výpočet vlastností těles, 3) Řešení interaktivních úkolů s bodovým hodnocením, 4) Uživatelský účet s možností sledování pokroku, 5) Responzivní design pro různé velikosti obrazovek.",
    },
    {
      id: 5,
      number: "05",
      heading: "Kdo je cílovou skupinou?",
      content:
        "Projekt je určen pro uživatele všech věkových skupin, kteří se chtějí naučit nebo procvičit geometrická tělesa. Primárně je zaměřen na studenty, ale může být užitečný i pro učitele nebo kohokoli s zájmem o matematiku.",
    },
  ];

  return (
    <>
      <div className="bg-black">
        <div className="min-h-screen w-full relative text-white p-4 md:p-8">
          {/* Projekt v kostce header */}
          <div className="flex flex-col w-full justify-center items-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold  text-purple-400 mb-2">
              Projekt v kostce
            </h1>
          </div>

          {/* Overlapping sections container */}
          <div className="w-5/6 mx-auto">
            {sections.map((section, index) => (
              <div
                key={section.id}
                className={`relative cursor-pointer transition-all duration-500`}
                style={{
                  marginTop: index === 0 ? "0" : "-50px", // Increased negative margin for more overlap
                  zIndex: activeSection === section.id ? 10 : 10 - index,
                  opacity: activeSection === section.id ? 1 : 0.4,
                  transform: `translateY(${
                    activeSection === section.id ? "0" : "10px"
                  })`,
                  height: activeSection === section.id ? "auto" : "180px", // Increased height
                  overflow: "hidden",
                }}
                onMouseEnter={() => setActiveSection(section.id)}
              >
                <div className="flex flex-row items-start">
                  {/* Large number */}
                  <div
                    className={`text-8xl md:text-9xl lg:text-[12rem] font-bold transition-all duration-500 ease-out
                    ${
                      activeSection === section.id ? "text-white" : "text-white"
                    }`}
                    style={{ lineHeight: "1.2" }} // Increased line height for taller numbers
                  >
                    {section.number}
                  </div>

                  {/* Heading and content */}
                  <div className="mt-4 md:mt-8">
                    <h3
                      className={`text-2xl md:text-3xl font-bold mb-3 md:mb-4 transition-all duration-300
                    ${
                      activeSection === section.id
                        ? "text-white"
                        : "text-gray-500"
                    }`}
                    >
                      {section.heading}
                    </h3>

                    {/* Content with expand/collapse effect */}
                    <div
                      className={`max-w-2xl transition-all duration-500 overflow-hidden
                    ${
                      activeSection === section.id
                        ? "max-h-96 opacity-100"
                        : "max-h-0 opacity-0"
                    }`}
                    >
                      <p className="text-gray-300">{section.content}</p>
                    </div>
                  </div>
                </div>

                {/* Border line with animation */}
                <div className="absolute bottom-0 left-0 w-full h-px bg-zinc-800">
                  <div
                    className={`h-full bg-purple-500 transition-all duration-500 ease-out
                  ${activeSection === section.id ? "w-full" : "w-0"}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default OverlappingHeadings;
