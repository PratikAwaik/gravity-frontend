import React from "react";
import PropTypes from "prop-types";
import CommentHeader from "./CommentHeader";
import CommentBody from "./CommentBody";
import CommentFooter from "./CommentFooter";

const Comment = ({ comment }) => {
  return (
    <div className="flex flex-col mb-5 comment">
      <CommentHeader comment={comment} />
      <CommentBody comment={comment} />
      <CommentFooter comment={comment} />
    </div>
  );
};

Comment.propTypes = {
  comment: PropTypes.object.isRequired,
};

export default Comment;
