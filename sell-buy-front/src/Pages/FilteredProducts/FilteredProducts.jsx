import { useQuery } from "@tanstack/react-query";
import styles from "./filteredProducts.module.css";
import { useParams, useSearchParams } from "react-router-dom";
import { getCategoryProducts, getSingleProduct } from "../../fetchData/getData";

export default function FilteredProducts() {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");

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
  console.log(product);

  return (
    <div className={`bottomNav ${styles.container}`}>
      This is Filtered Products
      <pre>{JSON.stringify(product, null, 2)}</pre>
    </div>
  );
}
