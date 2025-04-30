import { useEffect, useState, useCallback, memo, useMemo } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useGlobalData } from "../Global";
import "../App.css";
import { supabase } from "../supabaseClient";
import {
  HomeIcon,
  Squares2X2Icon,
  CheckCircleIcon,
  InformationCircleIcon,
  ArrowRightOnRectangleIcon,
  UserIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/24/outline";

// Memoized components to prevent unnecessary re-renders
const NavLink = memo(({ to, icon, text, onClick }) => (
  <li className="flex items-center">
    <Link
      to={to}
      className="flex text-white text-2xl md:text-lg w-full px-4 items-center"
      onClick={onClick}
    >
      {icon}
      {text}
    </Link>
  </li>
));

NavLink.displayName = "NavLink";
NavLink.propTypes = {
  to: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

const ProfileDropdown = memo(({ isOpen, onClose, onSignOut }) => {
  if (!isOpen) return null;

  return (
    <div
      id="profile-dropdown"
      className="absolute right-0 mt-2 w-48 usergradient rounded-md shadow-lg py-1 z-50"
    >
      <Link
        to="/profil"
        className="block px-4 py-2 text-white hover:bg-gray-700 text-xl font-bold"
        onClick={onClose}
      >
        <UserIcon className="inline-block mr-2 w-5 h-5 text-white" />
        Můj profil
      </Link>
      <button
        onClick={() => {
          onSignOut();
          onClose();
        }}
        className="block w-full text-left px-4 py-2 text-xl text-red-500 hover:bg-gray-700 font-bold"
      >
        <ArrowRightOnRectangleIcon className="inline-block mr-2 w-5 h-5 text-white" />
        Odhlásit se
      </button>
    </div>
  );
});

ProfileDropdown.displayName = "ProfileDropdown";
ProfileDropdown.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSignOut: PropTypes.func.isRequired,
};

const MobileSidebar = memo(({ isOpen, navLinks, onClose }) => {
  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-y-0 left-0 w-64 bg-gray-900 usergradient shadow-lg transition-transform transform z-40 translate-x-0 lg:hidden">
        <div className="flex flex-col h-full py-6">
          <div className="px-4 mb-8">
            <button
              onClick={onClose}
              className="text-white focus:outline-none transition-transform duration-300"
              aria-label="Close menu"
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
              <NavLink
                key={`mobile-${index}`}
                to={link.to}
                icon={link.icon}
                text={link.text}
                onClick={onClose}
              />
            ))}
          </ul>
        </div>
      </div>
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
        onClick={onClose}
      />
    </>
  );
});

MobileSidebar.displayName = "MobileSidebar";
MobileSidebar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  navLinks: PropTypes.arrayOf(
    PropTypes.shape({
      to: PropTypes.string.isRequired,
      icon: PropTypes.node.isRequired,
      text: PropTypes.string.isRequired,
    })
  ).isRequired,
  onClose: PropTypes.func.isRequired,
};

const Avatar = memo(({ url, name }) => {
  const [imageError, setImageError] = useState(false);

  // Calculate first two initials if name exists or default to 'U'
  const initials = useMemo(() => {
    if (!name) return "U";
    return name
      .split(" ")
      .slice(0, 2)
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  }, [name]);

  if (!url || imageError) {
    // Fallback to initials avatar
    return (
      <div className="w-10 h-10 rounded-full flex items-center justify-center bg-indigo-600 text-white font-bold">
        {initials}
      </div>
    );
  }

  return (
    <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
      <img
        src={url}
        className="w-full h-full object-cover"
        alt={`${name || "User"} avatar`}
        loading="lazy"
        onError={() => setImageError(true)}
      />
    </div>
  );
});

Avatar.displayName = "Avatar";
Avatar.propTypes = {
  url: PropTypes.string,
  name: PropTypes.string,
};

