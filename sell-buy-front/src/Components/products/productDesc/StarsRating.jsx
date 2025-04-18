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

  // Add the gradient definition to the top of your component
  const gradientDefs = (
    <svg width="0" height="0">
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: "#f1641e" }} />
          <stop offset="100%" style={{ stopColor: "#61aaff" }} />
        </linearGradient>
      </defs>
    </svg>
  );

  for (let i = 1; i <= 5; i++) {
    let icon;
    if (rating >= i) {
      icon = fasStar;
    } else if (rating >= i - 0.5) {
      icon = faStarHalfAlt;
    } else {
      icon = farStar;
    }

    stars.push(
      <FontAwesomeIcon key={i} icon={icon} className={styles.gradientStar} />
    );
  }

  return (
    <div className={styles.starsContainer}>
      {gradientDefs} {/* Inject the gradient defs */}
      {stars}
    </div>
  );
};

export default StarRating;
