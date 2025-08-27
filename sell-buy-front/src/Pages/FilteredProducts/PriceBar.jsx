import { useState } from "react";
import styles from "./pricebar.module.css";
import { useSearchParams } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

export default function PriceBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOn, setIsOn] = useState(false);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const [buttonDissable, setButtonDissable] = useState(true);

  const updateParams = () => {
    const newParams = new URLSearchParams(searchParams); // keep old ones

    if (minPrice) newParams.set("price_min", minPrice);
    else newParams.delete("price_min");

    if (maxPrice) newParams.set("price_max", maxPrice);
    else newParams.delete("price_max");

    setSearchParams(newParams); // now contains category + condition + price
    if (location.pathname == "/") {
      navigate(`/products?${newParams.toString()}`);
    } else {
      navigate(`${location.pathname}?${newParams.toString()}`);
    }
  };
  const handleClick = () => {
    setIsOn((prev) => !prev);
  };
  const checkPrices = (min, max) => {
    if (min !== "" && max !== "" && Number(min) < Number(max)) {
      setButtonDissable(false);
    } else {
      setButtonDissable(true);
    }
  };

  return (
    <>
      <div className={styles.categories}>
        <div className={styles.PriceBarCont}>
          <div
            className={`${styles.category} ${styles.btnContainer}`}
            onClick={handleClick}
          >
            Price Range
            <button
              className={`${styles.icon} ${isOn ? styles.rotate : ""}`}
              onClick={() => {
                setIsOn(!isOn);
                handleClick();
              }}
            >
              <FontAwesomeIcon icon={faChevronDown} size="1x" />
            </button>
          </div>
          {isOn && (
            <div className={styles.inputGroup}>
              <input
                type="number"
                min={0}
                placeholder="Min"
                value={minPrice}
                onChange={(e) => {
                  const raw = e.target.value;
                  if (raw === "") {
                    setMinPrice("");
                    checkPrices("", maxPrice);
                    return;
                  }
                  if (Number(raw) < 0) return;

                  setMinPrice(raw);
                  checkPrices(raw, maxPrice);
                }}
                className={styles.input}
              />
              <span className={styles.separator}>—</span>
              <input
                type="number"
                placeholder="Max"
                value={maxPrice}
                onChange={(e) => {
                  const raw = e.target.value;
                  setMaxPrice(raw);
                  checkPrices(minPrice, raw);
                }}
                className={styles.input}
              />
              <button
                onClick={updateParams}
                disabled={buttonDissable}
                className={`${styles.category} ${styles.childCategory} ${
                  buttonDissable && "disabledBtn numberDisabled"
                }`}
              >
                Apply
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
