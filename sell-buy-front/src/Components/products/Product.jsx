import StarRating from "./productDesc/StarsRating";
import img from "../../Images/profile.jpg";
import styles from "./products.module.css";
import animatedStyles from "./productsAnimation.module.css";

import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import FavouriteAddDel from "../../Pages/Favorite/FavouriteAdd";
import CartAddDel from "../../Pages/Cart/CartAddDel";

export default function Product({
  id,
  image,
  name,
  price,
  scope,
  index,
  slug,
  rating,
}) {
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
      style={
        location.pathname == "/"
          ? animated && { animationDelay: `${index * 0.1}s` }
          : {}
      }
    >
      <Link to={slug ? `/product/${slug}` : "/favorites"}>
        <div className={styles.productImageContainer}>
          <img className={styles.productImage} src={productURL} />
        </div>
        <div className={styles.productName}>
          {name.length > 25 ? `${name.slice(0, 22)}...` : name}
        </div>
        {rating && <StarRating rating={rating} />}
        <div className={styles.productPrice}>${price}</div>
      </Link>
      <div className={styles.productFooter}>
        {scope === "local" ? (
          <>
            <div className={styles.edit}>Edit</div>
          </>
        ) : scope === "global" ? (
          <>
            <CartAddDel id={id} quantity={1} slug={slug} />
            <FavouriteAddDel id={id} />
          </>
        ) : null}
      </div>
    </div>
  );
}
/**
 *  `
 */
