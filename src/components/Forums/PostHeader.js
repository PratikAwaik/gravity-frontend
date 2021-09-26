import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import PropTypes from "prop-types";

const PostHeader = ({ post }) => {
  return (
    <div className="forum-post-header text-theme-gray text-sm mb-2 flex items-center z-10">
      Posted by
      {post.user && post.user.username ? (
        <Link to={`/user/${post.user.username}`} className="ml-1 underline">
          {post.user.username}
        </Link>
      ) : (
        <span className="ml-1 underline">{"[deleted]"}</span>
      )}
      <i
        className="ri-checkbox-blank-circle-fill mx-1 text-xs"
        style={{ fontSize: "0.5rem" }}
      ></i>
      {moment(post.createdAt).fromNow()}
      {post.editedAt && <span className="ml-1">(edited)</span>}
    </div>
  );
};

PostHeader.propTypes = {
  post: PropTypes.object.isRequired,
};

export default PostHeader;
