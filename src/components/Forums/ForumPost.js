import React from "react";
import {
  handleDownvotesAction,
  handleUpvotesAction,
} from "../../actions/forums";
import PropTypes from "prop-types";
import PostHeader from "./PostHeader";
import PostBody from "./PostBody";
import PostFooter from "./PostFooter";
import { useSelector } from "react-redux";

const ForumPost = ({ post, subreddit }) => {
  const currentUser = useSelector((state) => state.currentUser);
  return (
    <div className="forum-post-container bg-transparent p-4 border-2 rounded-md mb-6 relative shadow-md">
      <PostHeader post={post} subreddit={subreddit} />
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
};

export default ForumPost;
