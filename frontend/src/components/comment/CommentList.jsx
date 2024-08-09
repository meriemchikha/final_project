/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import DeleteButton from "./DeleteButton";
import UpdateButton from "./UpdateButton";

export default function CommentList({
  productId,
  commentsUpdated,
  onDeleteComment,
  onUpdateComment,
}) {
  const [comments, setComments] = useState([]);

  const fetchComments = () => {
    fetch(`http://localhost:3310/api/product/${productId}/comments`)
      .then((res) => res.json())
      .then((data) => setComments(data))
      .catch((error) => console.error("Failed to fetch comments:", error));
  };

  useEffect(() => {
    fetchComments();
  }, [productId, commentsUpdated]);

  console.info(comments);

  return (
    <div>
      <h2 className="font-nunito font-light text-lg mb-2">Avis Clients</h2>
      {comments.length > 0 ? (
        comments.map((comment) => (
          <div key={comment.avisId} className="border-b border-gray-200 py-2">
            <p className="font-nunito font-bold text-md">
              {comment.avisComment}
            </p>
            {comment.firstnameUser && (
              <p className="font-nunito text-sm text-gray-500">
                Posté par {comment.firstnameUser}
              </p>
            )}
            {comment.avisDate && (
              <p className="font-nunito text-sm text-gray-500">
                Date {comment.avisDate}
              </p>
            )}
            <DeleteButton
              avisId={comment.avisId}
              firstnameUser={comment.firstnameUser}
              onDeleteComment={onDeleteComment}
            />
            <UpdateButton
              avisId={comment.avisId}
              avisComment={comment.avisComment}
              firstnameUser={comment.firstnameUser}
              onUpdateComment={onUpdateComment}
            />
          </div>
        ))
      ) : (
        <p className="font-nunito font-light text-md">
          Aucun commentaire pour ce produit.
        </p>
      )}
    </div>
  );
}
