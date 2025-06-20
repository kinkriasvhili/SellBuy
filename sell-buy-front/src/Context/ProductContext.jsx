// context.jsx
import { createContext, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  getMyProducts,
  getProducts,
  getProductsCategories,
} from "../fetchData/getData";
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

  const categQueries = useQuery({
    queryKey: ["categories"],
    queryFn: getProductsCategories,
  });
  return (
    <ProductContext.Provider
      value={{
        myProducts: myProductsQuery,
        products: productsQuery,
        categQueries,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}
