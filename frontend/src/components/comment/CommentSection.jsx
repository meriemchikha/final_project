/* eslint-disable react/prop-types */
import { useState } from "react";
import Comment from "./Comment";
import CommentList from "./CommentList";

export default function CommentSection({ productId }) {
  const [commentsUpdated, setCommentsUpdated] = useState(false);

  const handleCommentPosted = () => {
    setCommentsUpdated((prev) => !prev); // Permet de déclencher le rafraîchissement des commentaires
  };
  const handleCommentDeleted = () => {
    setCommentsUpdated((prev) => !prev); // Permet de déclencher le rafraîchissement des commentaires
  };
  const handleCommentUpdated = () => {
    setCommentsUpdated((prev) => !prev); // Permet de déclencher le rafraîchissement des commentaires
  };

  return (
    <div>
      <Comment productId={productId} onCommentPosted={handleCommentPosted} />
      <CommentList
        productId={productId}
        commentsUpdated={commentsUpdated}
        onDeleteComment={handleCommentDeleted}
        onUpdateComment={handleCommentUpdated}
      />
    </div>
  );
}
