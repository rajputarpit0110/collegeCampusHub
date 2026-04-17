import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [clubsData, setClubsData] = useState(null);
  const { login } = useAuth();
  const { isDark } = useTheme();

  useEffect(() => {
    fetch('/clubsData.json')
      .then((res) => res.json())
      .then((data) => setClubsData(data))
      .catch((err) => console.error('Error loading data:', err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    if (clubsData) {
      const user = clubsData.users.find(
        (u) => u.email === email && u.password === password
      );

      if (user) {
        login({
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        });
        window.location.hash = '#/dashboard';
      } else {
        setError('Invalid email or password');
      }
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center ${
        isDark ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 to-purple-50'
      }`}
    >
      <div
        className={`w-full max-w-md p-8 rounded-2xl shadow-xl ${
          isDark ? 'bg-gray-800' : 'bg-white'
        }`}
      >
        <div className="text-center mb-8">
          <h1 className={`text-3xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-800'}`}>
            College Clubs Hub
          </h1>
          <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
            Sign in to your account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className={`w-full px-4 py-2 rounded-lg border-2 focus:outline-none focus:border-blue-500 transition ${
                isDark
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                  : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500'
              }`}
            />
          </div>

          {error && <p className="text-red-500 text-sm font-medium">{error}</p>}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-2 rounded-lg transition duration-200 transform hover:scale-105"
          >
            Sign In
          </button>
        </form>

        <div
          className={`mt-6 p-4 rounded-lg ${
            isDark ? 'bg-gray-700' : 'bg-gray-100'
          }`}
        >
          <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            <strong>Demo Credentials:</strong>
          </p>
          <p className={`text-xs mt-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Student: deepa@college.com / deepa123
          </p>
          <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Admin: admin@college.com / admin123
          </p>
        </div>
      </div>
    </div>
  );
}
