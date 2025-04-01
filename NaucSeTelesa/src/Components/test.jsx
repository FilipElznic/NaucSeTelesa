import React, { useState, useEffect } from "react";

const Test = () => {
  const [nodes, setNodes] = useState([
    { id: 1, x: 0, y: 0, path: "/page1" },
    { id: 2, x: 0, y: 0, path: "/page2" },
    { id: 3, x: 0, y: 0, path: "/page3" },
    { id: 4, x: 0, y: 0, path: "/page4" },
    { id: 5, x: 0, y: 0, path: "/page5" },
  ]);

  // State pro sledování velikosti obrazovky
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    const updatePositions = () => {
      checkMobile();

      // Calculate positions based on window dimensions
      const width = window.innerWidth;
      const height = window.innerHeight;
      const centerX = width / 2;
      const centerY = height / 2;

      // Responzivní vzdálenosti mezi uzly
      const verticalSpacing = width < 768 ? 80 : 120;
      const horizontalSpacing = width < 768 ? 60 : 100;

      // Set positions according to the tree-like structure
      setNodes([
        {
          id: 1,
          x: centerX,
          y: centerY - verticalSpacing * 1.5,
          path: "/page1",
        }, // Top node
        {
          id: 2,
          x: centerX + horizontalSpacing,
          y: centerY - verticalSpacing * 0.75,
          path: "/page2",
        }, // Right of top
        {
          id: 3,
          x: centerX - horizontalSpacing * 0.5,
          y: centerY + verticalSpacing * 0.25,
          path: "/page3",
        }, // Middle left
        {
          id: 4,
          x: centerX + horizontalSpacing * 0.5,
          y: centerY + verticalSpacing * 0.75,
          path: "/page4",
        }, // Middle right
        {
          id: 5,
          x: centerX,
          y: centerY + verticalSpacing * 1.5,
          path: "/page5",
        }, // Bottom node
      ]);
    };

    updatePositions();
    window.addEventListener("resize", updatePositions);

    return () => {
      window.removeEventListener("resize", updatePositions);
    };
  }, []);

  // Přesměrování na základě ID uzlu
  const handleNodeClick = (path) => {
    window.location.href = path;
  };

  // Create line components for connections
  const connections = [
    { from: 0, to: 1 }, // 1 to 2
    { from: 1, to: 2 }, // 2 to 3
    { from: 2, to: 3 }, // 3 to 4
    { from: 3, to: 4 }, // 4 to 5
  ];

  const createLine = (startNode, endNode) => {
    const start = nodes[startNode];
    const end = nodes[endNode];

    if (!start || !end) return null;

    const distance = Math.sqrt(
      Math.pow(end.x - start.x, 2) + Math.pow(end.y - start.y, 2)
    );

    const angle =
      Math.atan2(end.y - start.y, end.x - start.x) * (180 / Math.PI);

    return (
      <div
        key={`line-${startNode}-${endNode}`}
        className="absolute bg-white"
        style={{
          width: `${distance}px`,
          height: isMobile ? "1px" : "2px",
          top: `${start.y}px`,
          left: `${start.x}px`,
          transform: `rotate(${angle}deg)`,
          transformOrigin: "0 0",
          zIndex: 1,
        }}
      />
    );
  };

  return (
    <div className="relative w-full h-screen bg-gray-900 flex items-center justify-center overflow-hidden">
      {/* Render the lines */}
      {connections.map((conn) => createLine(conn.from, conn.to))}

      {/* Render the circles */}
      {nodes.map((node) => (
        <div
          key={`node-${node.id}`}
          className={`absolute ${
            isMobile ? "w-10 h-10 text-lg" : "w-16 h-16 text-2xl"
          } 
            bg-blue-500 hover:bg-blue-400 rounded-full flex items-center justify-center 
            text-white font-semibold cursor-pointer transition-all duration-200 transform hover:scale-110`}
          style={{
            top: `${node.y - (isMobile ? 20 : 32)}px`,
            left: `${node.x - (isMobile ? 20 : 32)}px`,
            zIndex: 2,
          }}
          onClick={() => handleNodeClick(node.path)}
        >
          {node.id}
        </div>
      ))}
    </div>
  );
};

export default Test;
