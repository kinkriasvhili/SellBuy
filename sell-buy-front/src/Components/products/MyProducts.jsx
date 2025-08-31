import { useQuery } from "@tanstack/react-query";
import { getMyProducts } from "../../fetchData/getData";
import styles from "./products.module.css";
import Product from "./Product";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { ProductContext } from "../../Context/ProductContext";
export default function MyProducts() {
  const { myProducts, products } = useContext(ProductContext);
  if (myProducts.isLoading) {
    return <h1>..loading</h1>;
  }
  if (myProducts.isError) {
    return <h1>Error</h1>;
  }

  const productsData = myProducts.data.results;

  return (
    <div className={styles.productsGrid}>
      {productsData.slice(0, 10).map((product, index) => {
        return (
          <div key={product.id}>
            {console.log()}
            <Product
              image={product.feature_image}
              name={product.name}
              price={product.price}
              scope={"local"}
              index={index}
              slug={product.slug}
              id={product.id}
              rating={product.average_rating}
            />
          </div>
        );
      })}
      {/* {products.slice(0, 10).map((product, index) => (
        <div key={product.id}>
          <Link to={`/product/${product.slug}`}>
            <Product
              image={product.images[0].image}
              name={product.name}
              price={product.price}
              scope={"global"}
              index={index}
            />
          </Link>
        </div>
      ))} */}
    </div>
  );
}
