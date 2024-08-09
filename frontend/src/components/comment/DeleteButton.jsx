/* eslint-disable react/prop-types */
import { useContext } from "react";
import { ImBin } from "react-icons/im";
import { UserContext } from "../../context/userContext";

export default function DeleteButton({
  avisId,
  onDeleteComment,
  firstnameUser,
}) {
  const { user, token } = useContext(UserContext);

  const handleClick = (e) => {
    e.preventDefault();

    if (user?.user?.firstname !== firstnameUser) {
      console.warn("You are not allowed to delete this comment.");
      return;
    }

    fetch(`http://localhost:3310/api/comment/${avisId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.info("res", res);
        onDeleteComment(); // Notifier le parent que le commentaire a été supprimé
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  console.info(avisId);
  return firstnameUser === user?.user?.firstname ? (
    <button label="bin button" type="button" onClick={handleClick}>
      <ImBin />
    </button>
  ) : null;
}
