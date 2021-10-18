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
        <div className="w-4 h-4 rounded-full bg-theme-black mr-1"></div>
        <span className="font-bold">{post.subreddit.name}</span>
      </Link>
      Posted by
      {post.user && post.user.username ? (
        <Link to={`/user/${post.user.username}`} className="ml-1 underline">
          {post.user.username}
        </Link>
      ) : (
        <span className="ml-1 underline">{"[deleted]"}</span>
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
