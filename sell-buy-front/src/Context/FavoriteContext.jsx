import { createContext, useEffect, useState, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { getFav } from "../fetchData/getData";
import { AuthContext } from "./AuthContext";
export const FavoriteContext = createContext();

export function FavoriteContextProvider({ children }) {
  const { isAuthenticated } = useContext(AuthContext);
  const [favorites, setFavorites] = useState(null);

  const favQuery = useQuery({
    queryKey: ["favourites"],
    queryFn: getFav,
    enabled: isAuthenticated,
  });

  useEffect(() => {
    if (!isAuthenticated) return;
    if (favQuery.isSuccess) {
      setFavorites(favQuery.data);
    } else if (favQuery.isLoading) {
      setFavorites("...Loading");
    } else if (favQuery.isError) {
      console.log(favQuery.error);
    }
  }, [favQuery]);

  return (
    <FavoriteContext.Provider
      value={{ favorites, setFavorites, refetchFavorites: favQuery.refetch }}
    >
      {children}
    </FavoriteContext.Provider>
  );
}
