import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import Comment from "./Comment";
import { getAllCommentsDispatcher } from "../../dispatchers/forums";

const Comments = ({ post }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    getAllCommentsDispatcher(dispatch, post.id);
  }, [dispatch, post.id]);

  return post ? (
    <div>
      {post.comments.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </div>
  ) : null;
};

Comments.propTypes = {
  post: PropTypes.object.isRequired,
};

export default Comments;
