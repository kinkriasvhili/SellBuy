import { createContext, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../fetchData/getData";

export const ServerContext = createContext();

export function ServerProvider({ children }) {
  const serverQuery = useQuery({
    queryKey: ["server-status"],
    queryFn: getProducts,
    retry: true,
    retryDelay: 2000,
  });

  return (
    <ServerContext.Provider value={serverQuery}>
      {children}
    </ServerContext.Provider>
  );
}

export function useServerStatus() {
  return useContext(ServerContext);
}
