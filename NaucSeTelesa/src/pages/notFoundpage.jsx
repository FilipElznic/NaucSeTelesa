import React, { useState } from "react";
import { Cookie, Rocket } from "lucide-react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const NotFoundPage = () => {
  const [showEcho, setShowEcho] = useState(false);

  const handleGoHome = () => {
    window.location.href = "/";
  };

  const handleEcho = () => {
    setShowEcho(true);
    setTimeout(() => setShowEcho(false), 2000);
  };

  return (
    <>
      <div className="relative min-h-screen flex flex-col items-center justify-center bg-black text-white p-4 overflow-hidden">
        <div className="relative z-10 w-5/6 bg-zinc-900/80 backdrop-blur-sm rounded-xl shadow-2xl border border-zinc-700 p-8 text-center ">
          <div className="mb-8 space-y-4">
            <div className="text-4xl">🫣</div>
            <h1
              className="text-3xl font-bold text-white 
          bg-gradient-to-r from-zinc-500 to-zinc-300 
          bg-clip-text text-transparent 
          drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]"
            >
              Oops, you shouldn&apos;t have gotten here!
            </h1>
            <p
              className="text-lg text-zinc-300 
          bg-zinc-800/50 
          rounded-lg 
          p-3 
          border border-zinc-700 
          shadow-inner"
            >
              This is a secret page... or rather no page at all. Anyway, now we
              know about you. 👀
            </p>
          </div>
          <div className="w-full h-full flex justify-evenly items-center flex-col md:flex-row">
            <div className="w-full h-full flex justify-center items-center">
              <DotLottieReact
                src="https://lottie.host/a0e5d976-7dd0-46ef-852b-cdb06dc6ba35/WKTXDa0xoq.lottie"
                loop
                autoplay
                className="h-[40vh] w-full "
              />
            </div>

            <div className="text-lg text-zinc-300 h-full w-full">
              <h2 className="font-bold flex items-center  space-x-2 mb-4">
                <Rocket size={24} className="flex-shrink-0" />
                <span>What next?</span>
              </h2>
              <div className="space-y-4">
                <div className="flex items-center  space-x-2">
                  <span>➡</span>
                  <button
                    onClick={handleGoHome}
                    className="px-4 py-2 bg-zinc-800 text-white rounded-full hover:bg-zinc-700 transition duration-300"
                  >
                    Run back to the main page before someone catches you here!
                  </button>
                </div>
                <div className="flex items-center space-x-2">
                  <span>➡</span>
                  <span>Pretend nothing happened and go get a cookie.</span>
                  <Cookie className="w-6 h-6 text-yellow-600" />
                </div>
                <div className="flex items-center space-x-2">
                  <span>➡</span>
                  <button
                    onClick={handleEcho}
                    className="px-4 py-2 bg-zinc-800 text-white rounded-full hover:bg-zinc-700 transition duration-300"
                  >
                    Or stay here for a moment and enjoy the emptiness... maybe
                    an echo will sound? 📢
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 space-y-6">
            {showEcho && (
              <div className="text-zinc-500 animate-pulse">
                *echo* ...echo... ....echo....
              </div>
            )}

            <div className="text-sm text-zinc-600 italic">
              And if you&apos;re a hacker, please let me live! Thanks 😅
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFoundPage;
