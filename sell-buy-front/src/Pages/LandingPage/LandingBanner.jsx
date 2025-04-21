import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { Link } from "react-router-dom";
export default function LandingBanner({ banner, styles }) {
  const { isAuthenticated } = useContext(AuthContext);
  console.log(isAuthenticated);
  return (
    <div className={styles.bannerContainer}>
      <div className={styles.bannerButtons}>
        <Link to={isAuthenticated ? "/profile" : "/logIn"}>
          <button>Start Selling</button>
        </Link>
        <Link to={isAuthenticated ? "/" : "/logIn"}>
          <button>Start Buying</button>
        </Link>
      </div>
      <img src={banner} alt="" />
    </div>
  );
}
