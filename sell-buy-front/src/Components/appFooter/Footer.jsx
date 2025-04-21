import { Link, useLocation } from "react-router-dom";
import styles from "./footer.module.css";
import { useEffect, useState } from "react";

export default function Footer() {
  const [showFooter, setShowFooter] = useState(true);
  const location = useLocation();
  useEffect(() => {
    if (location.pathname == "/login" || location.pathname == "/signup") {
      setShowFooter(false);
    } else {
      setShowFooter(true);
    }
  }, []);
  return (
    <>
      {showFooter ? (
        <footer className={`${styles.footer}`}>
          <p>
            © 2025 Demo Online Marketplace Website. Created by{" "}
            <strong>Rati Kinkriashvili</strong> &{" "}
            <strong> Giorgi Giguashvili</strong>.{" "}
            <Link to={"/privacy-policy"}>Privacy Policy</Link>
          </p>
        </footer>
      ) : (
        ""
      )}
    </>
  );
}
