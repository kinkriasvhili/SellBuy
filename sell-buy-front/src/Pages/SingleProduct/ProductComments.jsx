import { useEffect, useState, useContext } from "react";
import profileImg from "../../Images/profile.jpg";
import styles from "./comments.module.css";
import RateByStar from "../../Components/products/productDesc/RateByStar";
import { postReview } from "../../fetchData/postData";
import { useMutation } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { getReview } from "../../fetchData/getData";
import StarRating from "../../Components/products/productDesc/StarsRating";
import { putReview } from "../../fetchData/putData";
import { UserContext } from "../../Context/UserContext";
import { delReview } from "../../fetchData/delData";
export default function ProductComments({ slug }) {
  const [comments, setComments] = useState([]);
  const [mainInput, setMainInput] = useState("");
  const [starRating, setStarRating] = useState(5.0);
  const { userState } = useContext(UserContext);
  const currentUserId = userState.id;
  const exsistingReview = comments.find((comment) => {
    return comment.user.id == currentUserId;
  });
  const addComment = () => {
    if (mainInput.trim() === "") return;
    const rating = Number(starRating).toFixed(2);
    const message = mainInput;

    if (exsistingReview) {
      changeReview.mutate({
        message,
        rating,
        slug,
        reviewId: exsistingReview.id,
      });
    } else {
      reviewMutation.mutate({ message, rating, slug });
    }
    setMainInput("");
  };
  const reviewQuery = useQuery({
    queryKey: ["reviewGet", slug],
    queryFn: () => {
      return getReview({ slug });
    },
  });
  useEffect(() => {
    if (reviewQuery.isSuccess && reviewQuery.data?.results) {
      setComments(reviewQuery.data.results);
    }
  }, [reviewQuery.data]);
  const reviewMutation = useMutation({
    mutationKey: ["reviewPost", slug],
    mutationFn: (sendData) => {
      const { message, rating, slug } = sendData;
      return postReview({ message, rating, slug });
    },
    onSuccess: () => {
      reviewQuery.refetch();
    },
    onError: (error) => {
      console.log(error);
    },
  });
  const changeReview = useMutation({
    mutationKey: ["reviewPut", slug],
    mutationFn: (sendData) => {
      const { message, rating, slug, reviewId } = sendData;
      return putReview({ message, rating, slug, reviewId });
    },
    onSuccess: () => {
      reviewQuery.refetch();
    },
    onError: (error) => {
      console.log(error);
    },
  });
  const deleteMutation = useMutation({
    mutationKey: ["reviewDel", slug],
    mutationFn: (sendData) => {
      const { slug, reviewId } = sendData;
      return delReview({ slug, reviewId });
    },
    onSuccess: () => {
      reviewQuery.refetch();
    },
    onError: (error) => {
      console.log(error);
    },
  });
  const handleRating = () => {};
  const deleteHandle = () => {
    deleteMutation.mutate({
      reviewId: exsistingReview.id,
      slug,
    });
  };

  return (
    <div className={styles.taskCommentContainer}>
      <div className={styles.writeComment}>
        <textarea
          onChange={(e) => setMainInput(e.target.value)}
          value={mainInput}
          placeholder={exsistingReview ? "Change Review..." : "Add Review..."}
          rows={4}
        />
        <div className={styles.ratingCont}>
          <RateByStar
            rating={starRating}
            onHover={(starIndex) => {
              setStarRating(starIndex);
            }}
            handleRating={handleRating}
          />
        </div>

        <button
          disabled={reviewMutation.isPending || changeReview.isPending}
          className={
            reviewMutation.isPending || changeReview.isPending
              ? "disabledBtn"
              : ""
          }
          onClick={addComment}
        >
          {exsistingReview ? "Change" : "Add"}
        </button>
        {reviewMutation.isPending ? <span>...Adding</span> : ""}
        {changeReview.isPending ? <span>...Changing</span> : ""}
      </div>

      <div className={styles.commentBody}>
        {!reviewQuery.isLoading ? (
          <>
            <h4>Comment ({reviewQuery.data.count})</h4>
            {comments.map((comment) => (
              <div key={comment.id} className={styles.comment}>
                <div className={styles.parentComment}>
                  <div className={styles.commentImg}>
                    <img
                      src={comment.user.avatar}
                      alt="Avatar"
                      width="40"
                      height="40"
                    />
                  </div>
                  <div className={styles.commentInfo}>
                    <div className={styles.commentHeader}>
                      <p>{comment.user.full_username}</p>
                      <StarRating rating={comment.rating} />
                      {comment.user.id == currentUserId ? (
                        <span className={styles.delete} onClick={deleteHandle}>
                          Delete
                          {deleteMutation.isPending ? "...deleting" : ""}
                        </span>
                      ) : (
                        ""
                      )}
                    </div>
                    <p>{comment.message}</p>
                  </div>
                </div>
              </div>
            ))}
          </>
        ) : (
          <h1>...loading</h1>
        )}
      </div>
    </div>
  );
}
