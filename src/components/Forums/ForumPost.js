import React from "react";
import {
  handleDownvotesAction,
  handleUpvotesAction,
} from "../../actions/forums";
import PropTypes from "prop-types";
import PostHeader from "./PostHeader";
import PostBody from "./PostBody";
import PostFooter from "./PostFooter";

const ForumPost = ({ post, currentUser }) => {
  return (
    <div className="forum-post-container bg-transparent p-4 border-2 rounded-md mb-6 relative shadow-md">
      <PostHeader post={post} />
      <PostBody post={post} isPostDetail={false} />
      <PostFooter
        currentUser={currentUser}
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
  currentUser: PropTypes.object.isRequired,
};

export default ForumPost;
