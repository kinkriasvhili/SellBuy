import { useQuery } from "@tanstack/react-query";
import { getSingleOrder } from "../../fetchData/getData";
import { useEffect } from "react";
import styles from "./trackOrder.module.css"; // create this CSS file

export default function Tracking({ id, shouldFetch }) {
  const { data, isLoading, isError, refetch, isFetched } = useQuery({
    queryKey: ["orders", id],
    queryFn: () => getSingleOrder(id),
    enabled: false,
  });

  useEffect(() => {
    if (shouldFetch) {
      refetch();
    }
  }, [shouldFetch, refetch]);

  if (!shouldFetch) return null;
  if (isLoading && !isFetched) return <h1>Loading...</h1>;
  if (isError) return <h1>Error loading order</h1>;
  if (!data) return;
  const { milestones, progress } = data;
  return (
    <div className={styles.trackingBox}>
      <div className={styles.milestones}>
        {milestones.map((milestone, index) => (
          <div className={styles.milestone} key={index}>
            <span className={styles.dot} />
            <span className={styles.label}>{milestone.name}</span>
            <span className={styles.time}>
              {new Date(milestone.time).toLocaleString()}
            </span>
          </div>
        ))}
      </div>
      <div className={styles.progressBar}>
        <div
          className={styles.progressFill}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
