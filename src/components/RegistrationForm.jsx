import { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

export default function RegistrationForm() {
  const { isDark } = useTheme();
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    branch: '',
  });

  const [clubsData, setClubsData] = useState(null);
  const [club, setClub] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    // Get club ID from URL hash parameters
    const hash = window.location.hash;
    const params = new URLSearchParams(hash.split('?')[1]);
    const clubId = params.get('id');

    if (clubId) {
      fetch('/clubsData.json')
        .then((res) => res.json())
        .then((data) => {
          setClubsData(data);
          const allClubs = [
            ...data.technicalClubs,
            ...data.culturalClubs,
          ];
          const foundClub = allClubs.find((c) => c.id === parseInt(clubId));
          setClub(foundClub);
        })
        .catch((err) => console.error('Error loading data:', err));
    }
  }, []);

  const branches = [
    'Computer Science',
    'Information Technology',
    'Electronics',
    'Mechanical',
    'Civil',
    'Electrical',
    'Other',
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.branch) {
      setIsSubmitted(true);
      setTimeout(() => {
        window.location.hash = '#/dashboard';
      }, 2000);
    }
  };

  const handleBack = () => {
    window.location.hash = '#/dashboard';
  };

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

  return (
    <div
      className={`min-h-screen py-8 px-4 sm:px-6 lg:px-8 ${
        isDark ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 to-purple-50'
      }`}
    >
      <div className="max-w-2xl mx-auto">
        <button
          onClick={handleBack}
          className={`mb-6 px-4 py-2 rounded-lg font-semibold transition ${
            isDark
              ? 'bg-gray-800 text-white hover:bg-gray-700'
              : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
          }`}
        >
          ← Back
        </button>

        <div
          className={`p-8 rounded-xl shadow-2xl ${
            isDark ? 'bg-gray-800' : 'bg-white'
          }`}
        >
          <h1
            className={`text-3xl font-bold mb-2 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}
          >
            Register for {club.name}
          </h1>
          <p className={`mb-6 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Join our community and be part of amazing experiences
          </p>

          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  className={`block text-sm font-medium mb-2 ${
                    isDark ? 'text-gray-300' : 'text-gray-700'
                  }`}
                >
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Enter your full name"
                  className={`w-full px-4 py-2 rounded-lg border-2 focus:outline-none focus:border-blue-500 transition ${
                    isDark
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                      : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500'
                  }`}
                />
              </div>

              <div>
                <label
                  className={`block text-sm font-medium mb-2 ${
                    isDark ? 'text-gray-300' : 'text-gray-700'
                  }`}
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Enter your email"
                  className={`w-full px-4 py-2 rounded-lg border-2 focus:outline-none focus:border-blue-500 transition ${
                    isDark
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                      : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500'
                  }`}
                />
              </div>

              <div>
                <label
                  className={`block text-sm font-medium mb-2 ${
                    isDark ? 'text-gray-300' : 'text-gray-700'
                  }`}
                >
                  Branch
                </label>
                <select
                  name="branch"
                  value={formData.branch}
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-2 rounded-lg border-2 focus:outline-none focus:border-blue-500 transition ${
                    isDark
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-gray-50 border-gray-300 text-gray-900'
                  }`}
                >
                  <option value="">Select your branch</option>
                  {branches.map((branch) => (
                    <option key={branch} value={branch}>
                      {branch}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-3 rounded-lg transition duration-200 transform hover:scale-105"
              >
                Complete Registration
              </button>
            </form>
          ) : (
            <div className="text-center py-8">
              <div className="mb-4 text-6xl">✅</div>
              <h2 className={`text-2xl font-bold mb-2 ${isDark ? 'text-green-400' : 'text-green-600'}`}>
                Registration Successful!
              </h2>
              <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                Welcome to {club.name}! You will be redirected shortly.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
