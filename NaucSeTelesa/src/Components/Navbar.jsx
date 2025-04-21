import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { useGlobalData } from "../Global";
import "../App.css";
import { supabase } from "../supabaseClient";
import {
  AiOutlineHome,
  AiOutlineAppstore,
  AiOutlineCheckCircle,
  AiOutlineInfoCircle,
  AiOutlineLogout,
  AiOutlineUser,
} from "react-icons/ai";
import { FiHelpCircle } from "react-icons/fi";

function Navbar() {
  const { authUser, userData } = useGlobalData();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState("");

  // Menu toggle
  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  // Profile dropdown toggle
  const toggleProfileDropdown = useCallback(() => {
    setIsProfileDropdownOpen((prev) => !prev);
  }, []);

  // Handle sign out
  const signOutUser = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error signing out:", error);
    }
    window.location.reload();
  };

  // Update the avatar URL when user data changes
  useEffect(() => {
    if (userData?.img) {
      setAvatarUrl(
        "https://bviuhriolcuvayzbgzum.supabase.co/storage/v1/object/public/profile-pictures/" +
          userData.img
      );
    }
  }, [userData]);

  // Close menu when a link is clicked
  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      const profileDropdown = document.getElementById("profile-dropdown");
      const profileToggle = document.getElementById("profile-toggle");

      if (
        isProfileDropdownOpen &&
        profileDropdown &&
        profileToggle &&
        !profileDropdown.contains(event.target) &&
        !profileToggle.contains(event.target)
      ) {
        setIsProfileDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isProfileDropdownOpen]);

  // Navigation links configuration
  const navLinks = [
    { to: "/success", icon: <AiOutlineHome className="mr-2" />, text: "Domů" },
    {
      to: "/telesa",
      icon: <AiOutlineAppstore className="mr-2" />,
      text: "Tělesa",
    },
    {
      to: "/ukoly",
      icon: <AiOutlineCheckCircle className="mr-2" />,
      text: "Úkoly",
    },
    {
      to: "/projekt",
      icon: <AiOutlineInfoCircle className="mr-2" />,
      text: "O projektu",
    },
    { to: "/pomoc", icon: <FiHelpCircle className="mr-2" />, text: "Pomoc" },
  ];

  return (
    <div className="flex h-20 w-full">
      {/* Mobile sidebar */}
      <div
        className={`fixed inset-y-0 left-0 w-64 bg-gray-900 usergradient shadow-lg transition-transform transform z-40 ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        } lg:hidden`}
      >
        <div className="flex flex-col h-full py-6">
          <div className="px-4 mb-8">
            <button
              onClick={toggleMenu}
              className="text-white focus:outline-none transition-transform duration-300"
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
            {navLinks.map((link, index) => (
              <li key={index} className="flex items-center">
                <Link
                  to={link.to}
                  className="flex text-white text-2xl w-full px-4 items-center"
                  onClick={closeMenu}
                >
                  {link.icon}
                  {link.text}
                </Link>
              </li>
            ))}
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
                className="text-red-500 w-full px-4 py-2 text-xl  flex justify-center items-center "
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

      {/* Desktop navbar */}
      <nav className="fixed top-0 left-0 right-0 bg-transparent text-white px-4 py-2 flex justify-between items-center shadow-lg z-30 lg:relative lg:bg-transparent w-full">
        {/* Left Side: Hamburger menu for mobile, horizontal menu for desktop */}
        <div className="flex items-center">
          {/* Hamburger Icon for mobile */}
          <button
            onClick={toggleMenu}
            className="lg:hidden text-white focus:outline-none transition-transform duration-300 z-40"
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
              {navLinks.map((link, index) => (
                <li key={index} className="flex items-center">
                  <Link
                    to={link.to}
                    className="flex text-white text-2xl md:text-lg w-full px-4 items-center"
                  >
                    {link.icon}
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Side: Login or User Profile with Dropdown */}
        <div className="relative">
          {authUser ? (
            <div className="relative">
              <button
                id="profile-toggle"
                className="dropdown-toggle text-white px-4 py-2 text-xl border-form lg:text-2xl flex justify-center items-center lg:px-10"
                onClick={toggleProfileDropdown}
              >
                <div className="flex flex-row justify-center items-center">
                  <p className="text-white pr-2 text-2xl md:text-lg font-bold">
                    Dobrý den,
                    {userData?.name ? ` ${userData.name} ` : authUser.email}
                  </p>
                  <img
                    src={avatarUrl || "/default-avatar.jpg"}
                    className="w-10 h-10 object-fit-contain rounded-full"
                    alt="Avatar"
                  />
                </div>
              </button>

              {/* Profile Dropdown Menu for Desktop */}
              {isProfileDropdownOpen && (
                <div
                  id="profile-dropdown"
                  className="absolute right-0 mt-2 w-48 usergradient rounded-md shadow-lg py-1 z-50"
                >
                  <Link
                    to="/profil"
                    className="block px-4 py-2  text-white hover:bg-gray-700  text-xl font-bold "
                    onClick={() => setIsProfileDropdownOpen(false)}
                  >
                    <AiOutlineUser className="inline-block mr-2 " />
                    Můj profil
                  </Link>
                  <button
                    onClick={() => {
                      signOutUser();
                      setIsProfileDropdownOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-xl   text-red-500 hover:bg-gray-700 font-bold"
                  >
                    <AiOutlineLogout className="inline-block mr-2 " />
                    Odhlásit se
                  </button>
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
