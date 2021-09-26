import React from "react";
import { Link } from "react-router-dom";
import DOMPurify from "dompurify";
import MDEditor from "@uiw/react-md-editor";
import PropTypes from "prop-types";
import domPurifyConfig from "../../configs/domPurifyConfig";

const PostBody = ({ post, isPostDetail }) => {
  const contentStyle = {
    maskImage: "linear-gradient(180deg, #000 70%, transparent)",
    WebkitMaskImage: "linear-gradient(180deg, #000 70%, transparent)",
  };

  return (
    <div
      className={`forum-post-body overflow-hidden mb-4 ${
        !isPostDetail ? "max-h-60" : ""
      }`}
      style={!isPostDetail ? contentStyle : {}}
    >
      {!isPostDetail ? (
        <Link to={`/forums/${post.id}`} className="forum-post-body-title">
          <h3 className="text-xl font-bold mb-3">{post.title}</h3>
        </Link>
      ) : (
        <div>
          <h3 className="text-xl font-bold mb-3">{post.title}</h3>
        </div>
      )}

      {post.type === "editor" ? (
        <div
          className="text-base forum-post-body-content"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(post.content, domPurifyConfig),
          }}
        />
      ) : (
        <div className="text-base forum-post-body-content">
          <MDEditor.Markdown source={post.content} />
        </div>
      )}
    </div>
  );
};

PostBody.propTypes = {
  post: PropTypes.object.isRequired,
  isPostDetail: PropTypes.bool.isRequired,
};

export default PostBody;
