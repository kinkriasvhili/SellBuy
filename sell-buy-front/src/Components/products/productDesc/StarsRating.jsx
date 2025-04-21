import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar as fasStar,
  faStarHalfAlt,
} from "@fortawesome/free-solid-svg-icons";
import { faStar as farStar } from "@fortawesome/free-regular-svg-icons";
import styles from "./productDesc.module.css";
const StarRating = ({ rating }) => {
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    let icon;
    if (rating >= i) {
      icon = fasStar;
    } else if (rating >= i - 0.5) {
      icon = faStarHalfAlt;
    } else {
      icon = farStar;
    }

    stars.push(<FontAwesomeIcon key={i} icon={icon} />);
  }

  return <div className={styles.stars}>{stars}</div>;
};

export default StarRating;
