import Categories from "./Categories";
import Condition from "./Condition";
import PriceBar from "./PriceBar";
import styles from "./filter.module.css";
import { useState } from "react";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Filter() {
  const [openFilter, setOpenFilter] = useState(false);

  return (
    <div className={styles.filterContainer}>
      <button
        className={styles.filterBtn}
        onClick={() => setOpenFilter((prev) => !prev)}
      >
        <span>{openFilter ? "Close" : "Filter"}</span>
        <span>
          {openFilter ? (
            <FontAwesomeIcon icon={faChevronUp} />
          ) : (
            <FontAwesomeIcon icon={faChevronDown} />
          )}
        </span>
      </button>

      <div
        className={`${styles.filterContent} ${openFilter ? styles.open : ""}`}
      >
        <PriceBar />
        <Condition />
        <Categories />
      </div>
    </div>
  );
}
