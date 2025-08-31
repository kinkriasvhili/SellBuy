import { useContext } from "react";
import { FavoriteContext } from "../../Context/FavoriteContext";
import styles from "./favourite.module.css";
import Product from "../../Components/products/Product";
export default function Favorite() {
  const { favorites } = useContext(FavoriteContext);
  return (
    <div className={`mainContainer bottomNav ${styles.container}`}>
      <div className={styles.favProdContainer}>
        {favorites.items.map((item, index) => {
          const { id, feature_image, price, name } = item.product;
          return (
            <div key={item.id}>
              <Product
                id={id}
                index={index}
                image={feature_image}
                name={name}
                price={price}
                scope={"global"}
              />
            </div>
          );
        })}
        {!favorites.item && (
          <div className={styles.favNone}>No products in favorites</div>
        )}
      </div>
    </div>
  );
}
