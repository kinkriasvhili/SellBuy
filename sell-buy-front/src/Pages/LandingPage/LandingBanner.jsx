import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { Link } from "react-router-dom";
export default function LandingBanner({ banner, styles }) {
  const { isAuthenticated } = useContext(AuthContext);
  return (
    <div className={styles.bannerContainer}>
      <div className={styles.bannerButtons}>
        <Link to={isAuthenticated ? "/add-products" : "/logIn"}>
          <button className={styles.leftBtn}>Start Selling</button>
        </Link>
        <Link to={isAuthenticated ? "/" : "/logIn"}>
          <button className={styles.rightBtn}>Start Buying</button>
        </Link>
      </div>
      <img src={banner} alt="" />
    </div>
  );
}
