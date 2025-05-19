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
  faBars,
  faClose,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ButtonWIcon } from "../Ui/buttons/Buttons";
import { useEffect, useState, useContext, useRef } from "react";
import SignUpInNav from "../../Pages/SignUpIn/SignUpInNav";
import { AuthContext } from "../../Context/AuthContext";
import { UserContext } from "../../Context/UserContext";
import { useHideNav } from "../../Context/HideNav";

export default function Nav() {
  const { isAuthenticated } = useContext(AuthContext);
  const { userState } = useContext(UserContext);
  const { hide } = useHideNav();
  const [displayNav, setDisplayNav] = useState(true);
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isBarOpen, setIsBarOpen] = useState(false);
  const [barIcon, setBarIcon] = useState(faBars);
  const navRef = useRef(null);
  const overlayRef = useRef(null);
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
  useEffect(() => {
    function handleClickOutside(event) {
      const nav = navRef.current;
      const overlay = overlayRef.current;

      if (overlay && nav && !nav.contains(event.target) && !isBarOpen) {
        setIsBarOpen(false);
        setBarIcon((prev) => {
          return faBars;
        });
      }
    }

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  if (hide) return;
  const toggleMenu = () => {
    setIsBarOpen((prev) => !prev);
    setBarIcon((prev) => {
      if (prev == faBars) {
        return faClose;
      } else {
        return faBars;
      }
    });
  };
  return (
    <>
      {displayNav ? (
        <>
          <div
            ref={overlayRef}
            className={`${isBarOpen ? styles.overlay : ""}`}
          ></div>

          <nav
            ref={navRef}
            className={`${styles.nav} ${isScrolled ? styles.scrolled : ""}`}
          >
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
              <div
                className={`${styles.navRightButtons} ${
                  isBarOpen ? styles.respOn : ""
                }`}
              >
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
                    isAuthenticated
                      ? `/${userState.full_username}/cart`
                      : "/login"
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
              </div>

              <div className={styles.profileLogin}>
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
              <div
                className={`${styles.menuBar} ${
                  isBarOpen ? styles.barOpen : ""
                }`}
                onClick={toggleMenu}
              >
                <ButtonWIcon
                  text=""
                  icon={barIcon}
                  iconSize="1x"
                  name={["wht-btn", "bar"]}
                  styles={styles}
                />
              </div>
            </div>
          </nav>
        </>
      ) : (
        <SignUpInNav isScrolled={isScrolled} styles={styles} />
      )}
    </>
  );
}
