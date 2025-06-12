import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/authContext';
import { MessageCircle, Users, Settings, LogOut, Menu, X, Sun, Moon } from 'lucide-react';

const Nav = () => {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const { mode, toggleTheme } = useTheme();
  const { logout } = useAuth();
  const location = useLocation();

  // Theme colors matching SwiftChat design
  const sidebarBg = mode === 'dark' ? 'bg-gray-900' : 'bg-white';
  const sidebarText = mode === 'dark' ? 'text-white' : 'text-gray-900';
  const iconBg = mode === 'dark' ? '#ffffff' : '#374151';
  const activeBg = mode === 'dark' ? 'bg-blue-600 text-white' : 'bg-blue-50 text-blue-600';
  const hoverBg = mode === 'dark' ? 'hover:bg-slate-700' : 'hover:bg-gray-50';
  const iconColor = mode === 'dark' ? 'text-slate-400' : 'text-gray-500';
  const borderColor = mode === 'dark' ? 'border-slate-700' : 'border-gray-200';

  const navItems = [
    {
      to: '/profile',
      label: 'Profile',
      icon: <Users className="w-5 h-5" />
    },
    {
      to: '/chathome',
      label: 'Messages',
      icon: <MessageCircle className="w-5 h-5" />
    },
    {
      to: '/',
      label: 'Settings',
      icon: <Settings className="w-5 h-5" />
    }
  ];

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close mobile nav when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobileNavOpen && windowWidth < 1024) {
        const sidebar = document.getElementById('mobile-sidebar');
        const toggleButton = document.getElementById('mobile-toggle');

        if (sidebar && !sidebar.contains(event.target) &&
          toggleButton && !toggleButton.contains(event.target)) {
          setIsMobileNavOpen(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobileNavOpen, windowWidth]);

  return (
    <>
      {/* Mobile Toggle Button */}
      {windowWidth < 1024 && (
        <button
          id="mobile-toggle"
          onClick={() => setIsMobileNavOpen((open) => !open)}
          className={`fixed top-4 left-4 h-10 w-10 rounded-lg flex items-center justify-center z-50 shadow-lg transition-all ${mode === 'dark' ? 'bg-slate-800 hover:bg-slate-700' : 'bg-white hover:bg-gray-50'
            } ${borderColor} border`}
        >
          <span className="sr-only">
            {isMobileNavOpen ? "Close menu" : "Open menu"}
          </span>
          {isMobileNavOpen ? (
            <X className="w-5 h-5" style={{ color: iconBg }} />
          ) : (
            <Menu className="w-5 h-5" style={{ color: iconBg }} />
          )}
        </button>
      )}

      {/* Overlay for mobile */}
      {isMobileNavOpen && windowWidth < 1024 && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsMobileNavOpen(false)}
        />
      )}

      {/* Sidebar */}
      {(isMobileNavOpen || windowWidth >= 1024) && (
        <aside
          id="mobile-sidebar"
          className={`fixed lg:static left-0 top-0 h-screen w-72 z-40 flex flex-col shadow-xl transition-all duration-300 ${sidebarBg} ${sidebarText} ${borderColor} border-r`}
        >
          <div className={`p-6 border-b ${borderColor}`}>
            <div className="flex items-center justify-between mb-6">
              <Link to="/" className="flex items-center gap-3">
                <img
                  src="https://flowbite.com/docs/images/logo.svg"
                  className="h-8"
                  alt="Logo"
                />
                <span className="font-bold text-2xl">SwiftChat</span>
              </Link>
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-lg transition-colors ml-2 ${mode === 'dark'
                    ? 'hover:bg-slate-700 text-slate-400 hover:text-slate-300'
                    : 'hover:bg-gray-100 text-gray-500 hover:text-gray-700'
                  }`}
                title={mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                {mode === 'dark' ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>


          {/* Navigation Items */}
          <nav className="flex-1 flex flex-col gap-1 p-4">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => windowWidth < 1024 && setIsMobileNavOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${location.pathname === item.to
                    ? activeBg
                    : `${iconColor} ${hoverBg} hover:text-blue-600`
                  }`}
              >
                {item.icon}
                <span className="text-sm">{item.label}</span>
              </Link>
            ))}
          </nav>

          {/* Logout Button */}
          <div className="p-4 mt-auto">
            <button
              onClick={() => {
                logout();
                windowWidth < 1024 && setIsMobileNavOpen(false);
              }}
              className={`flex items-center gap-3 px-4 py-3 w-full rounded-lg text-red-500 hover:text-red-600 ${hoverBg} transition-all duration-200`}
            >
              <LogOut className="w-5 h-5" />
              <span className="text-sm font-medium">Logout</span>
            </button>
          </div>
        </aside>
      )}
    </>
  );
};

export default Nav;