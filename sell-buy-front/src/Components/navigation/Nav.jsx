import styles from "./nav.module.css";
import "@fontsource/love-light";
import "@fontsource/love-light/400.css";
import { Link, useLocation } from "react-router-dom";
import Search from "./Search";
import {
  faShoppingCart,
  faUser,
  faHeart,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { ButtonWIcon } from "../Ui/buttons/Buttons";
import { useEffect, useState, useContext } from "react";
import SignUpInNav from "../../Pages/SignUpIn/SignUpInNav";
import { AuthContext } from "../../Context/AuthContext";
import { UserContext } from "../../Context/UserContext";

export default function Nav() {
  const { isAuthenticated } = useContext(AuthContext);
  const { userState } = useContext(UserContext);

  const [displayNav, setDisplayNav] = useState(true);
  const location = useLocation();

  const [isScrolled, setIsScrolled] = useState(false);
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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10); // add shadow after 10px scroll
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <>
      {displayNav ? (
        <nav className={`${styles.nav} ${isScrolled ? styles.scrolled : ""}`}>
          <div className={styles.leftCont}>
            <Link to={"/"}>
              <span className={styles.logo}>S&B</span>
            </Link>
          </div>
          <div className={styles.middleCont}>
            <Search />
          </div>
          <div className={`${styles.rightCont} flex-center`}>
            {/* {console.log("nav, ", userState)} */}
            <Link to={isAuthenticated ? `/add-products` : "/login"}>
              <ButtonWIcon
                icon={faPlus}
                iconSize="1x"
                name={["linked-btn", "addProducts"]}
                styles={styles}
                afterEffect="addProducts"
              />
            </Link>
            <Link
              to={
                isAuthenticated
                  ? `/${userState.full_username}/favorite`
                  : "/login"
              }
            >
              <ButtonWIcon
                icon={faHeart}
                iconSize="1x"
                name={["linked-btn", "favbtn"]}
                styles={styles}
                afterEffect="favoriteBtn"
              />
            </Link>
            <Link
              to={
                isAuthenticated ? `/${userState.full_username}/cart` : "/login"
              }
            >
              <ButtonWIcon
                icon={faShoppingCart}
                iconSize="1x"
                name={["linked-btn", "cartbtn"]}
                styles={styles}
                afterEffect="cartBtn"
              />
            </Link>
            <Link to={isAuthenticated ? "/orders" : "/login"}>
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
        <SignUpInNav isScrolled={isScrolled} styles={styles} />
      )}
    </>
  );
}
