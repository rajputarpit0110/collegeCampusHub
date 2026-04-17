import { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { RoleProvider } from './context/RoleContext';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import ClubDetails from './components/ClubDetails';
import RegistrationForm from './components/RegistrationForm';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import './index.css';

// Simple routing without React Router - using URL hash
function AppContent() {
  const [currentRoute, setCurrentRoute] = useState('/');
  const [routeParams, setRouteParams] = useState({});

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1) || '/';
      const [path, params] = hash.split('?');

      // Parse route parameters
      const paramObj = {};
      if (params) {
        params.split('&').forEach(param => {
          const [key, value] = param.split('=');
          paramObj[key] = decodeURIComponent(value);
        });
      }

      setCurrentRoute(path);
      setRouteParams(paramObj);
    };

    // Set initial route
    handleHashChange();

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = (path, params = {}) => {
    const paramString = Object.keys(params).length
      ? '?' + Object.entries(params).map(([k, v]) => `${k}=${encodeURIComponent(v)}`).join('&')
      : '';
    window.location.hash = path + paramString;
  };

  // Provide navigate function to components via context
  const routeContext = { currentRoute, routeParams, navigate };

  const renderRoute = () => {
    switch (currentRoute) {
      case '/':
        return <Login />;

      case '/dashboard':
        return (
          <ProtectedRoute>
            <>
              <Navbar />
              <Dashboard />
            </>
          </ProtectedRoute>
        );

      case '/club':
        return (
          <ProtectedRoute>
            <>
              <Navbar />
              <ClubDetails />
            </>
          </ProtectedRoute>
        );

      case '/register':
        return (
          <ProtectedRoute>
            <>
              <Navbar />
              <RegistrationForm />
            </>
          </ProtectedRoute>
        );

      default:
        return <Login />;
    }
  };

  return (
    <div className="route-context" data-route={currentRoute}>
      {renderRoute()}
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <RoleProvider>
          <AppContent />
        </RoleProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
