import { createContext, useState, useContext } from "react";

// Create context
const HideNavContext = createContext();

// Export provider
export function HideNavProvider({ children }) {
  const [hide, setHide] = useState(false);
  return (
    <HideNavContext.Provider value={{ hide, setHide }}>
      {children}
    </HideNavContext.Provider>
  );
}

// Custom hook for convenience
export function useHideNav() {
  return useContext(HideNavContext);
}
