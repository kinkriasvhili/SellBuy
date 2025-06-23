import { useQuery } from "@tanstack/react-query";
import styles from "./filteredProducts.module.css";
import { useParams, useSearchParams } from "react-router-dom";
import { getCategoryProducts, getSingleProduct } from "../../fetchData/getData";
import { useContext } from "react";
import { ProductContext } from "../../Context/ProductContext";
import Product from "../../Components/products/Product";
export default function FilteredProducts() {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");
  const { myProducts } = useContext(ProductContext);
  console.log("slug:", slug);
  console.log("category:", category);
  const productQuery = useQuery({
    queryKey: ["products", slug],
    queryFn: () => getCategoryProducts(slug),
  });

  if (productQuery.isLoading) {
    return <h1 className="bottomNav">...Loading</h1>;
  }

  if (productQuery.isError) {
    console.log(productQuery.error);
    return <h1 className="bottomNav">error</h1>;
  }

  const product = productQuery.data;
  product.children.map((pro) => {
    console.log(pro);
  });
  const productsData = myProducts.data.results;

  return (
    <div className={styles.productsGrid}>
      {productsData.slice(0, 10).map((product, index) => {
        return (
          <div key={product.id}>
            <Product
              image={product.feature_image}
              name={product.name}
              price={product.price}
              scope={"local"}
              index={index}
              slug={product.slug}
              id={product.id}
            />
          </div>
        );
      })}
    </div>
  );
}
// rc-toys
