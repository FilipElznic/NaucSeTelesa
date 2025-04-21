import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import katex from "katex";
import "katex/dist/katex.min.css";
import Spline from "@splinetool/react-spline";

const GeometricBodiesCarousel = () => {
  const [bodies, setBodies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isSplineLoading, setIsSplineLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBody, setSelectedBody] = useState(null);

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

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

  // Get the visible slides (previous, current, next)
  const getVisibleSlides = () => {
    if (bodies.length === 0) return [];

    // If on mobile, just return the current slide
    if (isMobile) {
      return [{ body: bodies[currentSlide], index: currentSlide }];
    }

    // On desktop, return 3 slides
    const totalSlides = bodies.length;
    const prevIndex = (currentSlide - 1 + totalSlides) % totalSlides;
    const nextIndex = (currentSlide + 1) % totalSlides;

    return [
      { body: bodies[prevIndex], index: prevIndex },
      { body: bodies[currentSlide], index: currentSlide },
      { body: bodies[nextIndex], index: nextIndex },
    ];
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-black via-zinc-950 to-black">
        <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const visibleSlides = getVisibleSlides();

  return (
    <div className="relative w-full h-screen bg-gradient-to-br from-black via-zinc-950 to-black text-white overflow-hidden">
      {/* Futuristic Heading with Glow Effect */}
      <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 text-transparent bg-clip-text userlvl text-center relative pt-6">
        Geometrická tělesa
        <div className="absolute inset-0 blur-md opacity-50 bg-clip-text userlvl z-[-1] pt-6">
          Geometrická tělesa
        </div>
      </h1>

      {/* Full Width Carousel */}
      <div className="relative w-full h-4/5">
        <div className="flex justify-center items-center h-full px-2 md:px-4">
          <div className="flex w-full justify-center items-center gap-2 md:gap-4">
            {visibleSlides.map((item, idx) => (
              <div
                key={item.index}
                className={`transition-all duration-300 h-full ${
                  isMobile
                    ? "w-full" // Full width on mobile (single card)
                    : idx === 1
                    ? "w-2/4" // Center/highlighted slide - half width
                    : "w-1/4" // Side slides - quarter width each
                }`}
                onClick={() => !isMobile && idx !== 1 && goToSlide(item.index)}
              >
                <div
                  className={`usergradient rounded-lg shadow-lg h-full overflow-hidden cursor-pointer flex flex-col ${
                    isMobile || idx === 1
                      ? "border-2 border-purple-400 shadow-purple-500/50"
                      : "border border-purple-500/20"
                  }`}
                >
                  {/* Content for each slide */}
                  <div className="p-4 md:p-6 flex flex-col h-full">
                    {/* Title and Image - Always shown for all cards */}
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

                    {/* Description - Always shown for all cards */}
                    <div className="flex-grow">
                      <p className="text-gray-300 mb-4 text-sm md:text-base leading-relaxed">
                        {item.body.description}
                      </p>

                      {/* Formulas - Only shown for center card */}
                      {(idx === 1 || isMobile) &&
                        (item.body.volume_name || item.body.surface_name) && (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
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
                          </div>
                        )}
                    </div>

                    {/* View Details Button - Only shown for center card */}
                    {(idx === 1 || isMobile) && (
                      <div className="mt-auto text-center">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            openModal(item.body);
                          }}
                          className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 md:py-3 md:px-6 rounded-full transition-colors shadow-md text-sm md:text-base"
                        >
                          View Details
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Buttons */}
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

        {/* Indicator Dots */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {bodies.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                currentSlide === index
                  ? "bg-purple-500 scale-125"
                  : "bg-gray-400 hover:bg-purple-300"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Detail Modal - Keeping the same as original */}
      {isModalOpen && selectedBody && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-sm flex items-center justify-center p-2 md:p-4 z-50">
          <div className="usergradient rounded-lg p-4 md:p-6 w-full max-w-5xl max-h-[90vh] overflow-y-auto relative border border-purple-500/30">
            <button
              onClick={closeModal}
              className="absolute top-0 right-0 md:top-4 md:right-4 text-white bg-purple-800 hover:bg-purple-700 rounded-full w-8 h-8 flex items-center justify-center text-xl z-10 transition-colors"
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
                <p className="text-gray-300 text-lg md:text-xl leading-relaxed">
                  {selectedBody.description}
                  {selectedBody.description1 && (
                    <>
                      <br />
                      <br />
                      {selectedBody.description1}
                    </>
                  )}
                </p>
              </div>

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
