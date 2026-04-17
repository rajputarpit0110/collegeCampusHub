import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useRole } from '../context/RoleContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const { isAdmin } = useRole();

  const handleLogout = () => {
    logout();
    window.location.hash = '#/';
  };

  const handleLogoClick = () => {
    window.location.hash = '#/dashboard';
  };

  return (
    <nav
      className={`sticky top-0 z-50 ${
        isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
      } border-b shadow-md transition duration-200`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div
            onClick={handleLogoClick}
            className="cursor-pointer flex items-center space-x-2"
          >
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">🎓</span>
            </div>
            <div>
              <h1 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                College Clubs
              </h1>
              <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                Hub
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              <p>
                Welcome, <span className="font-semibold">{user?.name}</span>
              </p>
              {isAdmin && (
                <p className="text-xs text-yellow-500 font-semibold">Admin</p>
              )}
            </div>

            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg transition ${
                isDark
                  ? 'bg-gray-700 hover:bg-gray-600 text-yellow-400'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
              }`}
              title="Toggle theme"
            >
              {isDark ? '☀️' : '🌙'}
            </button>

            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold transition"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