function Navbar() {
  const { authUser, userData } = useGlobalData();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState("");

  // Menu toggle - memoized callback
  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  // Profile dropdown toggle - memoized callback
  const toggleProfileDropdown = useCallback(() => {
    setIsProfileDropdownOpen((prev) => !prev);
  }, []);

  // Close menu - memoized callback
  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  // Close profile dropdown - memoized callback
  const closeProfileDropdown = useCallback(() => {
    setIsProfileDropdownOpen(false);
  }, []);

  // Handle sign out - memoized callback
  const signOutUser = useCallback(async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("Error signing out:", error);
      }
      window.location.reload();
    } catch (err) {
      console.error("Sign out failed:", err);
    }
  }, []);

  // Update the avatar URL when user data changes
  useEffect(() => {
    if (userData?.img) {
      // Add a resize transformation parameter to the URL
      setAvatarUrl(
        `https://bviuhriolcuvayzbgzum.supabase.co/storage/v1/object/public/profile-pictures/${userData.img}?width=200&height=200`
      );
    }
  }, [userData]);

  // Close dropdown when clicking outside
  useEffect(() => {
    if (!isProfileDropdownOpen) return;

    const handleClickOutside = (event) => {
      const profileDropdown = document.getElementById("profile-dropdown");
      const profileToggle = document.getElementById("profile-toggle");

      if (
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

  // Navigation links configuration - memoized to prevent recreating on each render
  const navLinks = useMemo(
    () => [
      {
        to: "/success",
        icon: <HomeIcon className="w-5 h-5 mr-2 text-white" />,
        text: "Domů",
      },
      {
        to: "/telesa",
        icon: <Squares2X2Icon className="w-5 h-5 mr-2 text-white" />,
        text: "Tělesa",
      },
      {
        to: "/ukoly",
        icon: <CheckCircleIcon className="w-5 h-5 mr-2 text-white" />,
        text: "Úkoly",
      },
      {
        to: "/projekt",
        icon: <InformationCircleIcon className="w-5 h-5 mr-2 text-white" />,
        text: "O projektu",
      },
      {
        to: "/pomoc",
        icon: <QuestionMarkCircleIcon className="w-5 h-5 mr-2 text-white" />,
        text: "Pomoc",
      },
    ],
    []
  );

  // Get user display name
  const userDisplayName = useMemo(() => {
    return (
      userData?.name || (authUser?.email ? authUser.email.split("@")[0] : "")
    );
  }, [userData, authUser]);

  return (
    <div className="flex h-20 w-full">
      {/* Mobile sidebar - only render when open */}
      <MobileSidebar
        isOpen={isMenuOpen}
        navLinks={navLinks}
        onClose={closeMenu}
      />

      {/* Desktop navbar */}
      <nav className="fixed top-0 left-0 right-0 bg-transparent text-white px-4 py-2 flex justify-between items-center shadow-lg z-30 lg:relative lg:bg-transparent w-full">
        {/* Left Side: Hamburger menu for mobile, horizontal menu for desktop */}
        <div className="flex items-center">
          {/* Hamburger Icon for mobile */}
          <button
            onClick={toggleMenu}
            className="lg:hidden text-white focus:outline-none transition-transform duration-300 z-40"
            aria-label="Open menu"
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
                <NavLink
                  key={`desktop-${index}`}
                  to={link.to}
                  icon={link.icon}
                  text={link.text}
                />
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
                aria-expanded={isProfileDropdownOpen}
                aria-haspopup="true"
              >
                <div className="flex flex-row justify-center items-center">
                  <p className="text-white pr-2 text-2xl md:text-lg font-bold truncate max-w-32 md:max-w-40">
                    Dobrý den,
                    {userData?.name
                      ? ` ${userData.name}`
                      : authUser.email
                      ? ` ${authUser.email.split("@")[0]}`
                      : ""}
                  </p>
                  <Avatar url={avatarUrl} name={userDisplayName} />
                </div>
              </button>

              {/* Profile Dropdown Menu */}
              <ProfileDropdown
                isOpen={isProfileDropdownOpen}
                onClose={closeProfileDropdown}
                onSignOut={signOutUser}
              />
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
    </div>
  );
}

Navbar.displayName = "Navbar";

export default memo(Navbar);
