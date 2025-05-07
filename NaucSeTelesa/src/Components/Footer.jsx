import React from "react";

// NavItem component for the footer nav links
const NavItem = ({ to, text }) => (
  <li>
    <a href={to} className="text-gray-300 hover:text-white transition-colors">
      {text}
    </a>
  </li>
);

function Footer() {
  // Function to get current year for copyright
  const getCurrentYear = () => {
    return new Date().getFullYear();
  };

  // Example nav links (replace with your actual links)
  const navLinks = [
    { to: "/", text: "Domů" },
    { to: "/ochrana-osobnich-udaju", text: "Soukromí" },
    { to: "/pomoc", text: "Kontakt" },
    { to: "/projekt", text: "Projektu" },
  ];

  return (
    <footer className="bg-transparent p-3 sm:px-[20vw] border-t border-gray-700 mt-auto">
      <div className="flex flex-col sm:flex-row justify-between items-center pb-3">
        {/* Logo */}
        <div className="mb-4 sm:mb-0">
          <img
            src="/cube.webp"
            alt="Logo"
            className="w-16 h-16"
            loading="lazy"
          />
        </div>

        {/* Navigation Buttons */}
        <ul className="flex space-x-4 items-center">
          {navLinks.map((link) => (
            <NavItem key={link.to} to={link.to} text={link.text} />
          ))}
        </ul>
      </div>

      <hr className="my-6 border-gray-700 lg:my-8" />

      {/* Copyright */}
      <div className="text-center mt-3">
        <p className="text-white">
          &copy; {getCurrentYear()} Filip Elznic. Všechna práva vyhrazena.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
