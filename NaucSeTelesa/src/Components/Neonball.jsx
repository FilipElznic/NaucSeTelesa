import { motion } from "framer-motion";

const Neonball = () => {
  return (
    <div className="w-full md:w-full md:h-full h-24 bg-zinc-900 rounded-3xl flex items-center justify-center relative overflow-hidden">
      <motion.div
        className="absolute w-14 h-14 md:w-16 md:h-16 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 shadow-lg"
        animate={{
          borderRadius: ["20%", "50%", "20%"],
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
};

export default Neonball;
