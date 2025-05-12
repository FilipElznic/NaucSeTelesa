import { useState, useEffect } from "react";

const BinaryCube = () => {
  const [faces, setFaces] = useState({
    front: "", // Face 1
    back: "", // Face 2
    right: "", // Face 3
    left: "", // Face 4
    top: "", // Face 5
    bottom: "", // Face 6
  });

  useEffect(() => {
    // Generate pattern of 1s and 0s for each face
    const generateBinaryPattern = () => {
      let pattern = "";

      // Generate 40 rows of characters for density
      for (let i = 0; i < 40; i++) {
        let rowLength = 40;
        let row = "";

        // Create density pattern with only 1s and 0s
        for (let j = 0; j < rowLength; j++) {
          // Higher probability of 1s in center, more 0s toward edges
          const distFromCenter = Math.abs(j - rowLength / 2);

          if (distFromCenter < rowLength / 4) {
            row += Math.random() < 0.7 ? "1" : "0";
          } else if (distFromCenter < rowLength / 2) {
            row += Math.random() < 0.5 ? "1" : "0";
          } else {
            row += Math.random() < 0.3 ? "1" : "0";
          }
        }
        pattern += row + "\n";
      }
      return pattern;
    };

    // Generate different binary patterns for each face
    setFaces({
      front: generateBinaryPattern(),
      back: generateBinaryPattern(),
      right: generateBinaryPattern(),
      left: generateBinaryPattern(),
      top: generateBinaryPattern(),
      bottom: generateBinaryPattern(),
    });
  }, []);

  return (
    <div className="flex items-center justify-center h-full">
      <div className="perspective">
        <div className="cube ">
          <div className="face front">
            <pre className="text-xs leading-none font-mono userlvl whitespace-pre">
              {faces.front}
            </pre>
          </div>
          <div className="face back">
            <pre className="text-xs leading-none userlvl font-mono whitespace-pre">
              {faces.back}
            </pre>
          </div>
          <div className="face right">
            <pre className="text-xs leading-none userlvl font-mono whitespace-pre">
              {faces.right}
            </pre>
          </div>
          <div className="face left">
            <pre className="text-xs leading-none userlvl font-mono whitespace-pre">
              {faces.left}
            </pre>
          </div>
          <div className="face top">
            <pre className="text-xs leading-none userlvl font-mono whitespace-pre">
              {faces.top}
            </pre>
          </div>
          <div className="face bottom">
            <pre className="text-xs leading-none userlvl font-mono whitespace-pre">
              {faces.bottom}
            </pre>
          </div>
        </div>
      </div>

      <style jsx>{`
        .perspective {
          perspective: 500px;
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

export default BinaryCube;
