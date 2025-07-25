import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import katex from "katex";
import "katex/dist/katex.min.css";
import Spline from "@splinetool/react-spline";
import { XMarkIcon } from "@heroicons/react/24/outline";

const GeometricBodiesCarousel = () => {
  // State variables
  const [bodies, setBodies] = useState([]); // Stores list of geometric solids
  const [loading, setLoading] = useState(true); // Loading indicator
  const [currentSlide, setCurrentSlide] = useState(0); // Current slide in carousel
  const [isSplineLoading, setIsSplineLoading] = useState(true); // 3D model loading
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768); // Mobile device detection
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal window opening
  const [selectedBody, setSelectedBody] = useState(null); // Selected solid for detail

  // Function for rendering text with KaTeX formulas
  const renderTextWithKaTeX = (text) => {
    if (!text) return "";

    // Regex to find LaTeX expressions between $...$ (inline) or $$...$$ (block)
    const latexRegex = /(\$\$.*?\$\$|\$.*?\$)/g;

    const parts = text.split(latexRegex);

    return parts.map((part, index) => {
      if (part.match(/^\$\$.*\$\$$/)) {
        // Block math ($$...$$)
        const formula = part.slice(2, -2);
        try {
          return (
            <span
              key={index}
              className="formula-block block my-2"
              dangerouslySetInnerHTML={{
                __html: katex.renderToString(formula, {
                  throwOnError: false,
                  displayMode: true,
                }),
              }}
            />
          );
        } catch (error) {
          return <span key={index}>{part}</span>;
        }
      } else if (part.match(/^\$.*\$$/)) {
        // Inline math ($...$)
        const formula = part.slice(1, -1);
        try {
          return (
            <span
              key={index}
              className="formula-inline"
              dangerouslySetInnerHTML={{
                __html: katex.renderToString(formula, {
                  throwOnError: false,
                  displayMode: false,
                }),
              }}
            />
          );
        } catch (error) {
          return <span key={index}>{part}</span>;
        }
      } else {
        // Regular text
        return <span key={index}>{part}</span>;
      }
    });
  };

  // Loading data during component initialization
  useEffect(() => {
    const fetchBodies = async () => {
      setLoading(true);
      const { data, error } = await supabase.rpc("fetch_geometric_bodies4");

      if (error) {
        console.error("Error loading geometric solids:", error);
      } else {
        setBodies(data);
      }
      setLoading(false);
    };

    fetchBodies();

    // Window size change listener (mobile/desktop detection)
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Navigace v karuselu
  const goToNextSlide = () => {
    if (bodies.length > 0) {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % bodies.length);
    }
  };

  const goToPrevSlide = () => {
    if (bodies.length > 0) {
      setCurrentSlide(
        (prevSlide) => (prevSlide - 1 + bodies.length) % bodies.length
      );
    }
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // Opening/closing modal window
  const openModal = (body) => {
    setSelectedBody(body);
    setIsModalOpen(true);
    setIsSplineLoading(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedBody(null);
  };

  const handleSplineLoad = () => {
    setIsSplineLoading(false);
  };

  // Get visible slides (previous, current, next)
  const getVisibleSlides = () => {
    if (bodies.length === 0) return [];

    // Na mobilu zobrazíme pouze aktuální slide
    if (isMobile) {
      return [{ body: bodies[currentSlide], index: currentSlide }];
    }

    // Na desktopu zobrazíme 3 slidů
    const totalSlides = bodies.length;
    const prevIndex = (currentSlide - 1 + totalSlides) % totalSlides;
    const nextIndex = (currentSlide + 1) % totalSlides;

    return [
      { body: bodies[prevIndex], index: prevIndex },
      { body: bodies[currentSlide], index: currentSlide },
      { body: bodies[nextIndex], index: nextIndex },
    ];
  };

  // Loading stav
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-black via-zinc-950 to-black">
        <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const visibleSlides = getVisibleSlides();

  return (
    <div className="relative w-full h-full bg-transparent text-white overflow-hidden mb-10">
      {/* Nadpis s efektem záře */}

      {/* Karusel */}
      <div className="relative w-full h-4/5">
        <div className="flex justify-center items-center h-full px-2 md:px-4">
          <div className="flex w-full justify-center items-center gap-2 md:gap-4 h-full">
            {visibleSlides.map((item, idx) => (
              <div
                key={item.index}
                className={`transition-all duration-300 ${
                  isMobile
                    ? "w-full h-5/6" // Na mobilu plná šířka a výška 5/6
                    : idx === 1
                    ? "w-2/4 h-5/6" // Hlavní karta - šířka 2/4, výška 5/6
                    : "w-1/4 h-2/3" // Vedlejší karty - šířka 1/4, výška 2/3
                }`}
                onClick={() => !isMobile && idx !== 1 && goToSlide(item.index)}
              >
                <div
                  className={`bg-zinc-900 rounded-lg shadow-lg h-full overflow-hidden cursor-pointer flex flex-col ${
                    isMobile || idx === 1
                      ? "border-2 border-purple-400 shadow-purple-500/50"
                      : "border border-purple-500/20"
                  }`}
                >
                  {/* Obsah karty */}
                  <div className="p-4 md:p-6 flex flex-col h-full">
                    {/* Název a obrázek */}
                    <div className="flex flex-col md:flex-row justify-between items-center mb-4">
                      <h2 className="text-xl md:text-3xl font-bold mb-2 md:mb-0 text-purple-300 drop-shadow-md">
                        {item.body.geometric_body_name}
                      </h2>

                      {item.body.image_url && (
                        <div className="flex justify-center mb-2 md:mb-0">
                          <img
                            src={item.body.image_url}
                            alt={item.body.geometric_body_name}
                            className="w-20 h-20 md:w-32 md:h-32 object-contain rounded-md p-2"
                          />
                        </div>
                      )}
                    </div>

                    {/* Popis */}
                    <div className="flex-grow overflow-y-auto">
                      <div className="text-gray-300 mb-4 text-sm md:text-base leading-relaxed">
                        {renderTextWithKaTeX(item.body.description)}
                      </div>
                      {(idx === 1 || isMobile) && item.body.description1 && (
                        <div className="mt-4">
                          <div className="text-gray-300 text-sm md:text-base leading-relaxed">
                            {renderTextWithKaTeX(item.body.description1)}
                          </div>
                        </div>
                      )}

                      {/* Vzorce - zobrazujeme pouze pro hlavní kartu nebo na mobilu */}
                      {(idx === 1 || isMobile) && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                          {/* Objem */}
                          {item.body.volume_name && (
                            <div className="bg-black/40 backdrop-blur-sm p-2 rounded-lg border border-pink-500/30">
                              <h3 className="text-sm md:text-base text-pink-400 mb-1">
                                {item.body.volume_name}
                              </h3>
                              <div className="formula-container overflow-x-auto">
                                <p
                                  className="formula text-sm md:text-lg"
                                  dangerouslySetInnerHTML={{
                                    __html: katex.renderToString(
                                      item.body.volume_formula,
                                      {
                                        throwOnError: false,
                                        displayMode: true,
                                      }
                                    ),
                                  }}
                                />
                              </div>
                            </div>
                          )}

                          {/* Povrch */}
                          {item.body.surface_name && (
                            <div className="bg-black/40 backdrop-blur-sm p-2 rounded-lg border border-indigo-500/30">
                              <h3 className="text-sm md:text-base text-indigo-400 mb-1">
                                {item.body.surface_name}
                              </h3>
                              <div className="formula-container overflow-x-auto">
                                <p
                                  className="formula text-sm md:text-lg"
                                  dangerouslySetInnerHTML={{
                                    __html: katex.renderToString(
                                      item.body.surface_formula,
                                      {
                                        throwOnError: false,
                                        displayMode: true,
                                      }
                                    ),
                                  }}
                                />
                              </div>
                            </div>
                          )}

                          {/* Obsah */}
                          {item.body.area_name && (
                            <div className="bg-black/40 backdrop-blur-sm p-2 rounded-lg border border-pink-500/30">
                              <h3 className="text-sm md:text-base text-pink-400 mb-1">
                                {item.body.area_name}
                              </h3>
                              <div className="formula-container overflow-x-auto">
                                <p
                                  className="formula text-sm md:text-lg"
                                  dangerouslySetInnerHTML={{
                                    __html: katex.renderToString(
                                      item.body.area_formula,
                                      {
                                        throwOnError: false,
                                        displayMode: true,
                                      }
                                    ),
                                  }}
                                />
                              </div>
                            </div>
                          )}

                          {/* Obvod */}
                          {item.body.perimeter_name && (
                            <div className="bg-black/40 backdrop-blur-sm p-2 rounded-lg border border-indigo-500/30">
                              <h3 className="text-sm md:text-base text-indigo-400 mb-1">
                                {item.body.perimeter_name}
                              </h3>
                              <div className="formula-container overflow-x-auto">
                                <p
                                  className="formula text-sm md:text-lg"
                                  dangerouslySetInnerHTML={{
                                    __html: katex.renderToString(
                                      item.body.perimeter_formula,
                                      {
                                        throwOnError: false,
                                        displayMode: true,
                                      }
                                    ),
                                  }}
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Tlačítko pro 3D model - pouze pro hlavní kartu nebo mobil */}
                    {(idx === 1 || isMobile) && (
                      <div className="mt-4 text-center">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            openModal(item.body);
                          }}
                          className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 md:py-3 md:px-6 rounded-full transition-colors shadow-md text-sm md:text-base"
                        >
                          {item.body.spline_url
                            ? "View 3D model"
                            : "View details"}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigační tlačítka */}
        <button
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-purple-600 bg-opacity-70 hover:bg-opacity-100 p-2 rounded-full transition-colors z-20"
          onClick={goToPrevSlide}
        >
          <div className="border-2 border-white w-6 h-6 md:w-8 md:h-8 flex items-center justify-center rounded-full text-white">
            ←
          </div>
        </button>

        <button
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-purple-600 bg-opacity-70 hover:bg-opacity-100 p-2 rounded-full transition-colors z-20"
          onClick={goToNextSlide}
        >
          <div className="border-2 border-white w-6 h-6 md:w-8 md:h-8 flex items-center justify-center rounded-full text-white">
            →
          </div>
        </button>
      </div>

      {/* Modální okno s detailem */}
      {isModalOpen && selectedBody && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-sm flex items-center justify-center p-2 md:p-4 z-50">
          <div className="bg-zinc-900 rounded-lg p-4 md:p-6 w-full max-w-5xl max-h-[90vh] overflow-y-auto relative border border-purple-500/30">
            {/* Tlačítko pro zavření - upraveno na střed s ikonou X */}

            <button
              onClick={closeModal}
              className="bg-purple-800 absolute right-3 hover:bg-purple-700 text-white rounded-full w-8 h-8 flex items-center justify-center text-xl z-10 transition-colors shadow-lg"
              aria-label="Close"
            >
              <XMarkIcon className="w-7 h-7 text-white" />
            </button>

            <h2 className="text-2xl md:text-3xl font-bold mb-4 userlvl text-center drop-shadow-md">
              {selectedBody.geometric_body_name}
            </h2>

            {/* 3D model nebo obrázek */}
            {selectedBody.spline_url ? (
              <div className="relative rounded-xl overflow-hidden border border-purple-500/20">
                {isSplineLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black rounded-lg z-10">
                    <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}
                <div
                  className={`w-full ${
                    isMobile ? "h-[70vh]" : "h-[60vh]"
                  } rounded-lg overflow-hidden`}
                >
                  <Spline
                    scene={selectedBody.spline_url}
                    style={{
                      width: "100%",
                      height: "100%",
                      transform: isMobile ? "scale(1.5)" : "scale(1)",
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
                  className="w-full max-h-[70vh] object-contain rounded-lg mb-4 backdrop-blur-sm p-4"
                />
              </div>
            )}

            <div className="mt-6 md:mt-8">
              <div className="bg-black/50 backdrop-blur-sm p-4 rounded-lg border border-purple-500/20">
                <div className="text-gray-300 text-lg md:text-xl leading-relaxed">
                  {renderTextWithKaTeX(selectedBody.description)}
                  {selectedBody.description1 && (
                    <div className="mt-4">
                      {renderTextWithKaTeX(selectedBody.description1)}
                    </div>
                  )}
                </div>
              </div>

              {/* Vzorce */}
              {(selectedBody.volume_name ||
                selectedBody.surface_name ||
                selectedBody.area_name ||
                selectedBody.perimeter_name) && (
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
                            __html: katex.renderToString(
                              selectedBody.volume_formula,
                              {
                                throwOnError: false,
                                displayMode: true,
                              }
                            ),
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
                            __html: katex.renderToString(
                              selectedBody.surface_formula,
                              {
                                throwOnError: false,
                                displayMode: true,
                              }
                            ),
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
                            __html: katex.renderToString(
                              selectedBody.area_formula,
                              {
                                throwOnError: false,
                                displayMode: true,
                              }
                            ),
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
                            __html: katex.renderToString(
                              selectedBody.perimeter_formula,
                              {
                                throwOnError: false,
                                displayMode: true,
                              }
                            ),
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
    </div>
  );
};

export default GeometricBodiesCarousel;
