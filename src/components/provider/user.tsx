'use client';

import exp from 'constants';
import { createContext, useContext } from 'react';

export type User = {
  name: string;
  email: string;
  image: string;
};

export const UserContext = createContext<User | null>(null);

export const useUser = () => {
  const user = useContext(UserContext);
  if (!user) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return user;
};

const UserProvider = ({
  user,
  children,
}: {
  user: User;
  children: React.ReactNode;
}) => {
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export default UserProvider;
