import { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useRole } from '../context/RoleContext';

export default function ClubDetails() {
  const { isDark } = useTheme();
  const { isAdmin } = useRole();
  const [club, setClub] = useState(null);
  const [editedStatus, setEditedStatus] = useState(null);

  useEffect(() => {
    // Get club ID from URL hash parameters
    const hash = window.location.hash;
    const params = new URLSearchParams(hash.split('?')[1]);
    const clubId = params.get('id');

    if (clubId) {
      fetch('/clubsData.json')
        .then((res) => res.json())
        .then((data) => {
          const allClubs = [
            ...data.technicalClubs,
            ...data.culturalClubs,
          ];
          const foundClub = allClubs.find((c) => c.id === parseInt(clubId));
          setClub(foundClub);
          setEditedStatus(foundClub?.recruitmentOpen);
        })
        .catch((err) => console.error('Error loading data:', err));
    }
  }, []);

  if (!club) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${
          isDark ? 'bg-gray-900' : 'bg-white'
        }`}
      >
        <p className={isDark ? 'text-white' : 'text-gray-900'}>Loading...</p>
      </div>
    );
  }

  const handleStatusUpdate = () => {
    setClub({ ...club, recruitmentOpen: !editedStatus });
    setEditedStatus(!editedStatus);
  };

  const handleBack = () => {
    window.location.hash = '#/dashboard';
  };

  const handleRegister = () => {
    window.location.hash = `#/register?id=${club.id}`;
  };

  return (
    <div
      className={`min-h-screen py-8 px-4 sm:px-6 lg:px-8 ${
        isDark ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 to-purple-50'
      }`}
    >
      <div className="max-w-4xl mx-auto">
        <button
          onClick={handleBack}
          className={`mb-6 px-4 py-2 rounded-lg font-semibold transition ${
            isDark
              ? 'bg-gray-800 text-white hover:bg-gray-700'
              : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
          }`}
        >
          ← Back to Dashboard
        </button>

        <div
          className={`p-8 rounded-xl shadow-2xl ${
            isDark ? 'bg-gray-800' : 'bg-white'
          }`}
        >
          {/* Header */}
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1
                className={`text-4xl font-bold mb-2 ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}
              >
                {club.name}
              </h1>
              <div className="flex items-center gap-3">
                {editedStatus ? (
                  <span className="px-4 py-1 bg-green-100 text-green-800 text-sm font-semibold rounded-full">
                    ✓ Recruitment Open
                  </span>
                ) : (
                  <span className="px-4 py-1 bg-red-100 text-red-800 text-sm font-semibold rounded-full">
                    ✗ Recruitment Closed
                  </span>
                )}
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  👥 {club.members} members
                </p>
              </div>
            </div>

            {isAdmin && (
              <button
                onClick={handleStatusUpdate}
                className={`px-4 py-2 rounded-lg font-semibold transition ${
                  editedStatus
                    ? 'bg-red-500 hover:bg-red-600 text-white'
                    : 'bg-green-500 hover:bg-green-600 text-white'
                }`}
              >
                {editedStatus ? 'Close Recruitment' : 'Open Recruitment'}
              </button>
            )}
          </div>

          {/* Description */}
          <div className="mb-8">
            <h2
              className={`text-2xl font-bold mb-3 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}
            >
              About
            </h2>
            <p className={`text-lg leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              {club.fullDescription}
            </p>
          </div>

          {/* Events */}
          <div className="mb-8">
            <h2
              className={`text-2xl font-bold mb-4 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}
            >
              📅 Upcoming Events
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {club.events.map((event, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg border-l-4 border-purple-500 ${
                    isDark ? 'bg-gray-700' : 'bg-purple-50'
                  }`}
                >
                  <p className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {event}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className="mb-8">
            <h2
              className={`text-2xl font-bold mb-3 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}
            >
              📧 Contact
            </h2>
            <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              {club.contact}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              onClick={handleRegister}
              disabled={!editedStatus}
              className={`flex-1 px-6 py-3 rounded-lg font-bold text-lg transition ${
                editedStatus
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white cursor-pointer'
                  : isDark
                  ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              {editedStatus ? 'Register Now' : 'Registration Closed'}
            </button>
            <button
              onClick={handleBack}
              className={`flex-1 px-6 py-3 rounded-lg font-bold text-lg transition border-2 ${
                isDark
                  ? 'border-gray-600 text-gray-300 hover:bg-gray-700'
                  : 'border-gray-400 text-gray-700 hover:bg-gray-100'
              }`}
            >
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
