// context.jsx
import { createContext, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { getMyProducts, getProducts } from "../fetchData/getData";
import { AuthContext } from "./AuthContext";

export const ProductContext = createContext();

export function ProductContextProvider({ children }) {
  const { isAuthenticated } = useContext(AuthContext);

  const myProductsQuery = useQuery({
    queryKey: ["products", "my"],
    queryFn: getMyProducts,
    enabled: isAuthenticated,
  });

  const productsQuery = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });
  return (
    <ProductContext.Provider
      value={{ myProducts: myProductsQuery, products: productsQuery }}
    >
      {children}
    </ProductContext.Provider>
  );
}
