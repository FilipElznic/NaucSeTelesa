import { useState, useEffect } from "react";

const DollarCube = () => {
  const [characters, setCharacters] = useState("");

  useEffect(() => {
    // Generate pattern of $ and + characters similar to the image
    const generateCharPattern = () => {
      const chars = ["$", "+", "."];
      let pattern = "";

      // Generate 40 rows of characters for density
      for (let i = 0; i < 40; i++) {
        let rowLength = 40;
        let row = "";

        // Create density pattern similar to the image
        for (let j = 0; j < rowLength; j++) {
          // Higher probability of $ in center, more + and . toward edges
          const distFromCenter = Math.abs(j - rowLength / 2);

          if (distFromCenter < rowLength / 4) {
            row += Math.random() < 0.7 ? "$" : "+";
          } else if (distFromCenter < rowLength / 2) {
            row += Math.random() < 0.5 ? "$" : Math.random() < 0.7 ? "+" : ".";
          } else {
            row += Math.random() < 0.3 ? "$" : Math.random() < 0.5 ? "+" : ".";
          }
        }
        pattern += row + "\n";
      }
      return pattern;
    };

    setCharacters(generateCharPattern());
  }, []);

  return (
    <div className="flex items-center justify-center h-screen bg-black">
      <div className="perspective">
        <div className="cube">
          <div className="face front">
            <pre className="text-xs leading-none text-white font-mono whitespace-pre">
              {characters}
            </pre>
          </div>
          <div className="face back">
            <pre className="text-xs leading-none text-white font-mono whitespace-pre">
              {characters}
            </pre>
          </div>
          <div className="face right">
            <pre className="text-xs leading-none text-white font-mono whitespace-pre">
              {characters}
            </pre>
          </div>
          <div className="face left">
            <pre className="text-xs leading-none text-white font-mono whitespace-pre">
              {characters}
            </pre>
          </div>
          <div className="face top">
            <pre className="text-xs leading-none text-white font-mono whitespace-pre">
              {characters}
            </pre>
          </div>
          <div className="face bottom">
            <pre className="text-xs leading-none text-white font-mono whitespace-pre">
              {characters}
            </pre>
          </div>
        </div>
      </div>

      <style jsx>{`
        .perspective {
          perspective: 1000px;
          width: 200px;
          height: 200px;
          margin: 100px auto;
        }

        .cube {
          position: relative;
          width: 100%;
          height: 100%;
          transform-style: preserve-3d;
          animation: rotate 20s infinite linear;
        }

        .face {
          position: absolute;
          width: 200px;
          height: 200px;
          background: rgba(0, 0, 0, 0.9);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          font-size: 4px;
        }

        .front {
          transform: rotateY(0deg) translateZ(100px);
        }

        .back {
          transform: rotateY(180deg) translateZ(100px);
        }

        .right {
          transform: rotateY(90deg) translateZ(100px);
        }

        .left {
          transform: rotateY(-90deg) translateZ(100px);
        }

        .top {
          transform: rotateX(90deg) translateZ(100px);
        }

        .bottom {
          transform: rotateX(-90deg) translateZ(100px);
        }

        @keyframes rotate {
          0% {
            transform: rotateX(20deg) rotateY(0deg);
          }
          50% {
            transform: rotateX(-20deg) rotateY(180deg);
          }
          100% {
            transform: rotateX(20deg) rotateY(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default DollarCube;
