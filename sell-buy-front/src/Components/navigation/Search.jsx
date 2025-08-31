import styles from "./nav.module.css";
import { ButtonWIcon } from "../Ui/buttons/Buttons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Search() {
  const [inputFocus, setInputFocus] = useState(false);
  const [value, setValue] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handler = setTimeout(() => {
      if (value.trim()) {
        // ✅ always go to /products?q=...
        navigate(`/products?q=${encodeURIComponent(value.trim())}`);
      } else {
        // if empty, just go to products page without q
        if (location.pathname.startsWith("/products")) {
          navigate(`/products`);
        }
      }
    }, 300);

    return () => clearTimeout(handler);
  }, [value, navigate, location.pathname]);

  return (
    <div
      className={`${styles.searchBox} flex-center ${
        inputFocus ? styles.focused : ""
      }`}
    >
      <input
        type="text"
        placeholder="Search products..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => setInputFocus(true)}
        onBlur={() => setInputFocus(false)}
      />
      <ButtonWIcon icon={faMagnifyingGlass} iconSize="1x" />
    </div>
  );
}
