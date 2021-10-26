import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import PropTypes from "prop-types";

const CommentHeader = ({ comment }) => {
  return (
    <div className="flex items-center text-sm text-theme-gray mb-2 z-10 comment-header">
      <img
        className="w-7 h-7 rounded-full mr-2 object-cover"
        src={comment.user.profilePic}
        alt="User Profile Pic"
      />
      <Link
        to={`/user/${comment.user.id}`}
        className="mr-2 underline comment-user"
      >
        {comment.user.username}
      </Link>
      <span className="comment-time">
        {moment(comment.createdAt).fromNow()}
      </span>
    </div>
  );
};

CommentHeader.propTypes = {
  comment: PropTypes.object.isRequired,
};

export default CommentHeader;
