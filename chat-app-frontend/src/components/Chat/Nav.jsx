import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";

const Nav = () => {
  const { logout, isAuthenticated } = useAuth();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(windowWidth >= 1024);
  const navigate = useNavigate();

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) navigate("/login");
  }, [isAuthenticated, navigate]);

  // Track window resize
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Auto-show sidebar on desktop, hide on mobile
  useEffect(() => {
    if (windowWidth >= 1024) {
      setIsMobileNavOpen(true);
    } else {
      setIsMobileNavOpen(false);
    }
  }, [windowWidth]);

  // Define sidebar nav items
  const navItems = [
    { to: "/profile", icon: "profile", label: "Profile" },
    { to: "/chathome", icon: "chats", label: "Chats" },
  ];

  return (
    <>
      {/* Mobile Toggle Button */}
      {windowWidth < 1024 && (
        <button
          onClick={() => setIsMobileNavOpen((open) => !open)}
          className="flex fixed bottom-5 left-5 h-10 aspect-square rounded-full bg-gray-800 items-center justify-center z-50"
        >
          <span className="sr-only">
            {isMobileNavOpen ? "Close menu" : "Open menu"}
          </span>
          {isMobileNavOpen ? (
            // Close (X) icon
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6 text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            // Hamburger icon
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          )}
        </button>
      )}

      {/* Sidebar */}
      {(isMobileNavOpen || windowWidth >= 1024) && (
        <header className="fixed lg:static h-screen w-[150px] z-40 bg-gray-800 text-white flex flex-col">
          {/* Logo/Brand */}
          <Link
            to="/"
            className="flex gap-2 items-center justify-center border-b border-gray-700 py-4"
          >
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="h-8"
              alt="Swift Logo"
            />
            <span className="font-semibold text-xl mr-2">Swift</span>
          </Link>

          {/* Main Navigation */}
          <nav className="flex-1 flex flex-col justify-between overflow-y-auto">
            <div className="flex flex-col gap-5 px-4 pt-4">
              {/* Nav Items */}
              {navItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="flex gap-1 items-center hover:text-indigo-400 transition-colors"
                >
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>

            {/* Bottom section: Back and Logout */}
            <div className="flex flex-col gap-5 px-4 pb-14">
              {/* Back Button */}
              <button
                onClick={() => navigate(-1)}
                className="flex gap-1 items-center hover:text-indigo-400 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
                  />
                </svg>
                <span>Back</span>
              </button>
              {/* Logout Button */}
              <button
                onClick={logout}
                className="flex gap-1 items-center hover:text-indigo-400 transition-colors mb-6"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 9V5.25A2.25 2.25 0 0110.5 3h6a2.25 2.25 0 012.25 2.25v13.5A2.25 2.25 0 0116.5 21h-6a2.25 2.25 0 01-2.25-2.25V15m-3 0l3-3m0 0l3 3m-3-3H15"
                  />
                </svg>
                <span>Logout</span>
              </button>
            </div>
          </nav>
        </header>
      )}
    </>
  );
};

export default Nav;
