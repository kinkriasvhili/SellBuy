import { useContext, useState } from "react";
import {
  useQueryClient,
  useInfiniteQuery,
  useMutation,
} from "@tanstack/react-query";
import { getReview } from "../../fetchData/getData";
import { postReview } from "../../fetchData/postData";
import { putReview } from "../../fetchData/putData";
import { delReview } from "../../fetchData/delData";
import { UserContext } from "../../Context/UserContext";
import { AuthContext } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import styles from "./comments.module.css";
import RateByStar from "../../Components/products/productDesc/RateByStar";
import StarRating from "../../Components/products/productDesc/StarsRating";

export default function ProductComments({ slug }) {
  const [mainInput, setMainInput] = useState("");
  const [starRating, setStarRating] = useState(5.0);
  const { userState } = useContext(UserContext);
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const currentUserId = userState.id;
  const queryClient = useQueryClient();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery({
      queryKey: ["reviews", slug],
      queryFn: ({ pageParam = null }) => getReview({ slug, url: pageParam }),
      getNextPageParam: (lastPage) => lastPage.next || undefined,
    });

  const comments = data ? data.pages.flatMap((page) => page.results) : [];
  const exsistingReview = comments.find((c) => c.user.id === currentUserId);

  const reviewMutation = useMutation({
    mutationFn: ({ message, rating, slug }) =>
      postReview({ message, rating, slug }),
    onSuccess: () => {
      queryClient.invalidateQueries(["reviews", slug]); // refetch reviews
    },
  });

  const changeReview = useMutation({
    mutationFn: ({ message, rating, slug, reviewId }) =>
      putReview({ message, rating, slug, reviewId }),
    onSuccess: () => {
      queryClient.invalidateQueries(["reviews", slug]);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: ({ slug, reviewId }) => delReview({ slug, reviewId }),
    onSuccess: () => {
      queryClient.invalidateQueries(["reviews", slug]);
    },
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

  const deleteHandle = () => {
    deleteMutation.mutate({ reviewId: exsistingReview.id, slug });
  };

  if (status === "loading") return <h1>...loading</h1>;
  if (status === "error") return <h1>Error loading comments</h1>;

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
            onHover={(starIndex) => setStarRating(starIndex)}
          />
        </div>

        <button
          disabled={
            mainInput.trim() === "" ||
            reviewMutation.isPending ||
            changeReview.isPending
          }
          onClick={addComment}
        >
          {exsistingReview ? "Change" : "Add"}
        </button>
        {reviewMutation.isPending && <span>...Adding</span>}
        {changeReview.isPending && <span>...Changing</span>}
      </div>

      <div className={styles.commentBody}>
        <h4>Comment ({comments.length})</h4>
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
                  {comment.user.id === currentUserId && (
                    <span className={styles.delete} onClick={deleteHandle}>
                      Delete {deleteMutation.isPending && "...deleting"}
                    </span>
                  )}
                </div>
                <p>{comment.message}</p>
              </div>
            </div>
          </div>
        ))}

        {hasNextPage && (
          <button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
            {isFetchingNextPage ? "Loading more..." : "Load More"}
          </button>
        )}
      </div>
    </div>
  );
}
