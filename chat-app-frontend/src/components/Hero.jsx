import React from "react";
import { Link } from "react-router-dom";
import hero from "../../public/hero.png";
import { useAuth } from "../context/authContext";
import { useTheme } from "../context/ThemeContext";

const Hero = () => {
  const { isAuthenticated } = useAuth();
  const { mode } = useTheme();

  // Theme-based classes
  const heroBg = mode === "dark" ? "bg-gray-900" : "bg-[#F6F9FE]";
  const headingText = mode === "dark" ? "text-white" : "text-[#1B2559]";
  const subText = mode === "dark" ? "text-gray-300" : "text-[#4B5563]";
  const btnPrimary = mode === "dark"
    ? "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-800"
    : "bg-[#2563eb] text-white hover:bg-[#1749b1] focus:ring-[#2563eb]";
  const btnSecondary = mode === "dark"
    ? "bg-gray-700 text-white hover:bg-gray-600 focus:ring-gray-800"
    : "bg-gray-200 text-[#1B2559] hover:bg-gray-300 focus:ring-gray-400";

  // Theme-aware blend mode for the hero image
  const heroBlend =
    mode === "dark"
      ? "mix-blend-lighten" // Looks good on dark backgrounds
      : "mix-blend-normal"; // Normal blend on light backgrounds

  return (
    <section className={`${heroBg} transition-colors`}>
      <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
        <div className="mr-auto place-self-center lg:col-span-7">
          <h1 className={`max-w-2xl mb-4 text-3xl font-extrabold tracking-tight leading-none md:text-4xl xl:text-5xl ${headingText}`}>
            Swift Chat: Instant Connections, Effortless Conversations
          </h1>
          <p className={`max-w-2xl mb-6 font-light lg:mb-8 md:text-lg lg:text-xl text-sm ${subText}`}>
            Connect Seamlessly, Chat Effortlessly: Elevate Your Experience with Our Intuitive Chat Application!
          </p>
          <div className="flex gap-4 flex-wrap">
            {!isAuthenticated && (
              <Link
                to="/login"
                className={`inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center rounded-lg focus:ring-4 transition-colors ${btnPrimary}`}
              >
                Login
                <svg
                  className="w-5 h-5 ml-2 -mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </Link>
            )}
            {isAuthenticated && (
              <Link
                to="/chathome"
                className={`inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center rounded-lg focus:ring-4 transition-colors ${btnPrimary} text-sm`}
              >
                Go To Your Dashboard
                <svg
                  className="w-4 h-4 ml-2 -mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </Link>
            )}
            {!isAuthenticated && (
              <Link
                to="/register"
                className={`inline-flex items-center justify-center px-5 py-3 text-sm font-medium text-center rounded-lg focus:ring-4 transition-colors ${btnSecondary}`}
              >
                Register
              </Link>
            )}
          </div>
        </div>
        <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
          <img
            src={hero}
            alt="mockup"
            className={`${heroBlend} w-full h-auto`}
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
