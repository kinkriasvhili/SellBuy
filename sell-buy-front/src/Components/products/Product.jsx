import StarRating from "./productDesc/StarsRating";
import img from "../../Images/profile.jpg";
import styles from "./products.module.css";
import animatedStyles from "./productsAnimation.module.css";
import {
  faShoppingCart,
  faHeart as faHeartSolid,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

export default function Product({ image, name, price, scope, index }) {
  const [inFav, setInFav] = useState(false);
  const [inCart, setInCart] = useState(false);
  const location = useLocation();
  const [animated, setAnimated] = useState(true);

  useEffect(() => {
    if (location.pathname == "/") {
      setAnimated(true);
    } else {
      setAnimated(false);
    }
  }, []);

  const productURL = image ? image : img;

  return (
    <div
      className={
        !animated ? styles.productContainer : animatedStyles.productContainer
      }
      style={animated && { animationDelay: `${index * 0.1}s` }}
    >
      <div className={styles.productImageContainer}>
        <img className={styles.productImage} src={productURL} />
      </div>
      <div className={styles.productName}>
        {name.length > 25 ? `${name.slice(0, 22)}...` : name}
      </div>
      <StarRating rating={3.5} />
      <div className={styles.productPrice}>${price}</div>

      <div className={styles.productFooter}>
        {scope === "local" ? (
          <>
            <div className={styles.edit}>Edit</div>
          </>
        ) : scope === "global" ? (
          <>
            <button
              onClick={() => {
                setInCart((prev) => !prev);
              }}
              className={styles.addToCart}
            >
              <FontAwesomeIcon icon={faShoppingCart} size="1x" />
              {inCart ? (
                <span className={styles.inCart}>
                  <FontAwesomeIcon icon={faCheck} size="1.5x" />
                </span>
              ) : (
                ""
              )}
            </button>
            <button
              onClick={() => {
                setInFav((prev) => !prev);
              }}
              className={styles.favouriteBtn}
            >
              <FontAwesomeIcon
                icon={!inFav ? faHeartRegular : faHeartSolid}
                size="1x"
              />
            </button>
          </>
        ) : null}
      </div>
    </div>
  );
}
/**
 *  `
 */
