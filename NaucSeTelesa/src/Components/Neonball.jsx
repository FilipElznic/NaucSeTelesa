import { useEffect, useState } from "react";

const NeonBall = () => {
  const [scale, setScale] = useState(1);
  const [color, setColor] = useState("#00ffff");

  useEffect(() => {
    // Animation for pulsing effect
    const pulseInterval = setInterval(() => {
      setScale((prev) => (prev === 1 ? 1.2 : 1));
    }, 1000);

    // Animation for color change
    const colors = ["#00ffff", "#ff00ff", "#ffff00", "#00ff00", "#ff0080"];
    let colorIndex = 0;

    const colorInterval = setInterval(() => {
      colorIndex = (colorIndex + 1) % colors.length;
      setColor(colors[colorIndex]);
    }, 2000);

    return () => {
      clearInterval(pulseInterval);
      clearInterval(colorInterval);
    };
  }, []);

  return (
    <div className="w-full md:w-full md:h-full h-24 bg-zinc-900 rounded-3xl flex items-center justify-center relative overflow-hidden">
      <div
        className="w-12 h-12 rounded-full absolute transition-all duration-700"
        style={{
          left: "50%",
          top: "50%",
          transform: `translate(-50%, -50%) scale(${scale})`,
          background: color,
          boxShadow: `0 0 15px 5px ${color}`,
        }}
      />
    </div>
  );
};

export default NeonBall;
