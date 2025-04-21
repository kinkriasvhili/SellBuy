import StarRating from "./productDesc/StarsRating";
import img from "../../Images/profile.jpg";
import styles from "./products.module.css";
import {
  faShoppingCart,
  faHeart as faHeartSolid,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export default function Product({ image, name, price, scope }) {
  const [inFav, setInFav] = useState(false);
  const [inCart, setInCart] = useState(false);
  const productURL = image ? image : img;

  return (
    <div className={styles.productContainer}>
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
