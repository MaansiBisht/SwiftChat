import React from "react";
import { useTheme } from "../context/ThemeContext";

const Payments = () => {
  const { mode } = useTheme();

  // Theme-based classes
  const sectionBg = mode === "dark" ? "border-gray-900" : "bg-[#F6F9FE]";
  const cardBg = mode === "dark" ? "bg-gray-800 border-gray-700" : "bg-white border-[#E9EEF8]";
  const cardText = mode === "dark" ? "text-white" : "text-[#1B2559]";
  const subText = mode === "dark" ? "text-gray-400" : "text-[#4B5563]";
  const priceText = mode === "dark" ? "text-white" : "text-[#2563eb]";
  const btnPrimary = mode === "dark"
    ? "bg-blue-700 hover:bg-blue-800 focus:ring-blue-900"
    : "bg-[#2563eb] hover:bg-[#1749b1] focus:ring-[#2563eb]";
  const btnText = "text-white";

  // Helper to wrap subtext in the correct color
  const wrapSubText = (text) => <span className={`font-semibold ${subText}`}>{text}</span>;

  return (
    <section className={`${sectionBg} transition-colors`}>
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
          <h2 className={`mb-4 text-3xl tracking-tight font-extrabold ${cardText}`}>
            Designed for business teams like yours
          </h2>
          <p className={`mb-5 font-light text-sm sm:text-lg ${subText}`}>
            Here at Swift we focus on markets where technology, innovation, and
            capital can unlock long-term value and drive economic growth.
          </p>
        </div>
        <div className="space-y-8 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-10 lg:space-y-0">
          {/* Starter Plan */}
          <div className={`flex flex-col p-6 mx-auto max-w-lg text-center rounded-lg border shadow ${cardBg}`}>
            <h3 className={`mb-4 text-2xl font-semibold ${cardText}`}>Starter</h3>
            <p className={`font-light sm:text-sm ${subText}`}>
              Best option for personal use & for your next project
            </p>
            <div className="flex justify-center items-baseline my-8">
              <span className={`mr-2 text-4xl font-extrabold ${priceText}`}>$29</span>
              <span className={`font-light sm:text-sm ${subText}`}>/month</span>
            </div>
            <ul role="list" className="mb-8 space-y-4 text-left">
              <li className="flex items-center space-x-3">
                <svg className="flex-shrink-0 w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                </svg>
                <span className={`font-light sm:text-sm ${subText}`}>Individual configuration</span>
              </li>
              <li className="flex items-center space-x-3">
                <svg className="flex-shrink-0 w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                </svg>
                <span className={`font-light sm:text-sm ${subText}`}>No setup, or hidden fees</span>
              </li>
              <li className="flex items-center space-x-3">
                <svg className="flex-shrink-0 w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                </svg>
                <span className={`font-light sm:text-sm ${subText}`}>
                  Team size: {wrapSubText("1 developer")}
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <svg className="flex-shrink-0 w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                </svg>
                <span className={`font-light sm:text-sm ${subText}`}>
                  Premium support: {wrapSubText("6 months")}
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <svg className="flex-shrink-0 w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                </svg>
                <span className={`font-light sm:text-sm ${subText}`}>
                  Free updates: {wrapSubText("6 months")}
                </span>
              </li>
            </ul>
            <a
              href="#"
              className={`font-medium rounded-lg text-sm px-5 py-2.5 text-center focus:outline-none focus:ring-4 ${btnPrimary} ${btnText}`}
            >
              Get started
            </a>
          </div>

          {/* Company Plan */}
          <div className={`flex flex-col p-6 mx-auto max-w-lg text-center rounded-lg border shadow ${cardBg}`}>
            <h3 className={`mb-4 text-2xl font-semibold ${cardText}`}>Company</h3>
            <p className={`font-light sm:text-sm ${subText}`}>
              Relevant for multiple users, extended & premium support
            </p>
            <div className="flex justify-center items-baseline my-8">
              <span className={`mr-2 text-4xl font-extrabold ${priceText}`}>$99</span>
              <span className={subText}>/month</span>
            </div>
            <ul role="list" className="mb-8 space-y-4 text-left">
              <li className="flex items-center space-x-3">
                <svg className="flex-shrink-0 w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                </svg>
                <span className={`font-light sm:text-sm ${subText}`}>Individual configuration</span>
              </li>
              <li className="flex items-center space-x-3">
                <svg className="flex-shrink-0 w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                </svg>
                <span className={`font-light sm:text-sm ${subText}`}>No setup, or hidden fees</span>
              </li>
              <li className="flex items-center space-x-3">
                <svg className="flex-shrink-0 w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                </svg>
                <span className={`font-light sm:text-sm ${subText}`}>
                  Team size: {wrapSubText("10 developers")}
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <svg className="flex-shrink-0 w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                </svg>
                <span className={`font-light sm:text-sm ${subText}`}>
                  Premium support: {wrapSubText("24 months")}
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <svg className="flex-shrink-0 w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                </svg>
                <span className={`font-light sm:text-sm ${subText}`}>
                  Free updates: {wrapSubText("24 months")}
                </span>
              </li>
            </ul>
            <a
              href="#"
              className={`font-medium rounded-lg text-sm px-5 py-2.5 text-center focus:outline-none focus:ring-4 ${btnPrimary} ${btnText}`}
            >
              Get started
            </a>
          </div>

          {/* Enterprise Plan */}
          <div className={`flex flex-col p-6 mx-auto max-w-lg text-center rounded-lg border shadow ${cardBg}`}>
            <h3 className={`mb-4 text-2xl font-semibold ${cardText}`}>Enterprise</h3>
            <p className={`font-light sm:text-sm ${subText}`}>
              Best for large scale uses and extended redistribution rights
            </p>
            <div className="flex justify-center items-baseline my-8">
              <span className={`mr-2 text-3xl font-extrabold ${priceText}`}>$499</span>
              <span className={subText}>/month</span>
            </div>
            <ul role="list" className="mb-8 space-y-4 text-left">
              <li className="flex items-center space-x-3">
                <svg className="flex-shrink-0 w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                </svg>
                <span className={`font-light sm:text-sm ${subText}`}>Individual configuration</span>
              </li>
              <li className="flex items-center space-x-3">
                <svg className="flex-shrink-0 w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                </svg>
                <span className={`font-light sm:text-sm ${subText}`}>No setup, or hidden fees</span>
              </li>
              <li className="flex items-center space-x-3">
                <svg className="flex-shrink-0 w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                </svg>
                <span className={`font-light sm:text-sm ${subText}`}>
                  Team size: {wrapSubText("100+ developers")}
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <svg className="flex-shrink-0 w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                </svg>
                <span className={`font-light sm:text-sm ${subText}`}>
                  Premium support: {wrapSubText("36 months")}
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <svg className="flex-shrink-0 w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                </svg>
                <span className={`font-light sm:text-sm ${subText}`}>
                  Free updates: {wrapSubText("36 months")}
                </span>
              </li>
            </ul>
            <a
              href="#"
              className={`font-medium rounded-lg text-sm px-5 py-2.5 text-center focus:outline-none focus:ring-4 ${btnPrimary} ${btnText}`}
            >
              Get started
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Payments;
