import { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import ClubSection from './ClubSection';

export default function Dashboard() {
  const [clubsData, setClubsData] = useState(null);
  const { isDark } = useTheme();

  useEffect(() => {
    fetch('/clubsData.json')
      .then((res) => res.json())
      .then((data) => setClubsData(data))
      .catch((err) => console.error('Error loading data:', err));
  }, []);

  if (!clubsData) {
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

  // Get clubs with open recruitment
  const openTechnicalClubs = clubsData.technicalClubs.filter(
    (c) => c.recruitmentOpen
  );
  const openCulturalClubs = clubsData.culturalClubs.filter(
    (c) => c.recruitmentOpen
  );
  const upcomingEvents = [
    ...clubsData.technicalClubs.slice(0, 3),
    ...clubsData.culturalClubs.slice(0, 2),
  ].flatMap((club) =>
    club.events.map((event) => ({
      name: event,
      clubName: club.name,
      clubId: club.id,
    }))
  );

  return (
    <div
      className={`min-h-screen ${
        isDark ? 'bg-gray-1000' : 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50'
      }`}
    >
      {/* Hero Section */}
      <section
        className={`py-12 px-4 sm:px-6 lg:px-8 ${
          isDark ? 'bg-gray-800' : 'bg-gradient-to-r from-blue-500 to-purple-600'
        }`}
      >
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Welcome to College Clubs Hub
          </h1>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto">
            Discover, engage, and grow with our diverse clubs community
          </p>
        </div>
      </section>

      {/* Important Notices Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-10">
          <h2 className={`text-3xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            📢 Important Notices
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {/* Ongoing Recruitment */}
          <div
            className={`p-6 rounded-xl shadow-lg ${
              isDark ? 'bg-gray-800 border border-green-600' : 'bg-green-50 border-2 border-green-200'
            }`}
          >
            <h3
              className={`text-2xl font-bold mb-4 ${
                isDark ? 'text-green-400' : 'text-green-700'
              }`}
            >
              🎯 Open Recruitment Drives
            </h3>
            <div className="space-y-2">
              {openTechnicalClubs.slice(0, 3).map((club) => (
                <div
                  key={club.id}
                  onClick={() => window.location.hash = `#/club?id=${club.id}`}
                  className={`p-3 rounded-lg cursor-pointer transition transform hover:scale-105 ${
                    isDark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-white hover:bg-green-100'
                  }`}
                >
                  <p className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {club.name}
                  </p>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {club.description}
                  </p>
                </div>
              ))}
              {openCulturalClubs.slice(0, 2).map((club) => (
                <div
                  key={club.id}
                  onClick={() => window.location.hash = `#/club?id=${club.id}`}
                  className={`p-3 rounded-lg cursor-pointer transition transform hover:scale-105 ${
                    isDark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-white hover:bg-green-100'
                  }`}
                >
                  <p className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {club.name}
                  </p>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {club.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Events */}
          <div
            className={`p-6 rounded-xl shadow-lg ${
              isDark ? 'bg-gray-800 border border-blue-600' : 'bg-blue-50 border-2 border-blue-200'
            }`}
          >
            <h3
              className={`text-2xl font-bold mb-4 ${
                isDark ? 'text-blue-400' : 'text-blue-700'
              }`}
            >
              🗓️ Upcoming Events
            </h3>
            <div className="space-y-2">
              {upcomingEvents.slice(0, 5).map((event, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-lg ${
                    isDark ? 'bg-gray-700' : 'bg-white'
                  }`}
                >
                  <p className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {event.name}
                  </p>
                  <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    by {event.clubName}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Clubs Sections */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <ClubSection
          title="🖥️ Technical Clubs"
          clubs={clubsData.technicalClubs}
          category="technical"
        />
        <ClubSection
          title="🎭 Cultural Clubs"
          clubs={clubsData.culturalClubs}
          category="cultural"
        />
      </section>
    </div>
  );
}
