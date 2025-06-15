import { useState, useEffect } from "react";
import styles from "./cart.module.css";
import MakeOrders from "../Orders/MakeOrders";
export default function CartAddition({ price }) {
  const TAX_CENTS = 499; // $4.99
  const [selectedOptionId, setSelectedOptionId] = useState("1");
  console.log(price);
  const deliveryOptions = [
    {
      id: "1",
      deliveryDays: 7,
      option: "Regional Delivery",
      priceCents: 499,
    },
    {
      id: "2",
      deliveryDays: 3,
      option: "City Delivery",
      priceCents: 499,
    },
    {
      id: "3",
      deliveryDays: 0,
      option: "In-Store Pickup",
      priceCents: 0,
    },
  ];

  const selectedOption = deliveryOptions.find(
    (option) => option.id === selectedOptionId
  );

  const estimatedDate = new Date();
  estimatedDate.setDate(estimatedDate.getDate() + selectedOption.deliveryDays);
  const deliveryDateString =
    selectedOption.deliveryDays > 0
      ? estimatedDate.toLocaleDateString()
      : "Available Today";

  const formatCents = (cents) => `$${(cents / 100).toFixed(2)}`;

  const totalPriceCents = price * 100 + TAX_CENTS + selectedOption.priceCents;

  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className={styles.cartSummaryContainer}>
      <h2 className={styles.heading}>Cart Summary</h2>

      <div className={styles.section}>
        <strong>Items Total:</strong> {formatCents(price * 100)}
      </div>
      <div className={styles.section}>
        <strong>Tax:</strong> {formatCents(TAX_CENTS)}
      </div>

      <div className={styles.section}>
        <strong>Choose a Delivery Option:</strong>
        {deliveryOptions.map((option) => {
          const estimatedDate = new Date();
          estimatedDate.setDate(estimatedDate.getDate() + option.deliveryDays);
          const dateString =
            option.deliveryDays > 0
              ? `${
                  option.deliveryDays
                } day(s) — ${estimatedDate.toLocaleDateString()}`
              : "Available Today";

          return (
            <label key={option.id} className={styles.deliveryOption}>
              <input
                type="radio"
                name="delivery"
                value={option.id}
                checked={selectedOptionId === option.id}
                onChange={() => setSelectedOptionId(option.id)}
                className={styles.deliveryOptionInput}
              />
              <div className={styles.optionDetails}>
                <div className={styles.optionTitle}>{option.option}</div>
                <div>Estimated Delivery: {dateString}</div>
                <div>Shipping: {formatCents(option.priceCents)}</div>
              </div>
            </label>
          );
        })}
      </div>

      <div className={styles.total}>
        <strong>Total: </strong>
        {!price ? price : formatCents(totalPriceCents)}
      </div>

      <button
        disabled={price === 0}
        className={`${styles.orderButton} ${price === 0 ? "disabledBtn" : ""}`}
        onClick={() => setIsModalOpen(true)}
      >
        <span>Place Your Order</span>
      </button>

      <MakeOrders
        shipping_method={selectedOptionId}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
