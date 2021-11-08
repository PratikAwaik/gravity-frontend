import React from "react";
import DOMPurify from "dompurify";
import PropTypes from "prop-types";
import EditComment from "./EditComment";

const CommentBody = ({ comment, toEdit, setToEdit }) => {
  return toEdit ? (
    <EditComment comment={comment} setToEdit={setToEdit} />
  ) : (
    <div
      className="mb-2 pl-8 text-md comment-body"
      dangerouslySetInnerHTML={{
        __html: comment.content
          ? DOMPurify.sanitize(comment.content)
          : "[deleted]",
      }}
    ></div>
  );
};

CommentBody.propTypes = {
  comment: PropTypes.object.isRequired,
  toEdit: PropTypes.bool,
  setToEdit: PropTypes.func,
};

export default CommentBody;
