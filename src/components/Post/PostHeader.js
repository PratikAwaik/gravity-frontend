import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import PropTypes from "prop-types";

const PostHeader = ({ post }) => {
  return (
    <div className="forum-post-header text-theme-gray text-sm mb-2 flex flex-col sm:flex-row sm:items-center z-10">
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
      <div className="ml-5 sm:ml-0 flex flex-wrap items-center">
        Posted by
        <Link to={`/user/${post.user.id}`} className="ml-1 hover:underline">
          {post.user.prefixedName}
        </Link>
        <div className="mx-2 inline-block w-1 h-1 bg-theme-black rounded-full"></div>
        {moment(post.createdAt).fromNow()}
        {post.editedAt && <span className="ml-1">(edited)</span>}
      </div>
    </div>
  );
};

PostHeader.propTypes = {
  post: PropTypes.object.isRequired,
};

export default PostHeader;
