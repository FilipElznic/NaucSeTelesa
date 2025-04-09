import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import katex from "katex";
import "katex/dist/katex.min.css";
import Spline from "@splinetool/react-spline";
import "../App.css";

function Telesa() {
  const [bodies, setBodies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBody, setSelectedBody] = useState(null);
  const [isSplineLoading, setIsSplineLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const fetchBodies = async () => {
      setLoading(true);
      const { data, error } = await supabase.rpc("fetch_geometric_bodies4");

      if (error) {
        console.error("Error fetching geometric bodies:", error);
      } else {
        setBodies(data);
        console.log("Geometric bodies fetched:", data);
      }
      setLoading(false);
    };

    fetchBodies();

    // Add resize listener to detect mobile/desktop
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleBodyClick = (body) => {
    setSelectedBody(body);
    setIsSplineLoading(true);
  };

  const closeModal = () => {
    setSelectedBody(null);
  };

  const handleSplineLoad = () => {
    setIsSplineLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-zinc-950 to-black text-white flex flex-col items-center p-4 md:p-6">
      {/* Futuristic Heading with Glow Effect */}
      <h1 className="text-3xl md:text-5xl lg:text-9xl font-bold my-8 md:my-20 text-transparent bg-clip-text userlvl text-center relative">
        Geometrická tělesa
        <div className="absolute inset-0 blur-md opacity-50 bg-clip-text userlvl z-[-1]">
          Geometrická tělesa
        </div>
      </h1>
      
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-7xl">
          {bodies.map((body, index) => (
            <li
              key={index}
              className="usergradient rounded-lg p-4 md:p-6 shadow-lg backdrop-blur-sm border border-purple-500/20 transform transition duration-300 hover:scale-105 hover:shadow-purple-500/20 hover:shadow-lg cursor-pointer"
              onClick={() => handleBodyClick(body)}
            >
              <div className="flex flex-col h-full">
                <div className="flex flex-col md:flex-row justify-between items-center">
                  <h2 className="text-2xl md:text-3xl font-bold mb-4 text-purple-300 drop-shadow-md">
                    {body.geometric_body_name}
                  </h2>
                  
                  {body.image_url && (
                    <div className="flex justify-center mb-4 w-full md:w-auto">
                      <img
                        src={body.image_url}
                        alt={body.geometric_body_name}
                        className="w-40 h-40 md:w-48 md:h-48 object-contain rounded-md backdrop-blur-sm bg-black/30 p-2"
                      />
                    </div>
                  )}
                </div>
                
                <p className="text-gray-300 mb-4 text-base md:text-lg leading-relaxed">
                  {body.description}
                  {body.description1 && (
                    <>
                      <br />
                      {body.description1}
                    </>
                  )}
                </p>
                
                <div className="mt-auto">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                    {body.volume_name && (
                      <div className="bg-black/40 backdrop-blur-sm p-3 rounded-lg border border-pink-500/30 hover:border-pink-500/50 transition-colors">
                        <h3 className="text-base md:text-lg text-pink-400 mb-2">
                          {body.volume_name}
                        </h3>
                        <div className="formula-container overflow-x-auto pb-2">
                          <p
                            className="formula text-xl"
                            dangerouslySetInnerHTML={{
                              __html: katex.renderToString(body.volume_formula, {
                                throwOnError: false,
                                displayMode: true
                              }),
                            }}
                          />
                        </div>
                      </div>
                    )}
                    
                    {body.surface_name && (
                      <div className="bg-black/40 backdrop-blur-sm p-3 rounded-lg border border-indigo-500/30 hover:border-indigo-500/50 transition-colors">
                        <h3 className="text-base md:text-lg text-indigo-400 mb-2">
                          {body.surface_name}
                        </h3>
                        <div className="formula-container overflow-x-auto pb-2">
                          <p
                            className="formula text-xl"
                            dangerouslySetInnerHTML={{
                              __html: katex.renderToString(body.surface_formula, {
                                throwOnError: false,
                                displayMode: true
                              }),
                            }}
                          />
                        </div>
                      </div>
                    )}
                    
                    {body.area_name && (
                      <div className="bg-black/40 backdrop-blur-sm p-3 rounded-lg border border-pink-500/30 hover:border-pink-500/50 transition-colors">
                        <h3 className="text-base md:text-lg text-pink-400 mb-2">
                          {body.area_name}
                        </h3>
                        <div className="formula-container overflow-x-auto pb-2">
                          <p
                            className="formula text-xl"
                            dangerouslySetInnerHTML={{
                              __html: katex.renderToString(body.area_formula, {
                                throwOnError: false,
                                displayMode: true
                              }),
                            }}
                          />
                        </div>
                      </div>
                    )}
                    
                    {body.perimeter_name && (
                      <div className="bg-black/40 backdrop-blur-sm p-3 rounded-lg border border-indigo-500/30 hover:border-indigo-500/50 transition-colors">
                        <h3 className="text-base md:text-lg text-indigo-400 mb-2">
                          {body.perimeter_name}
                        </h3>
                        <div className="formula-container overflow-x-auto pb-2">
                          <p
                            className="formula text-xl"
                            dangerouslySetInnerHTML={{
                              __html: katex.renderToString(body.perimeter_formula, {
                                throwOnError: false,
                                displayMode: true
                              }),
                            }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      {selectedBody && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-sm flex items-center justify-center p-2 md:p-4 z-50">
          <div className="usergradient rounded-lg p-4 md:p-6 w-full max-w-5xl max-h-[90vh] overflow-y-auto relative border border-purple-500/30">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 md:top-4 md:right-4 text-white bg-purple-800 hover:bg-purple-700 rounded-full w-8 h-8 flex items-center justify-center text-xl z-10 transition-colors"
              aria-label="Close modal"
            >
              &times;
            </button>
            
            <h2 className="text-2xl md:text-3xl font-bold mb-4 userlvl text-center drop-shadow-md">
              {selectedBody.geometric_body_name}
            </h2>
            
            {selectedBody.spline_url ? (
              <div className="relative rounded-xl overflow-hidden border border-purple-500/20">
                {isSplineLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/70 rounded-lg z-10">
                    <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}
                <div className={`w-full ${isMobile ? 'h-[70vh]' : 'h-[60vh]'} rounded-lg overflow-hidden`}>
                  <Spline
                    scene={selectedBody.spline_url}
                    style={{ 
                      width: '100%', 
                      height: '100%', 
                      transform: isMobile ? 'scale(1.5)' : 'scale(1)'
                    }}
                    onLoad={handleSplineLoad}
                  />
                </div>
              </div>
            ) : (
              <div className="relative w-full flex justify-center">
                <img
                  src={selectedBody.image_url}
                  alt={selectedBody.geometric_body_name}
                  className="w-full max-h-[70vh] object-contain rounded-lg mb-4 backdrop-blur-sm bg-black/30 p-4"
                />
              </div>
            )}
            
            <div className="mt-6 md:mt-8">
              <div className="bg-black/50 backdrop-blur-sm p-4 rounded-lg border border-purple-500/20">
                <p className="text-gray-300 text-lg md:text-xl leading-relaxed">
                  {selectedBody.description}
                  {selectedBody.description1 && (
                    <>
                      <br /><br />
                      {selectedBody.description1}
                    </>
                  )}
                </p>
              </div>
              
              {(selectedBody.volume_name || selectedBody.surface_name || selectedBody.area_name || selectedBody.perimeter_name) && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                  {selectedBody.volume_name && (
                    <div className="bg-black/40 backdrop-blur-sm p-4 rounded-lg border border-pink-500/30">
                      <h3 className="text-lg md:text-xl text-pink-400 mb-3">
                        {selectedBody.volume_name}
                      </h3>
                      <div className="formula-container overflow-x-auto pb-2">
                        <p
                          className="formula text-xl md:text-2xl"
                          dangerouslySetInnerHTML={{
                            __html: katex.renderToString(selectedBody.volume_formula, {
                              throwOnError: false,
                              displayMode: true
                            }),
                          }}
                        />
                      </div>
                    </div>
                  )}
                  
                  {selectedBody.surface_name && (
                    <div className="bg-black/40 backdrop-blur-sm p-4 rounded-lg border border-indigo-500/30">
                      <h3 className="text-lg md:text-xl text-indigo-400 mb-3">
                        {selectedBody.surface_name}
                      </h3>
                      <div className="formula-container overflow-x-auto pb-2">
                        <p
                          className="formula text-xl md:text-2xl"
                          dangerouslySetInnerHTML={{
                            __html: katex.renderToString(selectedBody.surface_formula, {
                              throwOnError: false,
                              displayMode: true
                            }),
                          }}
                        />
                      </div>
                    </div>
                  )}
                  
                  {selectedBody.area_name && (
                    <div className="bg-black/40 backdrop-blur-sm p-4 rounded-lg border border-pink-500/30">
                      <h3 className="text-lg md:text-xl text-pink-400 mb-3">
                        {selectedBody.area_name}
                      </h3>
                      <div className="formula-container overflow-x-auto pb-2">
                        <p
                          className="formula text-xl md:text-2xl"
                          dangerouslySetInnerHTML={{
                            __html: katex.renderToString(selectedBody.area_formula, {
                              throwOnError: false,
                              displayMode: true
                            }),
                          }}
                        />
                      </div>
                    </div>
                  )}
                  
                  {selectedBody.perimeter_name && (
                    <div className="bg-black/40 backdrop-blur-sm p-4 rounded-lg border border-indigo-500/30">
                      <h3 className="text-lg md:text-xl text-indigo-400 mb-3">
                        {selectedBody.perimeter_name}
                      </h3>
                      <div className="formula-container overflow-x-auto pb-2">
                        <p
                          className="formula text-xl md:text-2xl"
                          dangerouslySetInnerHTML={{
                            __html: katex.renderToString(selectedBody.perimeter_formula, {
                              throwOnError: false,
                              displayMode: true
                            }),
                          }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      
      {/* Add CSS for formula containers */}
      
    </div>
  );
}

export default Telesa;