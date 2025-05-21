import { useEffect, useState } from "react";
import styles from "./profile.module.css";

export default function ControlText({ changingValue }) {
  const [text, setText] = useState("");
  useEffect(() => {
    switch (changingValue) {
      case "email":
        setText("*End With @gmail.com");
        break;
      case "avatar":
        setText("*Upload only one image");
        break;
      case "phone_number":
        setText("*Must be georgian number (9955...)");
        break;
      case "city":
        setText("*Choose city where you live; Minimum 4 letter");
        break;
      case "full_username":
        setText("*Minimum 4 letter");
        break;
    }
  }, [changingValue]);

  return <span className={styles.controlingText}>{text}</span>;
}
