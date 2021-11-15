import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import PropTypes from "prop-types";
import astronautPicture from "../../images/astronaut.png";

const CommentHeader = ({ comment }) => {
  return (
    <div className="flex items-center text-sm text-theme-gray mb-2 z-10 comment-header">
      <img
        className="w-6 h-6 sm:w-7 sm:h-7 rounded-full mr-2 object-cover"
        src={comment.user ? comment.user.profilePic : astronautPicture}
        alt="User Profile Pic"
      />

      {comment.user ? (
        <Link
          to={`/user/${comment.user.id}`}
          className="mr-2 comment-user font-bold hover:underline"
        >
          {comment.user.username}
        </Link>
      ) : (
        <div className="mr-2 comment-user">[deleted]</div>
      )}

      {/* {comment.user &&
        comment.user.posts.find((post) => post === comment.post) && (
          <span className="text-theme-green text-sm mr-2 font-bold">OP</span>
        )} */}

      {comment.user && (
        <>
          <div className="w-1 h-1 bg-theme-black rounded-full mr-2"></div>
          <span className="comment-time">
            {moment(comment.createdAt).fromNow()}
          </span>
        </>
      )}

      {comment.editedAt && <span className="ml-1">(edited)</span>}
    </div>
  );
};

CommentHeader.propTypes = {
  comment: PropTypes.object.isRequired,
};

export default CommentHeader;
