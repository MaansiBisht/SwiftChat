import { useTheme } from './ThemeContext';

export const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center justify-center p-2 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
    >
      {isDarkMode ? (
        // Sun icon for light mode
        <span>☀️ Light Mode</span>
      ) : (
        // Moon icon for dark mode
        <span>🌙 Dark Mode</span>
      )}
    </button>
  );
};
