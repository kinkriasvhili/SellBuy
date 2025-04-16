import { createContext, useEffect } from "react";
import { useLocalStorage } from "../Hooks/useLocalStorage";
import { postRefreshToken } from "../fetchData/postData";
export const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useLocalStorage(
    "isAuthenticated",
    false
  );

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}
