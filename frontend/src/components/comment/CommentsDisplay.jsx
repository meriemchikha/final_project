/* eslint-disable react/prop-types */
import { useContext } from "react";
import { UserContext } from "../../context/userContext";
import DeleteButton from "./DeleteButton";
// import LikeButton from "../Buttons/LikeButton";
// import LogoutButtonComments from "../Logout-Button/LogoutButtonComments";

export default function CommentsDisplay({ comments, onDeleteComment }) {
  const { user } = useContext(UserContext);
  return (
    <div>
      {comments.every(
        (avis) =>
          avis.avisComment === null &&
          avis.avisId === null &&
          avis.avisDate === null &&
          avis.firstnameUser === null
      ) ? (
        <p className="font-nunito font-light text-lg mt-4">
          Aucun commentaire pour le moment
        </p>
      ) : (
        <div>
          {comments.map(({ avisId, avisDate, avisComment, firstnameUser }) => (
            <div key={avisId} className="my-2 py-1">
              <div className="flex flex-col-3 gap-2 font-nationalparkregular">
                <p className="font-victormono">{firstnameUser}</p>
                <p>le {avisDate}</p>
                {/* <LikeButton
                    commentId={commentId}
                    onRefreshLikeCounter={onRefreshLikeCounter}
                  /> */}
                <DeleteButton
                  comments={comments}
                  commentId={avisId}
                  onDeleteComment={onDeleteComment}
                  pseudoUser={firstnameUser}
                />
              </div>
              <hr className="border-black" />
              <p className="whitespace-pre-wrap my-1 font-sans text-lg">
                {avisComment}
              </p>
            </div>
          ))}
        </div>
      )}
      {user.message === "isLogged" && (
        <div className="flex flex-col-2 gap-2 mt-4">
          <p className="font-nunito font-light text-lg">
            Connecté en tant que <i>{user.user.pseudo}</i>{" "}
          </p>
          {/* <LogoutButtonComments /> */}
        </div>
      )}
    </div>
  );
}
