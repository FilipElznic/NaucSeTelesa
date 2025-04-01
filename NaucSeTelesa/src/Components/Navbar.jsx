import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { useGlobalData } from "../Global"; // Import global context
import "../App.css";
import { supabase } from "../supabaseClient";
import { AiOutlineHome } from "react-icons/ai";
import { AiOutlineAppstore } from "react-icons/ai";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { AiOutlineUser } from "react-icons/ai";
import { FiHelpCircle } from "react-icons/fi";
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
    <div className="flex h-20 w-full ">
      {/* Full height sidebar for mobile (left side) */}
      <div
        className={`fixed inset-y-0 left-0 w-64 bg-gray-900 usergradient shadow-lg transition-transform transform z-40 ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        } lg:hidden`}
      >
        <div className="flex flex-col h-full py-6">
          <div className="px-4 mb-8">
            <button
              onClick={toggleMenu}
              className="text-white focus:outline-none transition-transform transform duration-300"
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
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
          </div>

          <ul className="space-y-6 px-4 flex-1 font-bold">
            <li className="flex items-center">
              <Link
                to="/success"
                className="flex text-white text-2xl w-full px-4 items-center "
                onClick={closeMenu}
              >
                <AiOutlineHome className="mr-2" />
                Domů
              </Link>
            </li>

            <li>
              <Link
                to="/telesa"
                className="flex text-white text-2xl w-full px-4 items-center "
                onClick={closeMenu}
              >
                <AiOutlineAppstore className="mr-2" />
                Tělesa
              </Link>
            </li>
            <li>
              <Link
                to="/ukoly"
                className="flex text-white text-2xl w-full px-4 items-center "
                onClick={closeMenu}
              >
                <AiOutlineCheckCircle className="mr-2" />
                Úkoly
              </Link>
            </li>
            <li>
              <Link
                to="/projekt"
                className="flex text-white text-2xl w-full px-4 items-center "
                onClick={closeMenu}
              >
                <AiOutlineInfoCircle className="mr-2" />O projektu
              </Link>
            </li>
            <li>
              <Link
                to="/pomoc"
                className="flex text-white text-2xl w-full px-4 items-center"
              >
                <FiHelpCircle className="mr-2" />
                Pomoc
              </Link>
            </li>
            <li>
              <Link
                to="/profil"
                className="flex text-white text-2xl w-full px-4 items-center"
              >
                <AiOutlineUser className="mr-2" />
                Profil
              </Link>
            </li>
          </ul>

          <div className="mt-auto px-4">
            {!authUser ? (
              <Link
                to="/prihlaseni"
                className="navbutton text-white w-full px-4 py-2 text-xl rounded-full border hover:bg-gray-800 transition-all duration-300 flex justify-center items-center"
                onClick={closeMenu}
              >
                Přihlášení
              </Link>
            ) : (
              <Link
                to="/"
                className="text-red-500 w-full px-4 py-2 text-xl flex justify-center items-center"
                onClick={() => {
                  signOutUser();
                  closeMenu();
                }}
              >
                Odhlásit se
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Original navbar for desktop */}
      <nav className="fixed top-0 left-0 right-0 bg-transparent text-white px-4 py-2 flex justify-between items-center shadow-lg z-30 lg:relative lg:bg-transparent w-full">
        {/* Left Side: Hamburger menu for mobile, horizontal menu for desktop */}
        <div className="flex items-center">
          {/* Hamburger Icon for mobile */}
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

          {/* Desktop horizontal menu */}
          <div className="hidden lg:block lg:w-auto">
            <ul className="lg:flex lg:space-x-0 font-bold">
              <li className="flex items-center">
                <Link
                  to="/success"
                  className="flex text-white text-2xl md:text-lg w-full px-4 items-center"
                >
                  <AiOutlineHome className="mr-2" />
                  Domů
                </Link>
              </li>
              <li>
                <Link
                  to="/telesa"
                  className="flex text-white text-2xl md:text-lg w-full px-4 items-center"
                >
                  <AiOutlineAppstore className="mr-2" />
                  Tělesa
                </Link>
              </li>
              <li>
                <Link
                  to="/ukoly"
                  className="flex text-white text-2xl md:text-lg w-full px-4 items-center"
                >
                  <AiOutlineCheckCircle className="mr-2" />
                  Úkoly
                </Link>
              </li>
              <li>
                <Link
                  to="/projekt"
                  className="flex text-white text-2xl md:text-lg w-full px-4 items-center"
                >
                  <AiOutlineInfoCircle className="mr-2" />O projektu
                </Link>
              </li>
              <li>
                <Link
                  to="/profil"
                  className="flex text-white text-2xl md:text-lg w-full px-4 items-center"
                >
                  <AiOutlineUser className="mr-2" />
                  Profil
                </Link>
              </li>
              <li>
                <Link
                  to="/pomoc"
                  className="flex text-white text-2xl md:text-lg  w-full px-4 items-center"
                >
                  <FiHelpCircle className="mr-2" />
                  Pomoc
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Right Side: Login or User Profile */}
        <div className="relative dropdown-container">
          {authUser ? (
            <div className="relative">
              <Link
                to="/profil"
                className="dropdown-toggle text-white px-4 py-2 text-xl border-form lg:text-2xl flex justify-center items-center lg:px-10"
              >
                <div className="flex flex-row justify-center items-center">
                  <p className="text-white pr-2 text-2xl md:text-lg font-bold">
                    Dobrý den,
                    {userData?.name ? ` ${userData.name} ` : authUser.email}
                  </p>
                  <img
                    src={avatarUrl || "/default-avatar.jpg"} // Use the public URL from context
                    className="w-10 h-10 object-fit-contain rounded-full"
                    alt="Avatar"
                  />
                </div>
              </Link>
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

      {/* Main content area */}
      <div className="flex-1 ml-0 lg:ml-0">
        {/* This is where your page content would go */}
      </div>

      {/* Overlay for mobile menu */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={closeMenu}
        />
      )}
    </div>
  );
}

export default Navbar;
