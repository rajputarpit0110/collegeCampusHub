import { createContext, useContext } from 'react';
import { useAuth } from './AuthContext';

const RoleContext = createContext();

export const RoleProvider = ({ children }) => {
  return (
    <RoleContext.Provider value={{}}>
      {children}
    </RoleContext.Provider>
  );
};

export const useRole = () => {
  const { user } = useAuth();
  const role = user?.role || 'student';

  const isAdmin = role === 'admin';
  const isStudent = role === 'student';

  return { role, isAdmin, isStudent };
};
