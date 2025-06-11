import { useQuery } from "@tanstack/react-query";
import { getSingleProduct } from "../../fetchData/getData";

export default function GetProductQuery(slug, setProduct) {
  // many-photos-5a81e0
  const productQuery = useQuery({
    queryKey: ["product", slug],
    queryFn: () => getSingleProduct(slug),
  });
  if (productQuery.isLoading) return <h1 className="bottomNav">...Loading</h1>;
  if (productQuery.isError) {
    console.log(productQuery.error);
    console.log(productQuery.error.message);
    alert("error");
    return <h1>Error</h1>;
  }
  const product = productQuery.data;
  useEffect(() => {
    if (productQuery.data) {
      setProduct(productQuery.data);
    }
  }, [productQuery.data, setProduct]);
  return null;
}
