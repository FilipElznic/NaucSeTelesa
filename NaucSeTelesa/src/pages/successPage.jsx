import InfoForm from "../Components/InfoForm";
import Tailwind from "./TailwindTest";
import Features from "../Components/Features";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import LeaderboardW from "../Components/LeaderboardW";
import FadeInWrapper from "../Components/FadeInWrapper";

function SuccessPage() {
  return (
    <>
      <Navbar />
      <FadeInWrapper>
        <InfoForm />
      </FadeInWrapper>
      <FadeInWrapper>
        <Tailwind />
      </FadeInWrapper>
      <FadeInWrapper>
        <Features />
      </FadeInWrapper>
      <FadeInWrapper>
        <LeaderboardW />
      </FadeInWrapper>

      <div className="bg-black min-h-screen flex flex-col items-center p-4">
        <div className="w-5/6 flex flex-col gap-4 p-6 bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl">
          {/* Top Bar */}
          <div className="w-full h-24 bg-white/10 rounded-3xl"></div>

          {/* Main Content */}
          <div className="flex flex-col md:flex-row gap-4 w-full h-[70vh]">
            <div className="flex-1 h-full bg-white/10 rounded-3xl"></div>
            <div className="w-1/5 h-full bg-white/10 rounded-3xl"></div>
            <div className="w-1/5 h-full hidden md:block"></div>
          </div>

          {/* Middle Section */}
          <div className="flex flex-col md:flex-row gap-4 w-full h-[70vh]">
            <div className="flex-1 h-full bg-white/10 rounded-3xl"></div>
            <div className="w-1/5 h-full bg-white/10 rounded-3xl"></div>
            <div className="w-1/5 h-full hidden md:block"></div>
          </div>

          {/* Bottom Section */}
          <div className="flex flex-col md:flex-row gap-4 w-full h-[70vh]">
            <div className="flex-1 h-full bg-white/10 rounded-3xl"></div>
            <div className="w-1/5 h-full bg-white/10 rounded-3xl"></div>
            <div className="w-1/5 h-full hidden md:block"></div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default SuccessPage;

/*
{authUser ? (
          <div className="bg-gray-800 p-6 rounded-lg shadow-md text-center mb-6">
            <p className="mb-2">
              <strong>User ID:</strong> {authUser.id}
            </p>
            <p>
              <strong>Email:</strong> {authUser.email}
            </p>
          </div>
        ) : (
          <p>Loading authenticated user...</p>
        )}
        <button
          onClick={signOutUser}
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-500 hover:scale-105 transform transition-all duration-200 ease-in-out focus:ring-4 focus:ring-blue-300"
        >
          Odhlásit se
        </button>
        
<


*/
