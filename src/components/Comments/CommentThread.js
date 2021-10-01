import React from "react";
import Comment from "./Comment";

const CommentThread = ({ foundingComment }) => {
  return (
    <div>
      <Comment comment={foundingComment} />
    </div>
  );
};

export default CommentThread;
