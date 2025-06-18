// MakeOrders.jsx
import { useEffect, useRef, useState } from "react";
import styles from "./makeOrders.module.css";
import { postOrders } from "../../fetchData/postData";
import { useMutation } from "@tanstack/react-query";

export default function MakeOrders({ shipping_method, isOpen, onClose }) {
  const modalRef = useRef(null);
  const [formData, setFormData] = useState({
    street: "",
    city: "",
    region: "",
    postal_code: "",
  });

  const isFormValid = Object.values(formData).every((val) => val.length >= 4);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const postOrderMutation = useMutation({
    mutationKey: ["order", formData],
    mutationFn: postOrders,
    onSuccess: (data) => {
      alert("Your order has been placed");
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const handleSubmit = () => {
    if (!isFormValid) return;

    const data = {
      shipping_method,
      address: formData,
    };

    postOrderMutation.mutate(data);
    onClose();
  };

  const handleOverlayClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={styles.modal} ref={modalRef}>
        <h2 className={styles.title}>Enter Shipping Info</h2>
        <input
          name="street"
          placeholder="Street"
          className={styles.input}
          value={formData.street}
          onChange={handleChange}
        />
        <input
          name="city"
          placeholder="City"
          className={styles.input}
          value={formData.city}
          onChange={handleChange}
        />
        <input
          name="region"
          placeholder="Region"
          className={styles.input}
          value={formData.region}
          onChange={handleChange}
        />
        <input
          name="postal_code"
          placeholder="Postal Code"
          className={styles.input}
          value={formData.postal_code}
          onChange={handleChange}
        />
        <div className={styles.buttonRow}>
          <button
            className={styles.submitButton}
            disabled={!isFormValid}
            onClick={handleSubmit}
          >
            Make Order
          </button>
          <button className={styles.closeButton} onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
