import React, { useEffect } from "react";
import PropTypes from "prop-types";
import ForumPost from "./ForumPost";

const Forums = ({ posts }) => {
  useEffect(() => {
    scrollToPreviousPosition();
  }, []);

  function scrollToPreviousPosition() {
    const yPosition = window.localStorage.getItem("gravityScrollPosition");
    if (yPosition) {
      window.scrollTo(0, parseInt(yPosition));
      window.localStorage.removeItem("gravityScrollPosition");
    }
  }

  return (
    <div className="forums-post-wrapper">
      {posts.map((post) => (
        <ForumPost key={post.id} post={post} />
      ))}
    </div>
  );
};

Forums.propTypes = {
  posts: PropTypes.array.isRequired,
};

export default Forums;
