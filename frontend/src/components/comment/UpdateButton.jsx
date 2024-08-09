/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
import { useState, useContext } from "react";
import { ImPencil } from "react-icons/im";
import { UserContext } from "../../context/userContext";

export default function UpdateButton({
  avisId,
  avisComment,
  firstnameUser,
  onUpdateComment,
}) {
  const { user, token } = useContext(UserContext);
  const [isEditing, setIsEditing] = useState(false);
  const [newComment, setNewComment] = useState(avisComment);
  const [spaceError, setSpaceError] = useState("");

  const handleClick = (e) => {
    e.preventDefault();
    setIsEditing(true);
  };

  const handleChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const trimmedComment = newComment.trim();

    if (trimmedComment === "") {
      setSpaceError(
        "Le commentaire ne peut pas être vide ou contenir seulement des espaces."
      );
      return;
    }

    fetch(`http://localhost:3310/api/comment/${avisId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ comment: trimmedComment }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.info("res", res);
        setIsEditing(false);
        onUpdateComment();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  console.info(avisId);
  return firstnameUser === user?.user?.firstname ? (
    isEditing ? (
      <form onSubmit={handleUpdate}>
        <textarea
          value={newComment}
          onChange={handleChange}
          className="border border-black w-full focus:outline-none"
          minLength={3}
          maxLength={500}
          required
        />
        {spaceError && <p className="text-red-600">{spaceError}</p>}
        <button
          type="submit"
          className="bg-black text-white border border-black py-1 px-3 rounded"
        >
          Mettre à jour
        </button>
        <button
          type="button"
          className="ml-2"
          onClick={() => setIsEditing(false)}
        >
          Annuler
        </button>
      </form>
    ) : (
      <button label="pencil button" type="button" onClick={handleClick}>
        <ImPencil />
      </button>
    )
  ) : null;
}
