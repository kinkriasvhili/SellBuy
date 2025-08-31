import styles from "./products.module.css";
import Product from "./Product";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { ProductContext } from "../../Context/ProductContext";
export default function NewProducts() {
  const { products } = useContext(ProductContext);

  if (products.isLoading) return <h1>...Loading</h1>;
  if (products.isError) return <h1>Error</h1>;
  // console.log(productsQuery.data);
  const productsData = products.data.results;
  return (
    <div className={`${styles.productsGrid}`}>
      {productsData
        // .filter((product) => product.condition === "new")
        .slice(0, 10)
        .map((product, index) => (
          <div key={product.id}>
            {console.log(product.average_rating)}
            <Product
              image={product.images[0].image}
              name={product.name}
              price={product.price}
              scope={"global"}
              rating={product.average_rating}
              index={index}
              slug={product.slug}
              id={product.id}
            />
          </div>
        ))}
    </div>
  );
}
