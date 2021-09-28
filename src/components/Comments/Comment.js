import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { Link } from "react-router-dom";

const Comment = ({ comment }) => {
  return (
    <div className="flex flex-col comment">
      <div className="flex items-center text-sm text-theme-gray mb-2 comment-header">
        <span className="w-5 h-5 mr-2 bg-theme-black rounded-full"></span>
        <Link
          to={`/user/${comment.user.username}`}
          className="mr-2 comment-user"
        >
          {comment.user.username}
        </Link>
        <span className="comment-time">
          {moment(comment.createdAt).fromNow()}
        </span>
      </div>
      <div className="mb-2 pl-6 text-md comment-body">{comment.content}</div>
      <div className="ml-6 flex items-center comment-footer">
        <div className="mr-2 flex items-center">
          <i
            className="ri-rocket-2-line cursor-pointer text-xl z-10"
            // onClick={handleUpvoteClick}
          ></i>
          <span className="text-xl">{comment.upvotes}</span>
        </div>

        <div className="mr-4 flex items-center">
          <i
            className="ri-rocket-2-line transform rotate-180 cursor-pointer text-xl z-10"
            // onClick={handleDownvoteClick}
          ></i>
          <span className="text-xl">{comment.downvotes}</span>
        </div>

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
};

export default Comment;
