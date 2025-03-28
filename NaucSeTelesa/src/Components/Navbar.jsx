import { useEffect, useState, useCallback } from "react";
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

  // Optimize menu toggle with useCallback
  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  // Optimize dropdown toggle with useCallback
  const toggleDropdown = useCallback(() => {
    setIsDropdownOpen((prev) => !prev);
  }, []);

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

  // Close menu when a link is clicked
  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      const dropdownElement = document.querySelector(".dropdown-container");
      const toggleButton = document.querySelector(".dropdown-toggle");

      if (
        isDropdownOpen &&
        dropdownElement &&
        toggleButton &&
        !dropdownElement.contains(event.target) &&
        !toggleButton.contains(event.target)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <nav className="bg-transparent text-white px-4 py-2 flex justify-between items-center shadow-lg relative z-30">
      {/* Left Side: Collapsible Menu */}
      <div className="flex items-center">
        {/* Hamburger Icon */}
        <button
          onClick={toggleMenu}
          className="lg:hidden text-white focus:outline-none transition-transform transform duration-300 z-40"
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
          className={`fixed top-16 left-5 w-60 rounded-3xl transition-all duration-200 ease-in-out z-20 ${
            isMenuOpen
              ? "opacity-100 scale-100 usergradient shadow-lg pointer-events-auto"
              : "opacity-0 scale-95 pointer-events-none"
          } lg:static lg:block lg:w-auto lg:opacity-100 lg:scale-100 lg:usergradient-none lg:pointer-events-auto`}
        >
          <ul className="lg:flex lg:space-x-6 space-y-6 lg:space-y-0 p-4 rounded-2xl font-bold">
            <li className="flex items-center ">
              <Link
                to="/success"
                className="flex text-white text-2xl w-full px-4"
                onClick={closeMenu}
              >
                <FaHome className="mr-2" />
              </Link>
            </li>

            <li className="">
              <Link
                to="/telesa"
                className="block w-full text-white text-xl px-4"
                onClick={closeMenu}
              >
                Tělesa
              </Link>
            </li>
            <li className="">
              <Link
                to="/ukoly"
                className="block w-full text-white text-xl px-4"
                onClick={closeMenu}
              >
                Úkoly
              </Link>
            </li>
            <li>
              <Link
                to="/projekt"
                className="block w-full text-white text-xl px-4"
                onClick={closeMenu}
              >
                O projektu
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Right Side: Login or Logout */}
      <div className="relative dropdown-container">
        {authUser ? (
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="dropdown-toggle text-white px-4 py-2 text-xl border-form lg:text-2xl flex justify-center items-center lg:px-10"
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
              <div className="absolute right-0 mt-2 w-52 usergradient text-white rounded-lg shadow-lg flex flex-col justify-start items-start font-bold z-50">
                <Link to="/profil" className="p-2 w-full">
                  <div className="w-40 border-b-2">
                    <p className="text-2xl ">Účet</p>
                  </div>
                  <p className="pt-2">Profil</p>
                </Link>
                <Link to="/pomoc" className="p-2 w-full">
                  Pomoc
                </Link>
                <Link to="/" className="p-2 w-full">
                  <button
                    onClick={signOutUser}
                    className="text-red-800 p-2 w-full text-left"
                  >
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
