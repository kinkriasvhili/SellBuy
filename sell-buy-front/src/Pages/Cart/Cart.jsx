import styles from "./cart.module.css";
import { useContext } from "react";
import CartAddition from "./CartSummerization";
import { CartContext } from "../../Context/CartContext";
import CartItem from "./CartItem";
export default function Cart() {
  const { cart } = useContext(CartContext);
  return (
    <div className={`mainContainer bottomNav ${styles.cartContainer}`}>
      <div className={styles.favProdContainer}>
        {cart != "...Loading" && cart ? (
          cart.items.length > 0 ? (
            cart.items.map((item) => {
              const {
                id,
                feature_image_url,
                unit_price,
                name,
                slug,
                quantity,
              } = item;
              return (
                <div key={item.id}>
                  <CartItem
                    id={id}
                    image={feature_image_url}
                    name={name}
                    price={unit_price}
                    slug={slug}
                    scope={"global"}
                    itemQuantity={quantity}
                  />
                </div>
              );
            })
          ) : (
            <p>Your cart is empty.</p>
          )
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <CartAddition price={cart ? cart.total_price : 0} />
    </div>
  );
}
