import { useQuery } from "@tanstack/react-query";
import styles from "./filteredProducts.module.css";
import { useParams, useSearchParams } from "react-router-dom";
import { getFilteredProducts } from "../../fetchData/getData";
import { useEffect } from "react";

import Product from "../../Components/products/Product";
import Filter from "./Filter";
import { useLocation } from "react-router-dom";
export default function FilteredProducts() {
  const { slug } = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const filters = {
    category: slug || searchParams.get("category") || undefined,
    condition: searchParams.get("condition") || undefined,
    price_min: searchParams.get("price_min") || undefined,
    price_max: searchParams.get("price_max") || undefined,
    q: searchParams.get("q") || undefined,
  };

  const filteredQuery = useQuery({
    queryKey: ["products", location.search], // depend on URL directly
    queryFn: () => {
      const searchParams = new URLSearchParams(location.search);
      return getFilteredProducts({
        category: slug || searchParams.get("category") || undefined,
        condition: searchParams.get("condition") || undefined,
        price_min: searchParams.get("price_min") || undefined,
        price_max: searchParams.get("price_max") || undefined,
        q: searchParams.get("q") || undefined,
      });
    },
  });

  if (filteredQuery.isLoading) {
    return (
      <div className={`${styles.productsGrid} bottomNav`}>
        <h1>Loading...</h1>
      </div>
    );
  }

  if (filteredQuery.isError) {
    console.log(filteredQuery.error);
    return (
      <div className={`${styles.productsGrid} bottomNav`}>
        <h1>Error loading products</h1>
      </div>
    );
  }

  const products = filteredQuery?.data?.results || [];

  return (
    <div className={`${styles.productsGrid} bottomNav`}>
      <Filter />
      {products.length > 0 ? (
        products.map((product) => (
          <div key={product.id}>
            <Product
              image={product.images[0].image}
              name={product.name}
              price={product.price}
              scope={"global"}
              slug={product.slug}
              id={product.id}
            />
          </div>
        ))
      ) : (
        <div className={styles.prodNone}>No products found</div>
      )}
    </div>
  );
}
