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

const CommentFooter = ({ comment, setReplyClicked }) => {
  // const [editorContent, setEditorContent] = useState("");
  // const [replyClicked, setReplyClicked] = useState(false);
  const currentUser = useSelector((state) => state.currentUser);
  // const comments = useSelector((state) => state.comments);
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

  return (
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

      {/* downvote */}
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

      <div
        className="mr-4 flex items-center cursor-pointer z-10"
        onClick={() => setReplyClicked(true)}
      >
        <i className="ri-chat-1-line mr-1 text-xl"></i>
        <span className="mr-1">reply</span>
      </div>

      {/* {repliesTocomment.length > 0 && (
        <button className="mr-4" onClick={() => setShowReplies(true)}>
          <span>+ view {repliesTocomment.length} replies</span>
        </button>
      )} */}
    </div>
  );
};

CommentFooter.propTypes = {
  comment: PropTypes.object.isRequired,
};

export default CommentFooter;
