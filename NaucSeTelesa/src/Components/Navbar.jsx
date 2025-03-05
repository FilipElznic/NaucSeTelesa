import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useGlobalData } from "../Global"; // Import global context
import "../App.css";
import { supabase } from "../supabaseClient";
import { FaHome } from "react-icons/fa";

function Navbar() {
  const { authUser, userData } = useGlobalData(); // Use context to get authUser and userData
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(userData?.img || ""); // Initialize avatar URL

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Handle sign out
  const signOutUser = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error signing out:", error);
    } else {
      console.log("User signed out");
    }
    window.location.reload();
  };

  // Update the avatar URL when user data changes
  useEffect(() => {
    if (userData) {
      setAvatarUrl(
        "https://bviuhriolcuvayzbgzum.supabase.co/storage/v1/object/public/profile-pictures/" +
          userData.img
      ); // Ensure the avatar URL is updated
    }
  }, [userData]);

  return (
    <nav className="bg-transparent text-white px-4 py-2 flex justify-between items-center shadow-lg relative ">
      {/* Left Side: Collapsible Menu */}
      <div className="flex items-center">
        {/* Hamburger Icon */}
        <button
          onClick={toggleMenu}
          className="lg:hidden text-white focus:outline-none transition-transform transform duration-300"
        >
          <svg
            className="w-7 h-7"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            ></path>
          </svg>
        </button>

        <div
          className={`absolute top-16 left-5 w-60  rounded-3xl transition-all duration-200 ease-in-out z-20 ${
            isMenuOpen ? "opacity-100 scale-100" : "opacity-0 scale-95"
          } lg:static lg:block lg:w-auto lg:opacity-100 lg:scale-100`}
        >
          <ul className="lg:flex lg:space-x-6 space-y-6 lg:space-y-0 p-2  lg:p-0 bg-black rounded-2xl">
            <li className="flex items-center ">
              <Link
                to="/success"
                className="flex md:items-center md:justify-center text-white text-xl rounded-3xl lg:text-2xl mx-4 "
              >
                <FaHome />
              </Link>
            </li>

            <li className="mb-10">
              <Link
                to="/telesa"
                className="navbutton w-full text-white text-xl px-4 py-2 rounded-full lg:text-2xl lg:px-10 "
              >
                Tělesa
              </Link>
            </li>
            <li className="mb-2">
              <Link
                to="/ukoly"
                className="navbutton w-full text-white text-xl px-4 py-2 rounded-full lg:text-2xl lg:px-10"
              >
                Úkoly
              </Link>
            </li>
            <li>
              <Link
                to="/projekt"
                className="navbutton w-full text-white text-xl px-4 py-2 rounded-full lg:text-2xl lg:px-10"
              >
                O projektu
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Right Side: Login or Logout */}
      <div className="relative">
        {authUser ? (
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="text-white px-4 py-2 text-xl border-form lg:text-2xl flex justify-center items-center lg:px-10"
            >
              <div className="flex flex-row">
                <p className="text-white pr-5">
                  Dobrý den,
                  {userData?.name ? ` ${userData.name} ` : authUser.email}
                </p>
                <img
                  src={avatarUrl || "/default-avatar.jpg"} // Use the public URL from context
                  className="w-10 h-10 object-fit-contain rounded-full"
                  alt="Avatar"
                />
              </div>
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-52 usergradient text-white rounded-lg shadow-lg flex flex-col justify-start items-start font-bold z-20">
                <Link to="/profil" className="p-2">
                  <div className="w-40 border-b-2">
                    <p className="text-2xl ">Účet</p>
                  </div>
                  <p className="pt-2">Profil</p>
                </Link>
                <Link to="/pomoc" className="p-2">
                  Pomoc
                </Link>
                <Link to="/" className="p-2">
                  <button onClick={signOutUser} className="text-red-800 p-2">
                    Odhlásit se
                  </button>
                </Link>
              </div>
            )}
          </div>
        ) : (
          <Link
            to="/prihlaseni"
            className="navbutton text-white w-30 md:w-40 lg:w-50 px-4 py-2 text-xl rounded-full border hover:bg-gray-800 transition-all duration-300 lg:text-2xl flex justify-center items-center lg:px-10"
          >
            Přihlášení
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
