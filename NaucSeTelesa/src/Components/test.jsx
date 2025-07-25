import React, { useState, useEffect } from "react";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import { useGlobalData } from "../Global"; //
import { Link } from "react-router-dom";
const Test = () => {
  const { userData } = useGlobalData();

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
  // Add smaller screen breakpoint
  const [isSmallMobile, setIsSmallMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 920);
      setIsSmallMobile(window.innerWidth < 480);
    };

    const updatePositions = () => {
      checkScreenSize();

      if (isMobile) {
        calculateMobilePositions();
      } else {
        calculateDesktopPositions();
      }
    };

    updatePositions();
    window.addEventListener("resize", updatePositions);

    return () => {
      window.removeEventListener("resize", updatePositions);
    };
  }, [isMobile, isSmallMobile]);

  // Separate function for desktop node positions
  const calculateDesktopPositions = () => {
    // Calculate available space for the nodes
    const width = window.innerWidth;
    const height = window.innerHeight;

    const startX = width * 0.35;
    const startY = height / 2;
    const verticalSpacing = 110;
    const horizontalSpacing = 90;

    // Set positions in a tree-like structure with more space between nodes
    setNodes([
      // Level 1
      {
        id: 1,
        x: startX,
        y: startY - verticalSpacing * 1.5,
      },
      // Level 2
      {
        id: 2,
        x: startX + horizontalSpacing,
        y: startY - verticalSpacing * 0.75,
      },
      // Level 3
      {
        id: 3,
        x: startX - horizontalSpacing,
        y: startY,
      },
      // Level 4
      {
        id: 4,
        x: startX + horizontalSpacing,
        y: startY + verticalSpacing * 0.75,
      },
      // Level 5
      {
        id: 5,
        x: startX - horizontalSpacing * 0.5,
        y: startY + verticalSpacing * 1.5,
      },
      // Level 6
      {
        id: 6,
        x: startX + horizontalSpacing,
        y: startY + verticalSpacing * 2.25,
      },
      // Level 7
      {
        id: 7,
        x: startX - horizontalSpacing * 0.7,
        y: startY + verticalSpacing * 3,
      },
      // Level 8
      {
        id: 8,
        x: startX + horizontalSpacing * 0.8,
        y: startY + verticalSpacing * 3.75,
      },
      // Level 9
      {
        id: 9,
        x: startX,
        y: startY + verticalSpacing * 4.5,
      },
    ]);
  };

  // Separate function for mobile node positions
  const calculateMobilePositions = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    // Center the nodes more on mobile - ensure they stay in viewport
    const startX = width * 0.5;

    // Keep good vertical spacing
    const startY = isSmallMobile ? height * 0.15 : height * 0.2;

    // Increased vertical spacing for mobile layout
    const verticalSpacing = isSmallMobile ? 130 : 130; // Increased spacing
    const horizontalSpacing = isSmallMobile ? 70 : 90; // Wider horizontal spacing

    // Set mobile positions - more centered but still maintaining the tree structure
    setNodes([
      // Level 1
      {
        id: 1,
        x: startX,
        y: startY - verticalSpacing * 0.3, // Adjusted to keep in viewport
      },
      // Level 2 - positioned more centrally
      {
        id: 2,
        x: startX + horizontalSpacing * 0.5,
        y: startY + verticalSpacing * 0.5,
      },
      // Level 3 - positioned more centrally
      {
        id: 3,
        x: startX - horizontalSpacing * 0.5,
        y: startY + verticalSpacing,
      },
      // Level 4
      {
        id: 4,
        x: startX + horizontalSpacing * 0.6,
        y: startY + verticalSpacing * 1.5,
      },
      // Level 5
      {
        id: 5,
        x: startX - horizontalSpacing * 0.4,
        y: startY + verticalSpacing * 2,
      },
      // Level 6
      {
        id: 6,
        x: startX + horizontalSpacing * 0.5,
        y: startY + verticalSpacing * 2.5,
      },
      // Level 7
      {
        id: 7,
        x: startX - horizontalSpacing * 0.5,
        y: startY + verticalSpacing * 3,
      },
      // Level 8
      {
        id: 8,
        x: startX + horizontalSpacing * 0.4,
        y: startY + verticalSpacing * 3.5,
      },
      // Level 9 - centered at the bottom
      {
        id: 9,
        x: startX,
        y: startY + verticalSpacing * 4,
      },
    ]);
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

  // Calculate circle sizes based on device - increased sizes
  const circleSizeMobile = isSmallMobile ? 15 : 20; // Increased from 10/14
  const circleSizeDesktop = 18;
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

    // Responsive line thickness
    const lineThickness = isMobile ? (isSmallMobile ? 2 : 3) : 3;

    return (
      <div
        key={`line-${startNode}-${endNode}`}
        className="absolute bg-white/40"
        style={{
          width: `${distance}px`,
          height: `${lineThickness}px`,
          top: `${start.y}px`,
          left: `${start.x}px`,
          transform: `rotate(${angle}deg)`,
          transformOrigin: "0 0",
          zIndex: 1,
        }}
      />
    );
  };

  // Get responsive position for mobile nodes
  const getResponsivePosition = (node) => {
    return {
      top: `${node.y - (isSmallMobile ? 20 : 25)}px`, // Adjusted for larger circles
      left: `${node.x - (isSmallMobile ? 20 : 25)}px`,
    };
  };

  return (
    <div className="relative w-full overflow-hidden">
      {/* Mobile layout with improved responsiveness */}
      {isMobile ? (
        <div className="flex flex-col ">
          <div className=" h-full mt-10 w-full flex justify-center items-center flex-col gap-16">
            <h1 className="text-3xl md:text-6xl mb-6 userlvl font-bold">
              Practice levels
            </h1>
            <div className="gap-4 flex flex-col h-[30vh] w-5/6 text-white">
              <div className="w-full h-full flex flex-row gap-4 ">
                <a
                  href="#leaderboard"
                  className="w-full h-full  bg-zinc-800 rounded-3xl"
                >
                  <div className="w-full h-full flex justify-center items-center p-4 relative">
                    <ArrowTopRightOnSquareIcon className="w-5 h-5 text-white  absolute top-3 right-3" />
                    <h1 className="text-2xl font-semibold p-4 userlvl">
                      User leaderboard
                    </h1>
                  </div>
                </a>
              </div>
              <div className="w-full h-full flex flex-col gap-4 ">
                <Link
                  to="/solids"
                  className="w-full h-full  bg-zinc-800 rounded-3xl"
                >
                  <div className=" h-full w-full  flex justify-center items-center p-4 relative">
                    <ArrowTopRightOnSquareIcon className="w-5 h-5 text-white absolute top-3 right-3" />
                    <h1 className="text-2xl font-semibold p-4 userlvl">
                      Solids
                    </h1>
                  </div>
                </Link>
                <Link
                  to="/tasks"
                  className="w-full h-full z-50  bg-zinc-800 rounded-3xl"
                >
                  <div className="w-full h-full flex justify-center items-center p-4 relative">
                    <ArrowTopRightOnSquareIcon className="w-5 h-5 text-white  absolute top-3 right-3" />
                    <h1 className="text-2xl font-semibold p-4 userlvl">
                      Tasks
                    </h1>
                  </div>
                </Link>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="flex flex-col h-full  text-white overflow-x-hidden">
              {/* Title section - full width */}

              <div className="flex flex-col h-full bg-transparent text-white overflow-x-hidden">
                {/* Nodes section - centered and adaptively sized */}
                <div className="relative h-[90vh] w-full px-2 overflow-x-hidden overflow-y-auto">
                  {/* Connecting lines */}
                  {connections.map((conn) => createLine(conn.from, conn.to))}

                  {/* Nodes with improved responsive positioning and larger sizes */}
                  {nodes.map((node, index) => (
                    <div
                      key={`node-${node.id}`}
                      className={`absolute pointer-events-auto 
                       ${
                         isSmallMobile
                           ? "w-16 h-16 text-base" // Increased from w-8 h-8
                           : "w-14 h-14 text-base sm:w-16 sm:h-16 sm:text-xl" // Increased from w-10 h-10
                       }
                       ${
                         index === 0 ||
                         index <=
                           (userData ? Math.floor(userData.xp / 100 - 1) : -1)
                           ? "bg-gradient-to-br from-purple-500 to-blue-500 !opacity-100"
                           : "bg-zinc-800 !opacity-100"
                       } 
                       rounded-full flex items-center justify-center 
                       text-white font-semibold border-2 border-transparent hover:border-purple-500 transition-all duration-200

                      shadow-[0_0_25px_10px_rgba(255,255,255,0.25)]`}
                      style={{
                        ...getResponsivePosition(node),
                        zIndex: 2,
                        opacity: index < 5 ? 1 : 0.7,
                      }}
                    >
                      {node.id}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        // Desktop layout - unchanged
        <div className="flex bg-transparent scale-100 relative h-[130vh] overflow-hidden">
          {/* Left side content for text */}
          <div className="w-1/2 p-10 flex items-start justify-center">
            <div className="max-w-lg">
              <h1 className=" md:text-7xl userlvl font-bold mb-6 absolute scale-110 left-24">
                Practice levels
              </h1>
              <div className="mt-40 w-full">
                <p className="text-white/90 text-xl lg:text-2xl mb-2 lg:mb-6 ">
                  Levels on our website work simply: the more you practice, the
                  higher level you achieve! You gain levels by practicing tasks.
                </p>
              </div>

              <div className="absolute z-20 top-2/3 left-1/4 transform -translate-x-1/2 -translate-y-1/2 gap-4 flex flex-col h-[60vh] w-[40vw] text-white">
                <div className="gap-4 flex flex-col h-[30vh] w-5/6 text-white ">
                  <div className="w-full h-full flex flex-row gap-4 ">
                    <a
                      href="#leaderboard"
                      className="w-full h-full  bg-zinc-800 rounded-3xl"
                    >
                      <div className="w-full h-full flex justify-center items-center p-4 relative">
                        <ArrowTopRightOnSquareIcon className="w-7 h-7 text-white  absolute top-3 right-3" />
                        <h1 className="text-5xl font-semibold p-4 userlvl">
                          User leaderboard
                        </h1>
                      </div>
                    </a>
                  </div>
                  <div className="w-full h-full flex flex-row gap-4 ">
                    <Link
                      to="/solids"
                      className="w-full h-full  bg-zinc-800 rounded-3xl"
                    >
                      <div className=" h-full w-full  flex justify-center items-center p-4 relative">
                        <ArrowTopRightOnSquareIcon className="w-7 h-7 text-white absolute top-3 right-3" />
                        <h1 className="text-5xl font-semibold p-4 userlvl">
                          Solids
                        </h1>
                      </div>
                    </Link>
                    <Link
                      to="/tasks"
                      className="w-full h-full z-50  bg-zinc-800 rounded-3xl"
                    >
                      <div className="w-full h-full flex justify-center items-center p-4 relative">
                        <ArrowTopRightOnSquareIcon className="w-7 h-7 text-white  absolute top-3 right-3" />
                        <h1 className="text-5xl font-semibold p-4 userlvl">
                          Tasks
                        </h1>
                      </div>
                    </Link>
                  </div>
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
                    index === 0 ||
                    index <= (userData ? Math.floor(userData.xp / 100 - 1) : -1)
                      ? "userlvl4 !opacity-100"
                      : "bg-zinc-800   !opacity-100"
                  } 
                  rounded-full flex items-center justify-center 
                  text-white font-semibold
                  border-2 border-transparent hover:border-purple-500 transition-all duration-100

                  `}
                style={{
                  top: `${node.y - circleSize * 2}px`,
                  left: `${node.x - circleSize * 2}px`,
                  zIndex: 2,
                  opacity: index < 5 ? 1 : 0.7,
                }}
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
