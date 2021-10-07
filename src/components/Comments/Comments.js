import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import Comment from "./Comment";
import { getAllCommentsDispatcher } from "../../dispatchers/comments";
import { orderComments } from "../../helpers";

const Comments = ({ post }) => {
  const comments = useSelector((state) => state.comments);
  const dispatch = useDispatch();

  useEffect(() => {
    getAllCommentsDispatcher(dispatch, post.id);
  }, [dispatch, post.id]);

  const orderedComments = orderComments(comments);

  return post ? (
    <div>
      {orderedComments.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </div>
  ) : null;
};

Comments.propTypes = {
  post: PropTypes.object.isRequired,
};

export default Comments;
