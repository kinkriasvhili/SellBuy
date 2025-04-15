import styles from "./nav.module.css";
import "@fontsource/love-light";
import "@fontsource/love-light/400.css";
import { Link, useLocation } from "react-router-dom";
import Search from "./Search";
import {
  faShoppingCart,
  faUser,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import { ButtonWIcon } from "../Ui/buttons/Buttons";
import { useEffect, useState, useContext } from "react";
import SignUpInNav from "../../Pages/SignUpIn/SignUpInNav";
import { AuthContext } from "../../Context/AuthContext";
export default function Nav() {
  const { isAuthenticated } = useContext(AuthContext);

  const [displayNav, setDisplayNav] = useState(true);
  const location = useLocation();
  useEffect(() => {
    if (
      location.pathname == "/login" ||
      location.pathname == "/signup" ||
      location.pathname == "/email-confrimation"
    ) {
      setDisplayNav(false);
    } else {
      setDisplayNav(true);
    }
  }, [location.pathname]);

  return (
    <>
      {displayNav ? (
        <nav>
          <div className={styles.leftCont}>
            <Link to={"/"}>
              <span className={styles.logo}>S&B</span>
            </Link>
          </div>
          <div className={styles.middleCont}>
            <Search />
          </div>
          <div className={`${styles.rightCont} flex-center`}>
            <Link to={`/guest/favorite`}>
              <ButtonWIcon
                icon={faHeart}
                iconSize="1x"
                name={["linked-btn", "favbtn"]}
                styles={styles}
                afterEffect="favoriteBtn"
              />
            </Link>
            <Link to={`/guest/cart`}>
              <ButtonWIcon
                icon={faShoppingCart}
                iconSize="1x"
                name={["linked-btn", "cartbtn"]}
                styles={styles}
                afterEffect="cartBtn"
              />
            </Link>
            <Link to={"/orders"}>
              <button className={`flex-center wht-btn ${styles.orders}`}>
                Returns & Orders
              </button>
            </Link>
            {!isAuthenticated ? (
              <Link to={"/login"}>
                <ButtonWIcon
                  text="Sign In"
                  icon={faUser}
                  iconSize="1x"
                  name={["wht-btn", "signin"]}
                  styles={styles}
                />
              </Link>
            ) : (
              <Link to={"/profile"}>
                {console.log(isAuthenticated)}
                <ButtonWIcon
                  text="Profile"
                  icon={faUser}
                  iconSize="1x"
                  name={["wht-btn", "profile"]}
                  styles={styles}
                />
              </Link>
            )}
          </div>
        </nav>
      ) : (
        <SignUpInNav styles={styles} />
      )}
    </>
  );
}
