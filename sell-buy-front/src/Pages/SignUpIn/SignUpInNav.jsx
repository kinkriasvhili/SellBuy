import { Link, useLocation } from "react-router-dom";
import { ButtonWIcon } from "../../Components/Ui/buttons/Buttons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
export default function SignUpInNav({ isScrolled, styles }) {
  const [toPage, setToPage] = useState({ url: "signup", text: "Sign Up" });
  const location = useLocation();
  useEffect(() => {
    switch (location.pathname) {
      case "/signup":
        setToPage({ url: "login", text: "Sign In" });
        break;
      default:
        setToPage({ url: "signup", text: "Sign Up" });
        break;
    }
  }, [location]);
  return (
    <nav
      className={`${styles.nav} ${isScrolled ? styles.scrolled : ""}`}
      style={{ paddingBottom: "0px" }}
    >
      <div className={`${styles.leftCont} mainContainer`}>
        <Link to={"/"}>
          <span className={styles.logo}>S&B</span>
        </Link>
      </div>
      <div className={styles.rightSide}>
        <Link to={`/${toPage.url}`}>
          <ButtonWIcon
            text={`${toPage.text}`}
            icon={faUser}
            iconSize="1x"
            name={["wht-btn", "logregbtn"]}
            styles={styles}
          />
        </Link>
      </div>
    </nav>
  );
}
