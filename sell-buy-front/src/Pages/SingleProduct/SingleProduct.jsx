import { useQuery } from "@tanstack/react-query";
import styles from "./singleProduct.module.css";
import { useParams } from "react-router-dom";
import { getSingleProduct } from "../../fetchData/getData";
import ProductDetails from "./ProductDetailed";

export default function SingleProduct() {
  const { slug } = useParams();
  // many-photos-5a81e0
  const productQuery = useQuery({
    queryKey: ["product", slug],
    queryFn: () => getSingleProduct(slug),
  });
  console.log(slug);
  if (productQuery.isLoading) return <h1 className="bottomNav">...Loading</h1>;
  if (productQuery.isError) {
    console.log(productQuery.error);
    console.log(productQuery.error.message);
    return (
      <div className="bottomNav">
        <h1>Error</h1>
        <h1>{slug}</h1>
      </div>
    );
  }
  const product = productQuery.data;
  console.log(product);
  return (
    <div>
      <ProductDetails product={product} />
    </div>
  );
}
