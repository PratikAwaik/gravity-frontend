import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import PropTypes from "prop-types";

const PostHeader = ({ post }) => {
  return (
    <div className="forum-post-header text-theme-gray text-sm mb-2 flex items-center z-10">
      <Link
        to={`/r/${post.subreddit.id}`}
        className="flex items-center mr-2 hover:underline"
      >
        <img
          className="w-6 h-6 rounded-full mr-1"
          src={post.subreddit.communityIcon}
          alt="Community Icon"
        />
        <span className="font-bold">{post.subreddit.prefixedName}</span>
      </Link>
      Posted by
      {post.user && post.user.username ? (
        <Link to={`/user/${post.user.id}`} className="ml-1 hover:underline">
          {post.user.prefixedName}
        </Link>
      ) : (
        <span className="ml-1 underline">{"u/[deleted]"}</span>
      )}
      <div className="mx-2 inline-block w-1 h-1 bg-theme-black rounded-full"></div>
      {moment(post.createdAt).fromNow()}
      {post.editedAt && <span className="ml-1">(edited)</span>}
    </div>
  );
};

PostHeader.propTypes = {
  post: PropTypes.object.isRequired,
};

export default PostHeader;
