import React, { createContext, useState, useContext, ReactNode } from "react";

interface AuthContextType {
  isLoggedIn: boolean;
  token: string | null;
  setLoggedIn: (loggedIn: boolean) => void;
  setToken: (token: string | null) => void;
}

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  token: null,
  setLoggedIn: () => {},
  setToken: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isLoggedIn, setLoggedIn] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>(null);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setLoggedIn, token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};
