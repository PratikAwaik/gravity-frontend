import React from "react";
import { useSelector } from "react-redux";
import Comment from "./Comment";

const CommentThread = ({ foundingComment }) => {
  const comments = useSelector((state) => state.comments);
  // this will be a single comment thread
  // at the top will the foundingComment
  // get all the comments that have ID of foundingComment (which will have replyId = 1), since these are the comments that replied
  // to the foundingComment
  // do the same for other comments in the thread

  return (
    <div>
      <Comment foundingComment={foundingComment} />
    </div>
  );
};

export default CommentThread;
