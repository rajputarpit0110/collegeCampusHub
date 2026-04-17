import { useTheme } from '../context/ThemeContext';

export default function ClubCard({ club, category }) {
  const { isDark } = useTheme();

  const handleViewDetails = () => {
    window.location.hash = `#/club?id=${club.id}`;
  };

  const handleRegister = () => {
    window.location.hash = `#/register?id=${club.id}`;
  };

  return (
    <div
      className={`p-6 rounded-xl shadow-lg hover:shadow-2xl transition duration-300 transform hover:-translate-y-1 ${
        isDark ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-100'
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
          {club.name}
        </h3>
        {club.recruitmentOpen ? (
          <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full">
            Open
          </span>
        ) : (
          <span className="px-3 py-1 bg-red-100 text-red-800 text-xs font-semibold rounded-full">
            Closed
          </span>
        )}
      </div>

      <p className={`text-sm mb-4 line-clamp-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
        {club.description}
      </p>

      <div className="flex items-center justify-between mb-4">
        <div className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
          <p>👥 {club.members} members</p>
          <p>📅 {club.events.length} events</p>
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={handleViewDetails}
          className="flex-1 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition"
        >
          View Details
        </button>
        <button
          onClick={handleRegister}
          disabled={!club.recruitmentOpen}
          className={`flex-1 px-4 py-2 font-semibold rounded-lg transition ${
            club.recruitmentOpen
              ? 'bg-purple-500 hover:bg-purple-600 text-white cursor-pointer'
              : isDark
              ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          Register
        </button>
      </div>
    </div>
  );
}
