import React from "react";

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

export default Forums;
