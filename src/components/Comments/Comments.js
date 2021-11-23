import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import Comment from "./Comment";
import {
  setCommentsDispatcher,
  unsetCommentsDispatcher,
} from "../../dispatchers/comments";
import { orderComments } from "../../helpers";
import LoadingWrapper from "../Utils/LoadingWrapper";

const Comments = ({ post }) => {
  const [loading, setLoading] = useState(true);
  const comments = useSelector((state) =>
    orderComments(state.comments.results)
  );
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await setCommentsDispatcher(dispatch, null, post.id);
      setLoading(false);
    })();
    return () => unsetCommentsDispatcher(dispatch);
  }, [dispatch, post.id]);

  return (
    <LoadingWrapper loading={loading}>
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} post={post} />
      ))}
    </LoadingWrapper>
  );
};

Comments.propTypes = {
  post: PropTypes.object.isRequired,
};

export default Comments;
