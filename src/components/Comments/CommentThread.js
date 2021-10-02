import React from "react";
import Comment from "./Comment";

const CommentThread = ({ foundingComment }) => {
  // this will be a single comment thread
  // at the top will the foundingComment
  // get all the comments that have ID of foundingComment (which will have replyId = 1), since these are the comments that replied
  // to the foundingComment
  // do the same for other comments in the thread

  return (
    <div>
      <Comment comment={foundingComment} />
    </div>
  );
};

export default CommentThread;
