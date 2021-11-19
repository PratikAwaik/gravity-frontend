import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import Comment from "./Comment";
import {
  setCommentsDispatcher,
  unsetCommentsDispatcher,
} from "../../dispatchers/comments";
import { orderComments } from "../../helpers";

const Comments = ({ post }) => {
  const comments = useSelector((state) =>
    orderComments(state.comments.results)
  );
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await setCommentsDispatcher(dispatch, null, post.id);
    })();
    return () => unsetCommentsDispatcher(dispatch);
  }, [dispatch, post.id]);

  return (
    <div>
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} post={post} />
      ))}
    </div>
  );
};

Comments.propTypes = {
  post: PropTypes.object.isRequired,
};

export default Comments;
