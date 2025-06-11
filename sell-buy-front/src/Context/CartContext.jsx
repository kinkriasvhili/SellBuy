import { createContext, useState, useEffect, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { getCart } from "../fetchData/getData";
import { AuthContext } from "./AuthContext";

export const CartContext = createContext();

export function CartContextProvider({ children }) {
  const { isAuthenticated } = useContext(AuthContext);
  const [cart, setCart] = useState(null);

  const cartQuery = useQuery({
    queryKey: ["cart"],
    queryFn: getCart,
    enabled: isAuthenticated,
  });

  useEffect(() => {
    if (!isAuthenticated) return;
    if (cartQuery.isSuccess) {
      setCart(cartQuery.data);
    } else if (cartQuery.isLoading) {
      setCart("...Loading");
    } else if (cartQuery.isError) {
      console.log(cartQuery.error);
    }
  }, [cartQuery]);

  return (
    <CartContext.Provider
      value={{ cart, setCart, refetchCart: cartQuery.refetch }}
    >
      {children}
    </CartContext.Provider>
  );
}
