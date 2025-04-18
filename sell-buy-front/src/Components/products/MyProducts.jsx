import StarRating from "./productDesc/StarsRating";
import img from "../../Images/profile.jpg";
const avatarURL = img;
export default function MyProducts({ styles }) {
  return (
    <div className={styles.products}>
      <div className={styles.productCard}>
        <div className={styles.avatarWrapper}>
          <img
            src={avatarURL}
            alt="Product Owner Avatar"
            className={styles.avatar}
          />
        </div>
        <div className={styles.productInfo}>
          <p className={styles.productName}>Name</p>
          <p className={styles.productPrice}>Price</p>
          <StarRating rating={3.5} />
          <span className={styles.edit}>Edit</span>
        </div>
      </div>
      <div className={styles.productCard}>
        <div className={styles.avatarWrapper}>
          <img
            src={avatarURL}
            alt="Product Owner Avatar"
            className={styles.avatar}
          />
        </div>
        <div className={styles.productInfo}>
          <p className={styles.productName}>Name</p>
          <p className={styles.productPrice}>Price</p>
          <StarRating rating={3.5} />
          <span className={styles.edit}>Edit</span>
        </div>
      </div>
      <div className={styles.productCard}>
        <div className={styles.avatarWrapper}>
          <img
            src={avatarURL}
            alt="Product Owner Avatar"
            className={styles.avatar}
          />
        </div>
        <div className={styles.productInfo}>
          <p className={styles.productName}>Name</p>
          <p className={styles.productPrice}>Price</p>
          <StarRating rating={3.5} />
          <span className={styles.edit}>Edit</span>
        </div>
      </div>
      <div className={styles.productCard}>
        <div className={styles.avatarWrapper}>
          <img
            src={avatarURL}
            alt="Product Owner Avatar"
            className={styles.avatar}
          />
        </div>
        <div className={styles.productInfo}>
          <p className={styles.productName}>Name</p>
          <p className={styles.productPrice}>Price</p>
          <StarRating rating={3.5} />
          <span className={styles.edit}>Edit</span>
        </div>
      </div>
      <div className={styles.productCard}>
        <div className={styles.avatarWrapper}>
          <img
            src={avatarURL}
            alt="Product Owner Avatar"
            className={styles.avatar}
          />
        </div>
        <div className={styles.productInfo}>
          <p className={styles.productName}>Name</p>
          <p className={styles.productPrice}>Price</p>
          <StarRating rating={3.5} />
          <span className={styles.edit}>Edit</span>
        </div>
      </div>
      <div className={styles.productCard}>
        <div className={styles.avatarWrapper}>
          <img
            src={avatarURL}
            alt="Product Owner Avatar"
            className={styles.avatar}
          />
        </div>
        <div className={styles.productInfo}>
          <p className={styles.productName}>Name</p>
          <p className={styles.productPrice}>Price</p>
          <StarRating rating={3.5} />
          <span className={styles.edit}>Edit</span>
        </div>
      </div>
      <div className={styles.productCard}>
        <div className={styles.avatarWrapper}>
          <img
            src={avatarURL}
            alt="Product Owner Avatar"
            className={styles.avatar}
          />
        </div>
        <div className={styles.productInfo}>
          <p className={styles.productName}>Name</p>
          <p className={styles.productPrice}>Price</p>
          <StarRating rating={3.5} />
          <span className={styles.edit}>Edit</span>
        </div>
      </div>
      <div className={styles.productCard}>
        <div className={styles.avatarWrapper}>
          <img
            src={avatarURL}
            alt="Product Owner Avatar"
            className={styles.avatar}
          />
        </div>
        <div className={styles.productInfo}>
          <p className={styles.productName}>Name</p>
          <p className={styles.productPrice}>Price</p>
          <StarRating rating={3.5} />
          <span className={styles.edit}>Edit</span>
        </div>
      </div>
      <div className={styles.productCard}>
        <div className={styles.avatarWrapper}>
          <img
            src={avatarURL}
            alt="Product Owner Avatar"
            className={styles.avatar}
          />
        </div>
        <div className={styles.productInfo}>
          <p className={styles.productName}>Name</p>
          <p className={styles.productPrice}>Price</p>
          <StarRating rating={3.5} />
          <span className={styles.edit}>Edit</span>
        </div>
      </div>
    </div>
  );
}
