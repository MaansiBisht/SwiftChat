import React from "react";
import { useTheme } from "../context/ThemeContext";

const Footer = () => {
  const { mode } = useTheme();

  // Theme-based classes
  const footerBg = mode === "dark" ? "border-gray-900" : "bg-white";
  const borderColor = mode === "dark" ? "border-gray-700" : "border-[#E9EEF8]";
  const brandText = mode === "dark" ? "text-white" : "text-[#1B2559]";
  const linkText = mode === "dark" ? "text-gray-400 hover:text-white" : "text-[#4B5563] hover:text-[#2563eb]";
  const copyright =
    mode === "dark"
      ? "text-gray-400"
      : "text-gray-500";

  return (
    <footer className={`${footerBg} shadow transition-colors`}>
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <a
            href="/"
            className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
          >
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="h-8"
              alt="Swift Logo"
            />
            <span className={`self-center text-2xl font-semibold whitespace-nowrap ${brandText}`}>
              SwiftChat
            </span>
          </a>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium sm:mb-0">
            <li>
              <a href="#" className={`hover:underline me-4 md:me-6 ${linkText}`}>
                About
              </a>
            </li>
            <li>
              <a href="#" className={`hover:underline me-4 md:me-6 ${linkText}`}>
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className={`hover:underline me-4 md:me-6 ${linkText}`}>
                Licensing
              </a>
            </li>
            <li>
              <a href="#" className={`hover:underline ${linkText}`}>
                Contact
              </a>
            </li>
          </ul>
        </div>
        <hr className={`my-6 sm:mx-auto ${borderColor} lg:my-8`} />
        <span className={`block text-sm sm:text-center ${copyright}`}>
          © 2025{" "}
          <a href="/" className="hover:underline">
            SwiftChat
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;