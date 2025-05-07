import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../../fetchData/getData";
import styles from "./products.module.css";
import Product from "./Product";
export default function MyProducts() {
  const productsQuery = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });
  if (productsQuery.isLoading) return <h1>...Loading</h1>;
  if (productsQuery.isError) return <h1>Error</h1>;

  console.log(productsQuery.data);
  const products = productsQuery.data.results;
  return (
    <div className={styles.productsGrid}>
      {products.slice(0, 10).map((product) => (
        <div key={product.id}>
          <Product
            image={product.images[0].image}
            name={product.name}
            price={product.price}
            scope={"local"}
          />
        </div>
      ))}
    </div>
  );
}
