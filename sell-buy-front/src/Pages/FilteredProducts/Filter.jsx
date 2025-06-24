import Categories from "./Categories";
import Condition from "./Condition";
import PriceBar from "./PriceBar";
import styles from "./filter.module.css";
export default function Filter() {
  return (
    <div className={styles.filterContainer}>
      <Categories />
      <Condition />
      <PriceBar />
    </div>
  );
}
