import styles from "./singleProduct.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart as faHeardSolid,
  faCartPlus,
  faPhone,
  faChevronRight as right,
  faChevronLeft as left,
} from "@fortawesome/free-solid-svg-icons";
import whatsApp from "../../Images/whatsapp.jpg";
import profileImg from "../../Images/profile.jpg";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import { useState, useContext, useRef } from "react";
import StarRating from "../../Components/products/productDesc/StarsRating";
import ProductComments from "./ProductComments";
import { AuthContext } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import FavouriteAddDel from "../Favorite/FavouriteAdd";
import { useHideNav } from "../../Context/HideNav";
import CartAddDel from "../cart/CartAddDel";
export default function ProductDetails({ product, slug }) {
  const [currency, setCurrency] = useState("EUR");
  const [showNumber, setShowNumber] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const { isAuthenticated } = useContext(AuthContext);
  const [isGridImgOpen, setIsGridImgOpen] = useState(false);
  const [openImage, setOpenImage] = useState(false);
  const [openFeImage, setOpenFeImage] = useState(false);

  const imageRef = useRef(null);
  const { setHide } = useHideNav();
  const navigate = useNavigate();
  const {
    name,
    description,
    price,
    category_breadcrumb,
    condition,
    images,
    seller,
    stock,
    total_reviews,
    average_rating,
  } = product;

  const toggleCurrency = () => {
    setCurrency((prev) => (prev == "EUR" ? "USD" : "EUR"));
  };
  const priceInCurrency = () => {
    const INUSD = `$${Number(price) * quantity}`;
    const INEUR = `€${
      (Math.floor(Number(price) * 1.11 * 100) / 100) * quantity
    }`;

    if (currency == "EUR") {
      return INEUR;
    } else {
      return INUSD;
    }
  };
  const capitalizeWords = (str) => {
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };
  const maskPhoneNumber = (fullNumber) => {
    const digits = fullNumber.replace("+995", "").trim();
    const parts = digits.split(" ").filter(Boolean);
    const maskedLast = parts[0].slice(0, 7) + "**";
    return maskedLast;
  };
  const showNumberFun = () => {
    setShowNumber(true);
  };
  const changeQuantity = (num, action) => {
    if (action == "add") {
      if (quantity + 1 <= stock) {
        num = quantity + 1;
      }
    } else if (action == "minus") {
      if (quantity - 1 > 0) {
        num = quantity - 1;
      }
    }
    setQuantity(Number(num));
  };
  const addToCart = () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
  };
  const handleClickOutside = (event) => {
    if (imageRef.current && !imageRef.current.contains(event.target)) {
      setOpenFeImage(false);
      setOpenImage(false);
      setIsGridImgOpen(false);
      setHide(false);
    }
  };

  return (
    <div className="bottomNav product-details">
      {(isGridImgOpen || openFeImage) && (
        <div
          className={styles.overlay}
          onClick={(e) => {
            handleClickOutside(e);
          }}
        >
          {openFeImage &&
            images
              .filter((img) => img.is_feature)
              .map((img, i) => (
                <img
                  ref={imageRef}
                  key={i}
                  className={styles.openedImg}
                  src={img.image}
                  alt="featured"
                />
              ))}
          {images
            .filter((img) => !img.is_feature)
            .map((img, i) => {
              if (openImage != `img${i}`) return null;
              return (
                <img
                  ref={imageRef}
                  key={i}
                  className={styles.openedImg}
                  src={img.image}
                  alt={`image-${i}`}
                />
              );
            })}
        </div>
      )}

      <section className={styles.header}>
        <h1 className={styles.title}>{capitalizeWords(name)}</h1>
      </section>
      <section className={styles.adds}>
        <div
          onClick={addToCart}
          className={!isAuthenticated ? styles.logCart : ""}
        >
          Cart
          <CartAddDel id={product.id} slug={product} quantity={quantity} />
        </div>
        <div className={!isAuthenticated ? styles.logFav : ""}>
          Favourite
          <FavouriteAddDel id={product.id} />
        </div>
      </section>
      <section className={styles.mainDescribtion}>
        <div className={styles.images}>
          {/* Featured image on the left */}
          <div className={styles.featuredImage}>
            {images
              .filter((img) => img.is_feature)
              .map((img, i) => (
                <img
                  onClick={() => {
                    setOpenImage(false);
                    setIsGridImgOpen(false);
                    setOpenFeImage(true);
                    setHide(true);
                  }}
                  className={`${styles.imgF} ${
                    openFeImage ? styles.openedImg : ""
                  }`}
                  key={i}
                  src={img.image}
                  alt="featured"
                />
              ))}
          </div>
          {/* 2x2 grid for other images */}
          <div className={styles.imageGrid}>
            {images
              .filter((img) => !img.is_feature)
              .map((img, i) => (
                <div
                  onClick={() => {
                    setOpenFeImage(false);
                    setHide(true);
                    setOpenImage(`img${i}`);
                    setIsGridImgOpen(true);
                  }}
                  className={styles.imgCont}
                  key={i}
                >
                  <img
                    className={`${styles[`img${i}`]} ${
                      openImage ? styles.openedImg : ""
                    }`}
                    src={img.image}
                    alt={`image-${i}`}
                  />
                </div>
              ))}
          </div>
        </div>

        <div className={styles.textInfoCont}>
          <div className={styles.textInfo}>
            <div className={styles.price}>
              <div>
                <strong>{priceInCurrency()}</strong>
              </div>
              <div className={styles.toggleWrapper} onClick={toggleCurrency}>
                <div
                  className={`${styles.circle} ${
                    currency == "EUR" ? styles.left : styles.right
                  }`}
                ></div>
                <div
                  className={`${
                    currency == "EUR" ? styles.active : styles.inactive
                  } ${styles.eur}`}
                >
                  <>€</>
                </div>
                <div
                  className={`${
                    currency == "USD" ? styles.active : styles.inactive
                  } ${styles.usd}`}
                >
                  <>$</>
                </div>
              </div>
            </div>

            <div className={styles.quantityContainer}>
              <div className={styles.quantity}>
                <div
                  className={styles.cher}
                  onClick={() => {
                    changeQuantity(quantity, "minus");
                  }}
                >
                  <FontAwesomeIcon icon={left} />
                </div>
                {stock != 0 ? (
                  <input
                    value={quantity}
                    type="number"
                    min={1}
                    max={stock}
                    onChange={(e) => {
                      changeQuantity(e.target.value);
                    }}
                  />
                ) : (
                  <span style={{ color: "red" }}>not in the stock</span>
                )}

                <div
                  className={styles.cher}
                  onClick={() => {
                    changeQuantity(quantity, "add");
                  }}
                >
                  <FontAwesomeIcon icon={right} />
                </div>
              </div>
              <div>
                <span>
                  Stock: <b>{stock}</b>
                </span>
              </div>
            </div>

            <div className={styles.numCont}>
              <div className={styles.numBtn} onClick={showNumberFun}>
                <div
                  className={`${
                    showNumber ? styles.numNoActive : styles.numActive
                  } ${styles.hidden}`}
                >
                  <div>
                    <FontAwesomeIcon icon={faPhone} />
                    {maskPhoneNumber(seller.phone_number)}
                  </div>

                  <div>{showNumber ? "" : "show Number"}</div>
                </div>

                <div
                  className={`${
                    showNumber ? styles.numActiveShow : styles.numNoActiveShow
                  } ${styles.noHidden}`}
                >
                  <span>{seller.phone_number}</span>
                  <a
                    href={`https://wa.me/${seller.phone_number}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ display: "flex", gap: "5px" }}
                  >
                    <span>WhatsApp</span>
                    <img className={styles.whatsApp} src={whatsApp} alt="" />
                  </a>
                </div>
              </div>
            </div>
            <div className={styles.seller}>
              <div className={styles.sellerImg}>
                <img src={profileImg} alt="" />
              </div>
              <div className={styles.sellerInfo}>
                <p>{seller.full_username}</p>
                <p>
                  <span>{seller.city}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className={styles.details}>
        <div className={styles.rating}>
          <StarRating rating={average_rating} />
          <span>{total_reviews}</span>
        </div>
        <div className={styles.condition}>
          <p>
            Condition <b>{condition}</b>
          </p>
        </div>
        <div className={styles.category}>
          <p>
            Category: <b>{category_breadcrumb}</b>
          </p>
        </div>
      </section>
      <section className={styles.description}>
        <strong>Product Description:</strong> {description}
      </section>
      <section>
        <ProductComments slug={slug} average_rating={average_rating} />
      </section>
    </div>
  );
}
