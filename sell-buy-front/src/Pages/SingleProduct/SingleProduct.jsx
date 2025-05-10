import { useParams } from "react-router-dom";

export default function SingleProduct() {
  const { slug } = useParams();
  return (
    <div>
      <h1 className="bottomNav">This is single product page {slug}</h1>
    </div>
  );
}
