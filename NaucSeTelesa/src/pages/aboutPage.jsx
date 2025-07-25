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
          <span className="userlvl">About the Project</span>
        </h1>
      </div>

      {/* Project Introduction */}
      <div className="w-full max-w-6xl mx-auto mt-4 sm:mt-8">
        <section
          className="usergradient p-6 sm:p-8 rounded-2xl sm:rounded-3xl 
         
          
          mb-6 sm:mb-8"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl text-center font-semibold mb-4 sm:mb-6">
            Project Introduction
          </h2>
          <p className="text-zinc-300 mb-4 sm:mb-6 leading-relaxed text-base sm:text-lg">
            This project was created as a thesis work for the Secondary
            Technical School in Ústí nad Labem. The goal was to create a modern
            web application for teaching geometry that would be attractive,
            interactive and fun. Author Filip Elznic was inspired by his
            positive relationship with mathematics and desire to improve his web
            development skills.
          </p>
          <p className="text-zinc-300 leading-relaxed text-base sm:text-lg">
            The project serves as an online platform for teaching geometric
            solids. It offers 3D models of solids, formulas for calculating
            their properties (such as volume and surface area) and interactive
            tasks to verify knowledge. Users can track their progress using a
            point system.
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
            Technologies
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
              <h3 className="text-lg sm:text-xl font-semibold mb-2">Tools</h3>
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
            Main Features
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
                    3D Models
                  </h3>
                  <p className="text-zinc-300 text-sm sm:text-base">
                    View interactive 3D models of geometric solids
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
                    Formulas
                  </h3>
                  <p className="text-zinc-300 text-sm sm:text-base">
                    Study formulas for calculating solid properties
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
                    Interactive Tasks
                  </h3>
                  <p className="text-zinc-300 text-sm sm:text-base">
                    Solve tasks with point scoring to verify knowledge
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="usergradient p-6 sm:p-8 rounded-2xl sm:rounded-3xl w-full">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">
            Additional Features
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
                    User Account
                  </h3>
                  <p className="text-zinc-300 text-sm sm:text-base">
                    Ability to track progress and save results
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
                    Responsive Design
                  </h3>
                  <p className="text-zinc-300 text-sm sm:text-base">
                    Optimization for different screen sizes
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
            Who Is This Project For
          </h2>
          <p className="text-lg sm:text-xl text-zinc-200 leading-relaxed text-center">
            The project is designed for users of all age groups who want to
            learn or practice geometric solids. It&apos;s primarily aimed at
            students, but can also be useful for teachers or anyone with an
            interest in mathematics.
          </p>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;
