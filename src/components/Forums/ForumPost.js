import React from "react";
import {
  handleDownvotesAction,
  handleUpvotesAction,
} from "../../actions/forums";
import PropTypes from "prop-types";
import PostHeader from "../Post/PostHeader";
import PostBody from "../Post/PostBody";
import PostFooter from "../Post/PostFooter";

const ForumPost = ({ post }) => {
  return (
    <div
      className="forum-post-container bg-transparent p-2 sm:p-4 border-2 sm:rounded-md mb-3 sm:mb-6 relative shadow-md"
      id={post.id}
    >
      <PostHeader post={post} />
      <PostBody post={post} isPostDetail={false} />
      <PostFooter
        post={post}
        upvoteAction={handleUpvotesAction}
        downvoteAction={handleDownvotesAction}
        isPostDetail={false}
      />
    </div>
  );
};

ForumPost.propTypes = {
  post: PropTypes.object.isRequired,
};

export default ForumPost;
