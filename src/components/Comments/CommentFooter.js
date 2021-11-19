import React from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  handleDownvoteHelper,
  handleUpvoteHelper,
  hasDownvotedAlreadyHelper,
  hasUpvotedAlreadyHelper,
} from "../../helpers";
import Swal from "sweetalert2";
import { deleteCommentDispatcher } from "../../dispatchers/comments";

const CommentFooter = ({ comment, setReplyClicked, setToEdit }) => {
  const currentUser = useSelector((state) => state.currentUser);
  const dispatch = useDispatch();

  const hasUpvotedAlready = hasUpvotedAlreadyHelper(
    currentUser,
    comment.id,
    "commentsUpvoted"
  );
  const hasDownvotedAlready = hasDownvotedAlreadyHelper(
    currentUser,
    comment.id,
    "commentsDownvoted"
  );

  const handleCommentUpvoteClick = () => {
    handleUpvoteHelper(
      dispatch,
      currentUser,
      comment,
      hasUpvotedAlready,
      hasDownvotedAlready
    );
  };

  const handleCommentDownvoteClick = () => {
    handleDownvoteHelper(
      dispatch,
      currentUser,
      comment,
      hasUpvotedAlready,
      hasDownvotedAlready
    );
  };

  const handleDeleteComment = async () => {
    const swalObject = {
      title: "Are you sure?",
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, go back!",
      position: "center",
      icon: "warning",
      customClass: {
        confirmButton:
          "bg-theme-green text-theme-white border border-theme-green rounded-md",
        cancelButton: "bg-theme-gray, border border-theme-gray rounded-md",
      },
    };

    const result = await Swal.fire(swalObject);
    if (result.isConfirmed) {
      try {
        await deleteCommentDispatcher(
          dispatch,
          comment.post,
          comment.id,
          currentUser.token
        );
        Swal.fire({
          icon: "success",
          title: "Comment deleted Successfully!",
          showConfirmButton: false,
          timer: 2000,
        });
      } catch (err) {
        Swal.fire({
          icon: "error",
          title: err,
          showConfirmButton: false,
          timer: 2000,
        });
      }
    }
  };

  return (
    <div className="ml-6 flex items-center comment-footer justify-between">
      <div className="flex items-center">
        {/* Upvote */}
        {currentUser.username ? (
          <div
            className={`mr-2 flex items-center ${
              hasUpvotedAlready ? "text-theme-green" : ""
            } ${!comment.user && "pointer-events-none"}`}
          >
            <i
              className={`ri-rocket-2-${
                hasUpvotedAlready ? "fill" : "line"
              } cursor-pointer text-base sm:text-xl z-10`}
              onClick={handleCommentUpvoteClick}
            ></i>
            <span className="text-base sm:text-xl">{comment.upvotes}</span>
          </div>
        ) : (
          <Link to="/login" className="mr-2 flex items-center">
            <i className="ri-rocket-2-line cursor-pointer text-base sm:text-xl z-10"></i>
            <span className="text-base sm:text-xl">{comment.upvotes}</span>
          </Link>
        )}

        {/* downvote */}
        {currentUser.username ? (
          <div
            className={`mr-4 flex items-center ${
              hasDownvotedAlready ? "text-theme-red" : ""
            } ${!comment.user && "pointer-events-none"}`}
          >
            <i
              className={`ri-rocket-2-${
                hasDownvotedAlready ? "fill" : "line"
              } transform rotate-180 cursor-pointer text-base sm:text-xl z-10`}
              onClick={handleCommentDownvoteClick}
            ></i>
            <span className="text-base sm:text-xl">{comment.downvotes}</span>
          </div>
        ) : (
          <Link to="/login" className="mr-4 flex items-center">
            <i className="ri-rocket-2-line transform rotate-180 cursor-pointer text-base sm:text-xl z-10"></i>
            <span className="text-base sm:text-xl">{comment.downvotes}</span>
          </Link>
        )}

        {/* reply */}
        {currentUser.username ? (
          <div
            className={`mr-4 flex items-center cursor-pointer z-10 ${
              !comment.user && "pointer-events-none"
            }`}
            onClick={() => setReplyClicked && setReplyClicked(true)}
          >
            <i className="ri-reply-line mr-1 text-base sm:text-xl"></i>
            <span className="mr-1">reply</span>
          </div>
        ) : (
          <Link
            to="/login"
            className={`mr-4 flex items-center cursor-pointer z-10 ${
              !comment.user && "pointer-events-none"
            }`}
          >
            <i className="ri-reply-line mr-1 text-base sm:text-xl"></i>
            <span className="mr-1">reply</span>
          </Link>
        )}
      </div>

      {comment.user.id === currentUser.id && (
        <div className="flex items-center">
          <div className="flex items-center mr-5">
            <button
              onClick={() => setToEdit && setToEdit(true)}
              className="mr-3"
            >
              <i className="ri-edit-2-line cursor-pointer text-base sm:text-xl z-10 text-theme-blue"></i>
            </button>
            <button onClick={() => setToEdit && handleDeleteComment()}>
              <i className="ri-delete-bin-5-line cursor-pointer text-base sm:text-xl z-10 text-theme-red"></i>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

CommentFooter.propTypes = {
  comment: PropTypes.object.isRequired,
  setReplyClicked: PropTypes.func,
  setToEdit: PropTypes.func,
};

export default CommentFooter;
