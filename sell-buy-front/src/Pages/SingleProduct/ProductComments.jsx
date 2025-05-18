import { useEffect, useState, useContext } from "react";
const URL = "https://buy-sell-ecommerce.onrender.com";
import styles from "./comments.module.css";
import RateByStar from "../../Components/products/productDesc/RateByStar";
import { postReview } from "../../fetchData/postData";
import { useMutation } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { getReview } from "../../fetchData/getData";
import StarRating from "../../Components/products/productDesc/StarsRating";
import { putReview } from "../../fetchData/putData";
import { UserContext } from "../../Context/UserContext";
import { AuthContext } from "../../Context/AuthContext";
import { delReview } from "../../fetchData/delData";
import { useNavigate } from "react-router-dom";
export default function ProductComments({ slug }) {
  const [comments, setComments] = useState([]);
  const [mainInput, setMainInput] = useState("");
  const [starRating, setStarRating] = useState(5.0);
  const [btnDisabled, setBtnDisabled] = useState(true);
  const { userState } = useContext(UserContext);
  const { isAuthenticated } = useContext(AuthContext);
  const [nextPageUrl, setNextPageUrl] = useState(null);
  const navigate = useNavigate();
  const currentUserId = userState.id;
  const exsistingReview = comments.find((comment) => {
    return comment.user.id == currentUserId;
  });

  const addComment = () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
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

  const reviewMutation = useMutation({
    mutationKey: ["reviewPost", slug],
    mutationFn: (sendData) => {
      const { message, rating, slug } = sendData;
      return postReview({ message, rating, slug });
    },
    onSuccess: () => {
      fetchInitialReviews(); // Refetch and reset state after add/edit/delete
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
      fetchInitialReviews(); // Refetch and reset state after add/edit/delete
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
      fetchInitialReviews(); // Refetch and reset state after add/edit/delete
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
  useEffect(() => {
    const fetchInitialReviews = async () => {
      try {
        const data = await getReview({ slug, url: nextPageUrl });
        setComments(data.results);
        setNextPageUrl(data.next);
      } catch (err) {
        console.error(err);
      }
    };
    fetchInitialReviews();
  }, [slug]);
  const loadMoreReviews = async () => {
    if (!nextPageUrl) return;

    try {
      const data = await getReview({ slug, url: nextPageUrl });
      setComments((prev) => [...prev, ...data.results]);
      setNextPageUrl(data.next);
    } catch (err) {
      console.error("Failed to load more reviews", err);
    }
  };
  useEffect(() => {
    if (
      mainInput.trim() == "" ||
      reviewMutation.isPending ||
      changeReview.isPending
    ) {
      setBtnDisabled(true);
    } else {
      setBtnDisabled(false);
    }
  }, [mainInput, reviewMutation, changeReview]);
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
          disabled={btnDisabled}
          className={btnDisabled ? "disabledBtn" : ""}
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
            {nextPageUrl && (
              <button onClick={loadMoreReviews} className={styles.loadMoreBtn}>
                Load More
              </button>
            )}
          </>
        ) : (
          <h1>...loading</h1>
        )}
      </div>
    </div>
  );
}
