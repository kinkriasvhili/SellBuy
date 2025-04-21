import AllProducts from "../../Components/products/AllProducts";
import styles from "./landingPage.module.css";
import banner from "../../Images/landingPageBanner6.jpg";
import LandingBanner from "./LandingBanner";
export default function LandingPage() {
  return (
    <div className={`bottomNav ${styles.landingPageContainer}`}>
      <LandingBanner banner={banner} styles={styles} />
      <AllProducts />
    </div>
  );
}
