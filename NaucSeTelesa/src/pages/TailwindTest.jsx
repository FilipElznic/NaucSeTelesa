import "../App.css";
import { lazy, Suspense, useEffect, useState, memo } from "react";
import { Link } from "react-router-dom";
import { useGlobalData } from "../Global";

// Lazy load Spline component
const Spline = lazy(() => import("@splinetool/react-spline"));

// Optimized and memoized SVG component
const ShieldIcon = memo(({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    viewBox="0 0 24 24"
    fill="#272626"
    aria-hidden="true"
  >
    <path d="m12 22.118-.447-.223a52.689 52.689 0 0 1-5.108-3.063C3.143 16.63 2.111 6.265 2 5.09l-.08-.875L12 1.976l10.076 2.239L22 5.09c-.107 1.175-1.139 11.54-4.441 13.742a52.689 52.689 0 0 1-5.112 3.068zM4.085 5.783c.462 4.117 1.706 10.209 3.47 11.385 2.1 1.4 3.7 2.3 4.445 2.7.741-.4 2.35-1.3 4.445-2.7 1.764-1.176 3.008-7.267 3.47-11.385L12 4.024z" />
  </svg>
));

// Loading spinner component
const Spinner = memo(() => (
  <div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
));

// Main component
function TailwindTest() {
  // Get auth and user data from context
  const { authUser, userData } = useGlobalData();
  const [avatarUrl, setAvatarUrl] = useState("");
  const [isSplineLoading, setIsSplineLoading] = useState(true);

  // Set avatar URL when userData changes
  useEffect(() => {
    if (userData?.img) {
      setAvatarUrl(
        "https://bviuhriolcuvayzbgzum.supabase.co/storage/v1/object/public/profile-pictures/" +
          userData.img
      );
    }
  }, [userData?.img]); // Only depend on userData.img, not the entire userData object

  const handleSplineLoad = () => {
    setIsSplineLoading(false);
  };

  // Loading placeholder for userData
  const LoadingPlaceholder = () => <p className="text-sm">Načítám data ...</p>;

  // Calculate user level and progress
  const userLevel = userData ? Math.floor(userData.xp / 100) : 0;
  const levelProgress = userData ? userData.xp % 100 : 0;
  const progressWidth = `${levelProgress}%`;

  return (
    <div className="min-h-screen flex flex-col justify-center items-center mb-20 text-white">
      <h1 className="text-2xl sm:text-4xl md:text-5xl xl:text-7xl font-bold md:mb-7 text-white p-11">
        Osobní stránka
      </h1>
      <div className="flex flex-col h-full w-5/6 justify-center items-center">
        <div className="flex flex-col lg:flex-row w-full">
          {/* Level Shield Card */}
          <div className="w-full lg:w-1/5 h-80 usergradient m-2 rounded-3xl justify-center items-center flex flex-col border-2 border-transparent hover:border-purple-500 transition-all duration-200">
            <div className="w-full h-5/6 justify-center items-center flex flex-col">
              <ShieldIcon className="w-40 h-40 drop-shadow-white-glow text-zinc-700" />
              <div className="md:text-5xl text-7xl xl:text-7xl text-black absolute mb-7">
                {userData ? (
                  <p className="userlvl">{userLevel}</p>
                ) : (
                  <LoadingPlaceholder />
                )}
              </div>
            </div>
            <p className="text-2xl text-white mb-3">Úroveň</p>
          </div>

          {/* User Profile Card */}
          <div className="w-full lg:w-3/5 h-80 usergradient m-2 rounded-3xl border-2 border-transparent hover:border-purple-500 transition-all duration-200 text-center lg:text-start justify-center lg:justify-start">
            <div className="flex flex-col h-full justify-center text-white p-11">
              {userData ? (
                <>
                  <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-7xl xl:text-7xl p-5">
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
                    <LoadingPlaceholder />
                  )}
                  <div className="flex flex-col">
                    <div className="w-full lg:w-3/5 flex justify-end">
                      <p className="text-xl">{levelProgress} %</p>
                    </div>
                    <div className="h-8 w-full lg:w-3/5 bg-black rounded-3xl relative border flex items-center">
                      <div
                        className="h-6 userlvl1 rounded-3xl flex items-center justify-center text-white ml-1 mr-1"
                        style={{
                          width: progressWidth,
                          transition: "width 1s ease-in-out",
                        }}
                      ></div>
                    </div>
                  </div>
                </>
              ) : (
                <LoadingPlaceholder />
              )}
            </div>
          </div>

          {/* Spline 3D Model Card */}
          <div className="w-full lg:w-1/5 h-80 usergradient m-2 rounded-3xl border-2 border-transparent hover:border-purple-500 transition-all duration-200 relative">
            {isSplineLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-transparent rounded-3xl z-10">
                <Spinner />
              </div>
            )}
            <Suspense fallback={<Spinner />}>
              <Spline
                scene="https://prod.spline.design/i4RPN7ynugvjhc24/scene.splinecode"
                onLoad={handleSplineLoad}
              />
            </Suspense>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row w-full">
          {/* Tasks Card */}
          <div className="w-full lg:w-2/5 h-80 usergradient m-2 rounded-3xl relative border-2 border-transparent hover:border-purple-500 transition-all duration-200 cursor-pointer">
            <Link to={"/ukoly"}>
              <img
                src="/userimg.webp"
                alt="telesa"
                className="w-full h-full object-cover rounded-3xl"
                loading="lazy"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center usertask text-stroke text-xl md:text-5xl lg:text-6xl text-center p-2 rounded-md font-semibold">
                <h1>Pojďte vyzkoušet svoje znalosti</h1>
                <p className="md:text-xl mt-3 text-white">Začít plnit úkoly</p>
              </div>
            </Link>
          </div>

          {/* Avatar Card */}
          <div className="w-full lg:w-1/5 h-80 usergradient m-2 rounded-3xl border-2 border-transparent hover:border-purple-500 transition-all duration-200">
            <Link to={"/profil"}>
              <div className="w-full h-full flex flex-col justify-center items-center">
                {avatarUrl && (
                  <img
                    src={avatarUrl}
                    className="object-fit rounded-full max-h-80 md:max-w-48 lg:max-w-56"
                    alt="Avatar"
                    loading="lazy"
                  />
                )}
              </div>
            </Link>
          </div>

          {/* Geometry World Card */}
          <div className="w-full lg:w-2/5 h-80 usergradient m-2 rounded-3xl border-2 border-transparent hover:border-purple-500 transition-all duration-200">
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
