import "../App.css";
import Spline from "@splinetool/react-spline";
import { IoShieldSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useGlobalData } from "../Global"; // Import the custom hook
import { useEffect, useState } from "react";

function TailwindTest() {
  // Access the global context
  const { authUser, userData } = useGlobalData();
  const [avatarUrl, setAvatarUrl] = useState(userData?.img || ""); // Initialize avatar URL

  useEffect(() => {
    if (userData) {
      setAvatarUrl(
        "https://bviuhriolcuvayzbgzum.supabase.co/storage/v1/object/public/profile-pictures/" +
          userData.img
      ); // Ensure the avatar URL is updated
    }
  }, [userData]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center mb-20 text-white ">
      <h1 className="text-2xl sm:text-4xl md:text-5xl xl:text-7xl font-bold md:mb-7 text-white p-11">
        Osobní stránka
      </h1>
      <div className="flex flex-col h-full w-5/6 justify-center items-center">
        <div className="flex flex-col lg:flex-row w-full">
          <div className="w-full lg:w-1/5 h-80 usergradient m-2 rounded-3xl justify-center items-center flex flex-col hover:scale-105 transition-transform duration-300">
            <div className="w-full h-5/6 justify-center items-center flex flex-col">
              <IoShieldSharp className="w-2/3 h-5/6 relative text-zinc-900 drop-shadow-white-glow" />

              <div className="text-7xl text-black absolute mb-7">
                {userData ? (
                  <p className="userlvl">{Math.floor(userData.xp / 100)}</p>
                ) : (
                  <p className="text-sm">Načítám data ...</p>
                )}
              </div>
            </div>

            <p className="text-2xl text-white mb-3">Úroveň</p>
          </div>

          <div className="w-full lg:w-3/5 h-80 usergradient m-2 rounded-3xl hover:scale-105 transition-transform duration-300 text-center lg:text-start  justify-center lg:justify-start">
            <div className="flex flex-col h-full justify-center text-white p-11">
              {userData ? (
                <>
                  <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-7xl p-5">
                    <p className="userlvl typing-animation">
                      {userData.name} {userData.surname}
                    </p>
                  </h1>
                  <p className="text-md lg:text-2xl userid px-2">
                    {userData.authid}
                  </p>
                  {authUser ? (
                    <p className="text-sm sm:text-md md:text-3xl useremail p-2">
                      {authUser.email}
                    </p>
                  ) : (
                    <p className="text-sm">Načítám data ...</p>
                  )}
                  <div className="flex flex-col">
                    <div className="w-full lg:w-3/5 flex justify-end">
                      <p className="text-xl ">{userData.xp % 100} %</p>
                    </div>
                    <div className="h-8 w-full lg:w-3/5 bg-black rounded-3xl relative border flex items-center">
                      <div
                        className="h-6 userlvl1 rounded-3xl flex items-center justify-center text-white ml-1 mr-1"
                        style={{
                          width: `${((userData.xp % 100) / 100) * 100}%`,
                          transition: "width 1s ease-in-out",
                        }}
                      ></div>
                    </div>
                  </div>
                </>
              ) : (
                <p className="text-sm">Načítám data ...</p>
              )}
            </div>
          </div>

          <div className="w-full lg:w-1/5 h-80 usergradient m-2 rounded-3xl hover:scale-105 transition-transform duration-300">
            <Spline scene="https://prod.spline.design/i4RPN7ynugvjhc24/scene.splinecode" />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row w-full">
          <div className="w-full lg:w-2/5 h-80 usergradient m-2 rounded-3xl relative hover:scale-105 transition-transform duration-300 cursor-pointer">
            <Link to={"/ukoly"}>
              <img
                src="/userimg.png"
                alt="telesa"
                className="w-full h-full object-cover rounded-3xl"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center usertask text-stroke text-xl md:text-5xl lg:text-6xl text-center p-2 rounded-md font-semibold">
                <h1>Pojďte vyzkoušet svoje znalosti</h1>
                <p className="md:text-xl mt-3 text-white">Začít plnit úkoly</p>
              </div>
            </Link>
          </div>

          <div className="w-full lg:w-1/5 h-80 usergradient m-2 rounded-3xl hover:scale-105 transition-transform duration-300">
            <Link to={"/profil"}>
              <div className="w-full h-full flex flex-col justify-center items-center">
                <img
                  src={avatarUrl}
                  className="object-fit rounded-full"
                  alt="Avatar"
                />
              </div>
            </Link>
          </div>

          <div className="w-full lg:w-2/5 h-80 usergradient m-2 rounded-3xl hover:scale-105 transition-transform duration-300">
            <Link to={"/telesa"}>
              <div className="h-full w-full flex flex-col justify-center items-center text-white p-11">
                <h1 className="text-xl md:text-5xl lg:text-5xl pb-2 w-full text-center font-semibold userlvl">
                  Nechte se vnést do světa geometrie
                </h1>
                <p className="md:text-xl mt-3 text-white">
                  Začít objevovat tělesa
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TailwindTest;
