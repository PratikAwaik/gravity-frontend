import React from "react";
import { useSelector } from "react-redux";
import Comment from "./Comment";

const CommentThread = ({ foundingComment }) => {
  const comments = useSelector((state) => state.comments);

  console.log(
    comments.filter(
      (comment) =>
        comment.repliedTo &&
        comment.repliedTo.toString() === foundingComment.id.toString()
    )
  );

  const getRepliedComments = (commentId) => {
    return comments.filter((comment) => comment.repliedTo === commentId);
  };

  const displayComments = (foundingCommentId) => {
    const replies = getRepliedComments(foundingCommentId);
    const allComments = [foundingComment, ...replies];
    return allComments.map((comment, idx) => (
      <Comment key={comment.id} comment={comment} paddingIdx={idx} />
    ));
  };

  return displayComments(foundingComment.id);
};

export default CommentThread;
