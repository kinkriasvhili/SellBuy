import { useQuery } from "@tanstack/react-query";
import { getMyProducts } from "../../fetchData/getData";
import styles from "./products.module.css";
import Product from "./Product";
import { Link } from "react-router-dom";

export default function MyProducts() {
  const productsQuery = useQuery({
    queryKey: ["products", "my"],
    queryFn: getMyProducts,
  });
  if (productsQuery.isLoading) return <h1>...Loading</h1>;

  if (productsQuery.isError) {
    console.log(productsQuery.error);
    return <h1>Error</h1>;
  }

  console.log(productsQuery.data);
  const products = productsQuery.data.results;
  return (
    <div className={styles.productsGrid}>
      {products.slice(0, 10).map((product) => (
        <Link to={`/product/${product.slug}`}>
          <div key={product.id}>
            {console.log(product.feature_images)}
            <Product
              image={product.feature_image}
              name={product.name}
              price={product.price}
              scope={"local"}
            />
          </div>
        </Link>
      ))}
    </div>
  );
}
