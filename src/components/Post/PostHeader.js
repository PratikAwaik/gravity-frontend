import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import PropTypes from "prop-types";

const PostHeader = ({ post }) => {
  return (
    <div className="forum-post-header text-theme-gray text-sm mb-2 flex sm:flex-row sm:items-center z-10">
      <Link
        to={`/r/${post.subreddit.id}`}
        className="flex items-center mr-2 hover:underline flex-shrink-0"
      >
        <img
          className="w-9 h-9 sm:w-6 sm:h-6 rounded-full mr-1"
          src={post.subreddit.communityIcon}
          alt="Community Icon"
        />
        <span className="font-bold hidden sm:inline-block">
          {post.subreddit.prefixedName}
        </span>
      </Link>

      <div className="flex flex-col">
        <Link to={`/r/${post.subreddit.id}`} className="font-bold sm:hidden">
          {post.subreddit.prefixedName}
        </Link>
        <div className="flex flex-wrap items-center text-xs sm:text-sm mt-0.5">
          Posted by
          <Link to={`/user/${post.user.id}`} className="ml-1 hover:underline">
            {post.user.prefixedName}
          </Link>
          <span className="mini-dot"></span>
          {moment(post.createdAt).fromNow()}
          {post.editedAt && <span className="ml-1">(edited)</span>}
        </div>
      </div>
    </div>
  );
};

PostHeader.propTypes = {
  post: PropTypes.object.isRequired,
};

export default PostHeader;
