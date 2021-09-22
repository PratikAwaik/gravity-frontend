import React from "react";
import { handleDownvotesAction, handleUpvotesAction } from "../../actions/forums";
import PropTypes from 'prop-types';
import PostHeader from "./PostHeader";
import PostBody from "./PostBody";
import PostFooter from "./PostFooter";

const ForumPost = ({ post, currentUser }) => {
  return (
    <div className="forum-post-container bg-transparent border-4 border-theme-orange text-theme-white p-2 rounded-md mb-4 relative">
      <PostHeader  post={post} />
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
}

ForumPost.propTypes = {
  post: PropTypes.object.isRequired,
  currentUser: PropTypes.object.isRequired
}

export default ForumPost;