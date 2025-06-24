import { useState } from "react";
import styles from "./pricebar.module.css";

export default function PriceBar() {
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const handleMinChange = (e) => {
    const value = e.target.value;
    setMinPrice(value);
    // onChange({ min_price: value, max_price: maxPrice });
  };

  const handleMaxChange = (e) => {
    const value = e.target.value;
    setMaxPrice(value);
    // onChange({ min_price: minPrice, max_price: value });
  };

  return (
    <div className={styles.PriceBarCont}>
      <div className={styles.title}>Filter by Price</div>
      <div className={styles.inputGroup}>
        <input
          type="number"
          placeholder="Min"
          value={minPrice}
          onChange={handleMinChange}
          className={styles.input}
        />
        <span className={styles.separator}>—</span>
        <input
          type="number"
          placeholder="Max"
          value={maxPrice}
          onChange={handleMaxChange}
          className={styles.input}
        />
      </div>
    </div>
  );
}
