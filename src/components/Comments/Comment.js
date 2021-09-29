import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { Link } from "react-router-dom";
import DOMPurify from "dompurify";
import { handleCommentUpvoteHelper } from "../../helpers";
import { useDispatch } from "react-redux";

const Comment = ({ comment, currentUser }) => {
  const dispatch = useDispatch();

  const hasUpvotedAlready =
    currentUser.commentsUpvoted &&
    currentUser.commentsUpvoted.find(
      (commentId) => commentId.toString() === comment.id
    );
  const hasDownvotedAlready =
    currentUser.commentsDownvoted &&
    currentUser.commentsDownvoted.find(
      (commentId) => commentId.toString() === comment.id
    );

  const handleCommentUpvoteClick = () => {
    handleCommentUpvoteHelper(
      dispatch,
      currentUser,
      comment.post,
      comment,
      hasUpvotedAlready,
      hasDownvotedAlready
    );
  };

  const handleCommentDownvoteClick = () => {};

  return (
    <div className="flex flex-col mb-5 comment">
      <div className="flex items-center text-sm text-theme-gray mb-2 comment-header">
        <span className="w-5 h-5 mr-2 bg-theme-black rounded-full"></span>
        <Link
          to={`/user/${comment.user.username}`}
          className="mr-2 underline comment-user"
        >
          {comment.user.username}
        </Link>
        <span className="comment-time">
          {moment(comment.createdAt).fromNow()}
        </span>
      </div>
      <div
        className="mb-2 pl-6 text-md comment-body"
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(comment.content),
        }}
      ></div>
      <div className="ml-6 flex items-center comment-footer">
        {/* Upvote */}
        {currentUser.username ? (
          <div
            className={`mr-2 flex items-center ${
              hasUpvotedAlready ? "text-theme-green" : ""
            }`}
          >
            <i
              className="ri-rocket-2-line cursor-pointer text-xl z-10"
              onClick={handleCommentUpvoteClick}
            ></i>
            <span className="text-xl">{comment.upvotes}</span>
          </div>
        ) : (
          <Link to="/login" className="mr-2 flex items-center">
            <i className="ri-rocket-2-line cursor-pointer text-xl z-10"></i>
            <span className="text-xl">{comment.upvotes}</span>
          </Link>
        )}

        {currentUser.username ? (
          <div
            className={`mr-4 flex items-center ${
              hasDownvotedAlready ? "text-theme-red" : ""
            }`}
          >
            <i
              className="ri-rocket-2-line transform rotate-180 cursor-pointer text-xl z-10"
              onClick={handleCommentDownvoteClick}
            ></i>
            <span className="text-xl">{comment.downvotes}</span>
          </div>
        ) : (
          <Link to="/login" className="mr-4 flex items-center">
            <i className="ri-rocket-2-line transform rotate-180 cursor-pointer text-xl z-10"></i>
            <span className="text-xl">{comment.downvotes}</span>
          </Link>
        )}

        <div className="mr-4 flex items-center cursor-pointer z-10">
          <i className="ri-chat-1-line mr-1 text-xl"></i>
          <span className="mr-1">reply</span>
        </div>

        {comment.repliedTo && (
          <div className="mr-4">
            <span>view reply</span>
          </div>
        )}
      </div>
    </div>
  );
};

Comment.propTypes = {
  comment: PropTypes.object.isRequired,
  currentUser: PropTypes.object.isRequired,
};

export default Comment;
