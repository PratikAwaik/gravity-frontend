import React from "react";
import DOMPurify from "dompurify";
import PropTypes from "prop-types";

const CommentBody = ({ comment }) => {
  return (
    <div
      className="mb-2 pl-6 text-md comment-body"
      dangerouslySetInnerHTML={{
        __html: DOMPurify.sanitize(comment.content),
      }}
    ></div>
  );
};

CommentBody.propTypes = {
  comment: PropTypes.object.isRequired,
};

export default CommentBody;
