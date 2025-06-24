import { useQuery } from "@tanstack/react-query";
import styles from "./filteredProducts.module.css";
import { useParams, useSearchParams } from "react-router-dom";
import { getFilteredProducts } from "../../fetchData/getData";
import { useEffect } from "react";

import Product from "../../Components/products/Product";
import Filter from "./Filter";
export default function FilteredProducts() {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");
  const filteredQuery = useQuery({
    queryKey: ["products", slug],
    queryFn: () => getFilteredProducts({ category: slug }),
    enabled: !!slug, // avoid running if slug is undefined
  });

  useEffect(() => {
    console.log("slug:", slug);
    // console.log("category:", category);
  }, [slug]);

  if (filteredQuery.isLoading) {
    return (
      <div className={`${styles.productsGrid} bottomNav`}>
        <h1>Hello</h1>
      </div>
    );
  }

  if (filteredQuery.isError) {
    console.log(filteredQuery.error);
    return (
      <div className={`${styles.productsGrid} bottomNav`}>
        <h1>error</h1>
      </div>
    );
  }

  const products = filteredQuery?.data?.results;
  return (
    <div className={`${styles.productsGrid} bottomNav`}>
      <Filter />
      {products && products.length > 0 ? (
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
        <p>No products found.</p>
      )}
    </div>
  );
}
// rc-toys

/**
  const { myProducts } = useContext(ProductContext);
 * 
  const productsData = myProducts.data.results;
 * 
 * 
 */
