import styles from "./condition.module.css";
import { useSearchParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faX } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
export default function Condition() {
  const navigate = useNavigate();
  const location = useLocation();

  const [isOn, setIsOn] = useState(false);
  const conditions = ["new", "used", "Refurbished"];
  const [searchParams, setSearchParams] = useSearchParams();
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

  const updateParams = (name) => {
    const newParams = new URLSearchParams(searchParams); // keep old ones

    if (name) newParams.set("condition", name);
    else newParams.delete("condition");

    setSearchParams(newParams);
    navigate(`${location.pathname}?${newParams.toString()}`);
  };

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
          {console.log(conditions)}
          {conditions.map((name) => (
            <div key={name}>
              {/* <Link to={`/products?condition=${name}`}> */}
              <div
                onClick={() => {
                  updateParams(name);
                }}
                className={styles.category}
              >
                <p className={styles.icon} onClick={() => setIsOn(false)}>
                  {name}
                </p>
              </div>
              {/* </Link> */}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
