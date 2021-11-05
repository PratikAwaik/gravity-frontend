import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import Comment from "./Comment";
import {
  getAllCommentsDispatcher,
  unsetCommentsDispatcher,
} from "../../dispatchers/comments";
import { orderComments } from "../../helpers";

const Comments = ({ post }) => {
  const comments = useSelector((state) => orderComments(state.comments));
  const dispatch = useDispatch();

  useEffect(() => {
    getAllCommentsDispatcher(dispatch, post.id);
    return () => unsetCommentsDispatcher(dispatch);
  }, [dispatch, post.id]);

  return post ? (
    <div>
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </div>
  ) : null;
};

Comments.propTypes = {
  post: PropTypes.object.isRequired,
};

export default Comments;
