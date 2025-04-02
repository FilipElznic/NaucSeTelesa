import React, { useState, useEffect } from "react";

const Test = () => {
  const [nodes, setNodes] = useState([
    { id: 1, x: 0, y: 0, path: "/page1" },
    { id: 2, x: 0, y: 0, path: "/page2" },
    { id: 3, x: 0, y: 0, path: "/page3" },
    { id: 4, x: 0, y: 0, path: "/page4" },
    { id: 5, x: 0, y: 0, path: "/page5" },
    { id: 6, x: 0, y: 0, path: "/page6" },
    { id: 7, x: 0, y: 0, path: "/page7" },
    { id: 8, x: 0, y: 0, path: "/page8" },
    { id: 9, x: 0, y: 0, path: "/page9" },
  ]);

  // State for tracking screen size
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 920);
    };

    const updatePositions = () => {
      checkMobile();

      // Calculate available space for the nodes
      const width = window.innerWidth;
      const height = window.innerHeight;

      // Move nodes more to the left side on mobile to prevent overlap with text
      const startX = isMobile ? width * 0.35 : width * 0.35;

      // Better vertical positioning with more space at the top
      const startY = isMobile ? height * 0.2 : height / 2;

      // INCREASED SPACING: Significantly increased spacing between nodes
      const verticalSpacing = isMobile ? 90 : 100;
      const horizontalSpacing = isMobile ? 80 : 90;

      // Set positions in a tree-like structure with more space between nodes
      setNodes([
        // Level 1
        {
          id: 1,
          x: startX,
          y: startY - verticalSpacing * 1.5,
          path: "/page1",
          active: true,
        },
        // Level 2
        {
          id: 2,
          x: startX + horizontalSpacing,
          y: startY - verticalSpacing * 0.75,
          path: "/page2",
        },
        // Level 3
        {
          id: 3,
          x: startX - horizontalSpacing,
          y: startY,
          path: "/page3",
        },
        // Level 4
        {
          id: 4,
          x: startX + horizontalSpacing,
          y: startY + verticalSpacing * 0.75,
          path: "/page4",
        },
        // Level 5
        {
          id: 5,
          x: startX - horizontalSpacing * 0.5,
          y: startY + verticalSpacing * 1.5,
          path: "/page5",
        },
        // Level 6
        {
          id: 6,
          x: startX + horizontalSpacing,
          y: startY + verticalSpacing * 2.25,
          path: "/page6",
        },
        // Level 7
        {
          id: 7,
          x: startX - horizontalSpacing * 0.7,
          y: startY + verticalSpacing * 3,
          path: "/page7",
        },
        // Level 8
        {
          id: 8,
          x: startX + horizontalSpacing * 0.8,
          y: startY + verticalSpacing * 3.75,
          path: "/page8",
        },
        // Level 9
        {
          id: 9,
          x: startX,
          y: startY + verticalSpacing * 4.5,
          path: "/page9",
        },
      ]);
    };

    updatePositions();
    window.addEventListener("resize", updatePositions);

    return () => {
      window.removeEventListener("resize", updatePositions);
    };
  }, [isMobile]);

  // Redirect based on node ID
  const handleNodeClick = (path) => {
    window.location.href = path;
  };

  // Create connections between nodes
  const connections = [
    { from: 0, to: 1 }, // 1 to 2
    { from: 1, to: 2 }, // 2 to 3
    { from: 2, to: 3 }, // 3 to 4
    { from: 3, to: 4 }, // 4 to 5
    { from: 4, to: 5 }, // 5 to 6
    { from: 5, to: 6 }, // 6 to 7
    { from: 6, to: 7 }, // 7 to 8
    { from: 7, to: 8 }, // 8 to 9
  ];

  // Calculate circle sizes based on device
  const circleSizeMobile = 14; // Increased size
  const circleSizeDesktop = 18; // Increased size
  const circleSize = isMobile ? circleSizeMobile : circleSizeDesktop;

  const createLine = (startNode, endNode) => {
    const start = nodes[startNode];
    const end = nodes[endNode];

    if (!start || !end) return null;

    const distance = Math.sqrt(
      Math.pow(end.x - start.x, 2) + Math.pow(end.y - start.y, 2)
    );

    const angle =
      Math.atan2(end.y - start.y, end.x - start.x) * (180 / Math.PI);

    // WIDER LINES: Base line width on circle size
    const lineThickness = isMobile ? 2.5 : 3;

    return (
      <div
        key={`line-${startNode}-${endNode}`}
        className="absolute bg-white/40"
        style={{
          width: `${distance}px`,
          height: `${lineThickness}px`, // Thicker lines that scale with circle size
          top: `${start.y}px`,
          left: `${start.x}px`,
          transform: `rotate(${angle}deg)`,
          transformOrigin: "0 0",
          zIndex: 1,
        }}
      />
    );
  };

  // Convert pixel size to Tailwind classes
  const getCircleClasses = () => {
    const sizeClass = isMobile ? "w-14 h-14" : "w-18 h-18";
    const textSizeClass = isMobile ? "text-xl" : "text-2xl";

    return `${sizeClass} ${textSizeClass}`;
  };

  return (
    <div className="relative w-full h-[120vh]  overflow-hidden">
      {/* Mobile layout with better spacing */}
      {isMobile ? (
        <div className="flex flex-col h-full">
          {/* Title on top */}
          <div className="px-5 pt-6 pb-2">
            <h1 className="text-3xl text-purple-300 font-bold">
              Úrovně procvičování
            </h1>
          </div>

          <div className="flex flex-col h-full">
            {/* IMPROVED: Increased height for nodes section to allow for bigger spacing */}
            <div className="relative h-96 w-full">
              {" "}
              {/* Increased height for more vertical space */}
              {/* Render the connecting lines */}
              {connections.map((conn) => createLine(conn.from, conn.to))}
              {/* Nodes with bigger sizes and better spacing */}
              {nodes.map((node, index) => (
                <div
                  key={`node-${node.id}`}
                  className={`absolute pointer-events-auto 
                    w-14 h-14 text-xl
                    ${
                      index === 0 || index <= 4
                        ? "bg-gradient-to-br from-purple-500 to-blue-500"
                        : "bg-white"
                    } 
                    rounded-full flex items-center justify-center 
                    text-white font-semibold cursor-pointer 
                    transition-all duration-300 transform hover:scale-110 
                    shadow-lg`}
                  style={{
                    top: `${node.y - circleSize}px`,
                    left: `${node.x - circleSize}px`,
                    zIndex: 2,
                    opacity: index < 5 ? 1 : 0.7,
                  }}
                  onClick={() => handleNodeClick(node.path)}
                >
                  {node.id}
                </div>
              ))}
            </div>

            {/* Text content - scrollable and starts below the node section */}
            <div className="flex-1 px-5 pb-6 overflow-y-auto">
              <p className="text-white/90 text-base mb-4">
                Úrovně na našem webu fungují jednoduše – čím aktivnější jsi, tím
                vyšší úroveň získáš! Za různé akce, jako je přispívání,
                komentování nebo sdílení, získáváš body, které tě posouvají dál.
              </p>

              <p className="text-white/80 text-base mb-6">
                Každá úroveň přináší nové výhody a exkluzivní obsah. Stačí být
                aktivní a postupně odemykat lepší možnosti!
              </p>

              <div className="space-y-3">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                  <p className="text-white/90 text-sm">
                    Získej přístup k exkluzivnímu obsahu
                  </p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                  <p className="text-white/90 text-sm">
                    Odemkni speciální funkce pro pokročilé uživatele
                  </p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                  <p className="text-white/90 text-sm">
                    Připoj se ke komunitě aktivních uživatelů
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        // Desktop layout with increased spacing and larger circles
        <div className="flex h-full bg-transparent scale-100 relative">
          {/* Left side content for text */}
          <div className="w-1/2 p-10 flex items-start justify-center">
            <div className="max-w-lg">
              <h1 className=" md:text-7xl lg:text-8xl text-purple-300 font-bold mb-6 absolute scale-110 left-24">
                Úrovně procvičování
              </h1>
              <div className="mt-40 w-full">
                <p className="text-white/90 text-xl lg:text-2xl mb-2 lg:mb-6 ">
                  Úrovně na našem webu fungují jednoduše – čím aktivnější jsi,
                  tím vyšší úroveň získáš! Za různé akce, jako je přispívání,
                  komentování nebo sdílení, získáváš body, které tě posouvají
                  dál.
                </p>
              </div>

              <div className="absolute top-2/3 left-1/4 transform -translate-x-1/2 -translate-y-1/2 gap-4 flex flex-col h-[50vh] w-[40vw]">
                <div className="w-full h-full flex flex-row gap-4">
                  <div className="w-2/3 h-full bg-zinc-800 rounded-3xl flex justify-center items-center">
                    test
                  </div>
                  <div className="w-1/3 h-full bg-zinc-800 rounded-3xl"></div>
                </div>
                <div className="w-full h-full flex flex-row gap-4">
                  <div className="w-1/4 h-full bg-zinc-800 rounded-3xl"></div>
                  <div className="w-3/4 h-full bg-zinc-800 rounded-3xl"></div>
                </div>
                <div className="w-full h-full flex flex-row gap-4">
                  <div className="w-1/2 h-full bg-zinc-800 rounded-3xl"></div>
                  <div className="w-1/2 h-full bg-zinc-800 rounded-3xl"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Right side for the connected nodes */}
          <div className="relative w-full scale-125 h-full flex items-center justify-center">
            {/* Render the connecting lines */}
            {connections.map((conn) => createLine(conn.from, conn.to))}

            {/* Larger circles for desktop with proper spacing */}
            {nodes.map((node, index) => (
              <div
                key={`node-${node.id}`}
                className={`absolute pointer-events-auto 
                  w-20 h-20 text-2xl scale-125
                  ${
                    index === 0 || index <= 4
                      ? "bg-gradient-to-br from-purple-500 to-blue-500"
                      : "bg-white !opacity-100"
                  } 
                  rounded-full flex items-center justify-center 
                  text-white font-semibold cursor-pointer 
                  transition-all duration-300 transform hover:scale-110 
                  shadow-lg`}
                style={{
                  top: `${node.y - circleSize * 2}px`,
                  left: `${node.x - circleSize * 2}px`,
                  zIndex: 2,
                  opacity: index < 5 ? 1 : 0.7,
                }}
                onClick={() => handleNodeClick(node.path)}
              >
                {node.id}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Test;
