import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../../fetchData/getData";
import img from "../../Images/profile.jpg";
import styles from "./products.module.css";
import Product from "./product";
const avatarURL = img;
export default function AllProducts() {
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
      {products.map((product) => (
        <div key={product.id}>
          <Product
            image={product.images[0].image}
            name={product.name}
            price={product.price}
            scope={"global"}
          />
        </div>
      ))}
    </div>
  );
}
