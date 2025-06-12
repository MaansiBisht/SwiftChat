import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { useTheme } from "../context/ThemeContext";

const LandingNav = () => {
  const { isAuthenticated } = useAuth();
  const [isOpen, setIsOpen] = React.useState(false);
  const { mode } = useTheme();

  // Theme-based classes
  const navBg = mode === "dark" ? "border-gray-900" : "bg-white";
  const borderColor = mode === "dark" ? "border-gray-700" : "border-[#E9EEF8]";
  const brandText = mode === "dark" ? "text-white" : "text-[#1B2559]";
  const linkText = mode === "dark" ? "text-white" : "text-[#1B2559]";
  const linkHover = mode === "dark" ? "hover:text-indigo-400" : "hover:text-[#2563eb]";

  return (
    <nav className={`${navBg} border-b ${borderColor} transition-colors`}>
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          to="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="h-7"
            alt="Swift Logo"
          />
          <span className={`self-center text-lg font-semibold whitespace-nowrap ${brandText}`}>
            SwiftChat
          </span>
        </Link>
        <button
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm rounded-lg md:hidden focus:outline-none focus:ring-2 text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div
          className="hidden w-full md:flex md:w-auto gap-3"
          id="navbar-default"
        >
          <Link
            to={isAuthenticated ? "/chathome" : "/login"}
            className={`block py-1 px-2 ${linkText} ${linkHover} transition-colors`}
          >
            {isAuthenticated ? "Dashboard" : "Login"}
          </Link>
          <Link
            to="/contact"
            className={`block py-1 px-2 ${linkText} ${linkHover} transition-colors`}
          >
            Contact
          </Link>
        </div>
        {/* Mobile Menu */}
        <div
          className={`${
            isOpen ? "block" : "hidden"
          } w-full md:hidden`}
          id="mobile-menu"
        >
          <div className="flex flex-col gap-2 pt-2">
            <Link
              to={isAuthenticated ? "/chathome" : "/login"}
              className={`block py-2 px-2 ${linkText} ${linkHover} transition-colors`}
              onClick={() => setIsOpen(false)}
            >
              {isAuthenticated ? "Dashboard" : "Login"}
            </Link>
            <Link
              to="/contact"
              className={`block py-2 px-2 ${linkText} ${linkHover} transition-colors`}
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default LandingNav;
