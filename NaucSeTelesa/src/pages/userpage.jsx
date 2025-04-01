import "../App.css";
import Footer from "../Components/Footer";
import Overused from "../Components/Overused";
import Work from "../Components/Work";
import Robot from "../Components/Robot";
import Project from "../Components/Project";
import FadeInWrapper from "../Components/FadeInWrapper";
import Help from "../Components/Help";
import Test from "../Components/test";

function UserPage() {
  return (
    <>
      <Robot />

      <div className="border-t border-gray-700 min-h-screen bg-gradient-to-br from-black via-zinc-950  to-black text-white ">
        <FadeInWrapper>
          <Overused />
        </FadeInWrapper>

        <FadeInWrapper>
          <Project />
        </FadeInWrapper>

        <div className="md:mt-20 md:pb-20">
          <FadeInWrapper>
            <Work />
          </FadeInWrapper>
        </div>

        <Help />

        <Test />
      </div>

      <Footer />
    </>
  );
}

export default UserPage;
