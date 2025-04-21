import AllProducts from "../../Components/products/AllProducts";
import styles from "./landingPage.module.css";

export default function LandingPage() {
  return (
    <div className={`mainContainer`}>
      {" "}
      <AllProducts />
    </div>
  );
}
