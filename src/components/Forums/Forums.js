import React from "react";
import PropTypes from "prop-types";

const ForumPost = React.lazy(() => import("./ForumPost"));

const Forums = ({ posts }) => {
  return (
    <div className="forums-post-wrapper">
      {posts.map((post) => (
        <React.Suspense key={post.id}>
          <ForumPost post={post} />
        </React.Suspense>
      ))}
    </div>
  );
};

ForumPost.propTypes = {
  posts: PropTypes.array.isRequired,
};

export default Forums;
