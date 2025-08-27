import { useState } from "react";
import styles from "./pricebar.module.css";
import { useSearchParams } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";

export default function PriceBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  const updateParams = () => {
    const newParams = new URLSearchParams(searchParams); // keep old ones

    if (minPrice) newParams.set("price_min", minPrice);
    else newParams.delete("price_min");

    if (maxPrice) newParams.set("price_max", maxPrice);
    else newParams.delete("price_max");

    setSearchParams(newParams); // now contains category + condition + price

    navigate(`${location.pathname}?${newParams.toString()}`);
  };

  return (
    <div className={styles.PriceBarCont}>
      <div className={styles.title}>Filter by Price</div>
      <div className={styles.inputGroup}>
        <input
          type="number"
          placeholder="Min"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          className={styles.input}
        />
        <span className={styles.separator}>—</span>
        <input
          type="number"
          placeholder="Max"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className={styles.input}
        />
        <button onClick={updateParams} className={styles.applyBtn}>
          Apply
        </button>
      </div>
    </div>
  );
}
