import styles from "./landingPage.module.css";
import banner from "../../Images/landingPageBanner6.jpg";
import LandingBanner from "./LandingBanner";
import NewProducts from "../../Components/products/NewProducts";
import Filter from "../FilteredProducts/Filter";
export default function LandingPage() {
  return (
    <div className={`bottomNav ${styles.landingPageContainer}`}>
      <LandingBanner banner={banner} styles={styles} />
      <Filter />

      <div className={`mainContainer ${styles.newProductsContainer}`}>
        <h1>Latest products update</h1>
        <NewProducts />
      </div>
    </div>
  );
}
