import styles from "./nav.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { div } from "framer-motion/m";

export default function Search() {
  const [inputFocus, setInputFocus] = useState(false);
  const [value, setValue] = useState("");
  const [searchOn, setSearchOn] = useState(false);
  const navigate = useNavigate();

  const handleSearch = () => {
    if (value.trim()) {
      navigate(`/products?q=${encodeURIComponent(value.trim())}`);
    } else {
      navigate(`/products`);
    }
    setSearchOn(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <>
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
          onKeyDown={handleKeyDown} // allow Enter to trigger search
        />
        <button onClick={handleSearch}>
          <FontAwesomeIcon icon={faMagnifyingGlass} size="1x" />
        </button>
      </div>
      <button
        className={styles.searchButResp}
        onClick={() => {
          setSearchOn((prev) => !prev);
        }}
      >
        <FontAwesomeIcon icon={faMagnifyingGlass} size="1x" />
      </button>
      {searchOn && (
        <div className={styles.modalOverlay} onClick={() => setSearchOn(false)}>
          <div
            className={`${styles.searchBoxResponsive} flex-center ${
              inputFocus ? styles.focusedResponsive : ""
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <input
              type="text"
              placeholder="Search products..."
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onFocus={() => setInputFocus(true)}
              onBlur={() => setInputFocus(false)}
              onKeyDown={handleKeyDown} // allow Enter to trigger search
            />
            <button onClick={handleSearch}>
              <FontAwesomeIcon icon={faMagnifyingGlass} size="1x" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
