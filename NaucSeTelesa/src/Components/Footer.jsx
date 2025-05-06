import { memo } from "react";
import { Link } from "react-router-dom";

const NavItem = memo(({ to, text }) => (
  <li>
    <Link to={to} className="text-white px-2 hover:underline transition-colors">
      {text}
    </Link>
  </li>
));

NavItem.displayName = "NavItem";

const Footer = () => {
  const getCurrentYear = () => new Date().getFullYear();

  const navLinks = [
    { to: "/", text: "Domů" },
    { to: "/telesa", text: "Tělesa" },
    { to: "/ukoly", text: "Úkoly" },
    { to: "/projekt", text: "O projektu" },
  ];

  return (
    <footer className="bg-transparent p-3 sm:px-[20vw] border-t border-gray-700">
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
};

export default memo(Footer);
