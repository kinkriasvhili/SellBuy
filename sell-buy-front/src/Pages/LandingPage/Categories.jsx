import { useContext, useState } from "react";
import { ProductContext } from "../../Context/ProductContext";
import styles from "./categories.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faX } from "@fortawesome/free-solid-svg-icons";
// import {FontAwe}
export default function Categories() {
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
  return (
    <>
      <div className={styles.categories}>
        <div
          className={`${styles.category} ${styles.btnContainer}`}
          onClick={handleClick}
        >
          Categories
          <button
            className={`${styles.icon} ${isOn ? styles.rotate : ""}`}
            onClick={() => setIsOn(!isOn)}
          >
            <FontAwesomeIcon icon={icon()} size="1x" />
          </button>
        </div>

        <div className={`${styles.list} ${isOn ? styles.listActive : ""}`}>
          {categories.map(({ name, id }) => (
            <div key={id} className={styles.category}>
              <p className={styles.icon} onClick={() => setIsOn(false)}>
                {name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
