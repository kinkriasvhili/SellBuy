import { useState } from "react";
import profileImg from "../../Images/profile.jpg";
import styles from "./comments.module.css";

export default function ProductComments({ task }) {
  const [comments, setComments] = useState([]);
  const [mainInput, setMainInput] = useState(
    "my name is rati kinkriashvili hello everyone hello hello helloo lhello dajkdnkas dkasjd asmdfasjk fas,f ask fas,fsa asfasfas"
  );

  const addComment = () => {
    if (mainInput.trim() === "") return;

    const newComment = {
      id: Date.now(),
      author_nickname: "You",
      author_avatar: profileImg,
      text: mainInput,
      showReplyInput: false,
    };

    setComments((prev) => [...prev, newComment]);
    setMainInput("");
  };

  return (
    <div className={styles.taskCommentContainer}>
      <div className={styles.writeComment}>
        <textarea
          onChange={(e) => setMainInput(e.target.value)}
          value={mainInput}
          placeholder="Write a comment..."
          rows={4}
        />
        <button onClick={addComment}>Comment</button>
      </div>

      <div className={styles.commentBody}>
        <h4>Comment ({comments.length})</h4>
        {comments.map((comment) => (
          <div key={comment.id} className={styles.comment}>
            <div className={styles.parentComment}>
              <div className={styles.commentImg}>
                <img
                  src={comment.author_avatar}
                  alt="Avatar"
                  width="40"
                  height="40"
                />
              </div>
              <div className={styles.commentInfo}>
                <p>{comment.author_nickname}</p>
                <p>{comment.text}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
