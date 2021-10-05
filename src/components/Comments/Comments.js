import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import CommentThread from "./CommentThread";
import { getAllCommentsDispatcher } from "../../dispatchers/comments";

const Comments = ({ post }) => {
  const comments = useSelector((state) => state.comments);
  const dispatch = useDispatch();

  useEffect(() => {
    getAllCommentsDispatcher(dispatch, post.id);
  }, [dispatch, post.id]);

  const foundingComments = comments.filter((comment) => !comment.repliedTo);

  return post ? (
    <div>
      {foundingComments.map((comment) => (
        <CommentThread key={comment.id} foundingComment={comment} />
      ))}
    </div>
  ) : null;
};

Comments.propTypes = {
  post: PropTypes.object.isRequired,
};

export default Comments;
