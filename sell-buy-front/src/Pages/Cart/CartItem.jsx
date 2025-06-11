import img from "../../Images/profile.jpg";
import styles from "./cart.module.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FavouriteAddDel from "../../Pages/Favorite/FavouriteAdd";
// import CartAddDel from "../../Pages/Cart/CartAddDel";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import GetProductQuery from "../../Components/products/GetProductQuery";
import { useMutation } from "@tanstack/react-query";
import { cartItemPatch } from "../../fetchData/patchData";
import CartAddDel from "./CartAddDel";

export default function CartItem({
  id,
  image,
  name,
  price,
  scope,
  slug,
  itemQuantity,
}) {
  const [quantity, setQuantity] = useState(itemQuantity);
  const [isChanging, setIsChanging] = useState(false);
  const productURL = image ? image : img;
  const patchMutation = useMutation({
    mutationKey: ["patchCartItem", id],
    mutationFn: cartItemPatch,
    onSuccess: (data) => {
      console.log("succes: ", data);
    },
    onError: (er) => {
      console.log("err: ", er);
    },
  });

  const changeQuantity = () => {
    patchMutation.mutate({ id, data: { quantity, product_id: id } });
  };
  return (
    <div className={styles.CartItem}>
      <Link to={slug ? `/product/${slug}` : "/favorites"}>
        <div className={styles.productImageContainer}>
          <img className={styles.productImage} src={productURL} />
        </div>
        <div className={styles.productName}>
          {name.length > 25 ? `${name.slice(0, 22)}...` : name}
        </div>
        <div className={styles.productPrice}>${price}</div>
      </Link>
      <div className={styles.productFooter}>
        {scope === "local" ? (
          <>
            <div className={styles.edit}>Edit</div>
          </>
        ) : scope === "global" ? (
          <>
            <div className={styles.productFooterRight}>
              {/* <CartAddDel id={id} quantity={1} slug={slug} /> */}

              <button
                onClick={() => {
                  setIsChanging(true);
                }}
                className={
                  !isChanging ? styles.quantityNum : styles.quantityNumOff
                }
              >
                {quantity}
              </button>
              <div
                className={
                  isChanging
                    ? styles.changeQuantityOn
                    : styles.changeQuantityOff
                }
              >
                <input
                  type="number"
                  min={1}
                  value={quantity}
                  className={styles.quantityInput}
                  onChange={(e) => {
                    setQuantity(e.target.value);
                  }}
                />
                <button
                  className={styles.quantityNum}
                  onClick={() => {
                    changeQuantity();
                    setIsChanging(false);
                  }}
                >
                  <FontAwesomeIcon icon={faCheck} />
                </button>
              </div>
            </div>
            <div className={styles.productFooterLeft}>
              <CartAddDel id={id} quantity={quantity} slug={slug} />
              <FavouriteAddDel id={id} />
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}
