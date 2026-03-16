import { useState } from "react";
import styles from "./pass.module.css";

const Pass = () => {
  const [isOpen, setIsOpen] = useState(true);

  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={() => setIsOpen(false)}>
          ✕
        </button>
        <h2>Hello!</h2>
        <p>
          The backend have troubles to sent email verification code on Gmail
          account <br /> Please log in with already exsisted profile to check
          website
        </p>
        <p>
          gmail: <b>giguuag@gmail.com</b>{" "}
        </p>
        <p>
          password: <b>giorgi123</b>{" "}
        </p>
      </div>
    </div>
  );
};

export default Pass;
