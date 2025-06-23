import { useEffect, useState } from "react";
import styles from "./orders.module.css";
import styles2 from "./trackOrder.module.css";
import { useQuery } from "@tanstack/react-query";
import { getOrders } from "../../fetchData/getData";
import Tracking from "./Tracking";

export default function Orders() {
  const [openTrackings, setOpenTrackings] = useState({});
  const toggleTracking = (orderId) => {
    setOpenTrackings((prev) => ({
      ...prev,
      [orderId]: !prev[orderId],
    }));
  };
  const ordersQuery = useQuery({
    queryKey: ["orders"],
    queryFn: getOrders,
  });
  useEffect(() => {
    if (ordersQuery.data) {
      console.log(ordersQuery.data);
    }
  }, [ordersQuery.data]);
  if (ordersQuery.isLoading) {
    return <>...Loading</>;
  }

  if (ordersQuery.isError) {
    console.error(ordersQuery.error);
    return <>...Error</>;
  }
  const orders = ordersQuery.data;
  return (
    <div className={`mainContainer bottomNav ${styles.orderContainer}`}>
      <div className={styles.orderCount}>
        <h2>
          Orders <span>({orders.count})</span>
        </h2>
      </div>
      <div className={styles.orders}>
        {orders
          ? orders.results.map((result) => {
              const isoDate = result.expected_delivery_date;
              const d = new Date(isoDate);

              // Strip the time from both dates by using only year/month/day
              const today = new Date();
              today.setHours(0, 0, 0, 0);

              const targetDate = new Date(d);
              targetDate.setHours(0, 0, 0, 0);

              const diffMs = targetDate - today;
              const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

              const date = targetDate.toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              });
              const shipping = result.shipping_method.id;
              let orderState = "";
              if (diffDays <= 0 && shipping == 1) {
                orderState = "In Store Ready To Pick up";
              } else {
                orderState = date.toLocaleString();
              }

              return (
                <div key={result.id} className={styles.orderCard}>
                  <div className={styles.orderHeader}>
                    <p>
                      Order ID: <br /> <b>{result.id}</b>
                    </p>
                    <p>
                      Delivery Date: <br /> <b>{orderState}</b>
                    </p>
                  </div>
                  <div className={styles.orderDescribtion}>
                    {result.items.map((item, index) => (
                      <div key={index}>
                        <div className={styles.itemCard}>
                          <div className={styles.orderImg}>
                            <img
                              src={item.feature_image}
                              alt={item.product_name}
                              className={styles.productImage}
                            />
                          </div>
                          <div className={styles.orderInfo}>
                            <p style={{ fontSize: "16px", fontWeight: "bold" }}>
                              Product Name: {item.product_name}
                            </p>
                            <p>Total Amount: ${result.total_amount}</p>
                            <p>Quantity: {item.quantity}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className={styles.wrapper}>
                    <button
                      onClick={() => toggleTracking(result.id)}
                      className={styles.trackButton}
                    >
                      {openTrackings[result.id]
                        ? "Close Track Order"
                        : "Track Order"}
                    </button>

                    <div
                      className={`${styles.trackingContainer} ${
                        openTrackings[result.id] ? styles.open : ""
                      }`}
                    >
                      <Tracking
                        id={result.id}
                        shouldFetch={!!openTrackings[result.id]}
                      />
                    </div>
                  </div>
                </div>
              );
            })
          : "...loading"}
      </div>
    </div>
  );
}
