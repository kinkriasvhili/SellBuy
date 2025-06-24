import styles from "./condition.module.css";

import { useContext, useState } from "react";
import { ProductContext } from "../../Context/ProductContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faX } from "@fortawesome/free-solid-svg-icons";
export default function Condition() {
  const [isOn, setIsOn] = useState(false);
  const { categQueries } = useContext(ProductContext);
  if (categQueries.isLoading) {
    return <h1>...Loading</h1>;
  }
  if (categQueries.isError) {
    console.log(categQueries.error);
  }

  const categories = categQueries.data;

  const handleClick = () => {
    setIsOn((prev) => !prev);
  };

  const icon = () => {
    if (isOn) {
      return faX;
    } else {
      return faBars;
    }
  };

  const conditions = ["new", "used", "Refurbished"];
  return (
    <>
      <div className={styles.categories}>
        <div
          className={`${styles.category} ${styles.btnContainer}`}
          onClick={handleClick}
        >
          Conditions
          <button
            className={`${styles.icon} ${isOn ? styles.rotate : ""}`}
            onClick={() => setIsOn(!isOn)}
          >
            <FontAwesomeIcon icon={icon()} size="1x" />
          </button>
        </div>

        <div className={`${styles.list} ${isOn ? styles.listActive : ""}`}>
          {conditions.map((name) => (
            <div key={name}>
              <div className={styles.category}>
                <p className={styles.icon} onClick={() => setIsOn(false)}>
                  {name}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
