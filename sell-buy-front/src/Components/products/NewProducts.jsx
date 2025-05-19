import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../../fetchData/getData";
import styles from "./products.module.css";
import animatedStyles from "./productsAnimation.module.css";
import Product from "./Product";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export default function NewProducts() {
  const navigation = useNavigate();
  const handleNavigate = () => {
    console.log('this is navigate')
  }
  const productsQuery = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });
  if (productsQuery.isLoading) return <h1>...Loading</h1>;
  if (productsQuery.isError) return <h1>Error</h1>;
  // console.log(productsQuery.data);
  const products = productsQuery.data.results;
  return (
    <div onClick={handleNavigate} className={`${styles.productsGrid}`}>
      {products
        // .filter((product) => product.condition === "new")
        .slice(0, 10)
        .map((product, index) => (
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
        ))}
    </div>
  );
}
