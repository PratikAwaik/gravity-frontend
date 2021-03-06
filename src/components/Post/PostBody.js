import React from "react";
import DOMPurify from "dompurify";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import EditPost from "./EditPost";
import domPurifyConfig from "../../configs/domPurifyConfig";

const PostBody = ({ post, setPost, isPostDetail, toEdit, setToEdit }) => {
  const contentStyle = {
    maskImage: "linear-gradient(180deg, #000 70%, transparent)",
    WebkitMaskImage: "linear-gradient(180deg, #000 70%, transparent)",
  };

  const storeScrollPosition = () => {
    window.localStorage.setItem("gravityScrollPosition", window.pageYOffset);
  };

  return (
    <div
      className={`forum-post-body overflow-hidden mb-4 ${
        !isPostDetail ? "max-h-44 sm:max-h-52" : ""
      }`}
      style={!isPostDetail ? contentStyle : {}}
    >
      {/* post content */}
      {!isPostDetail ? (
        <Link
          to={`/forums/${post.id}`}
          className="forum-post-body-title"
          onClick={storeScrollPosition}
        >
          <h3 className="text-lg sm:text-xl font-bold mb-3">{post.title}</h3>
        </Link>
      ) : (
        <div>
          <h3 className="text-lg sm:text-xl font-bold mb-3">{post.title}</h3>
        </div>
      )}

      {/* edit post */}
      {toEdit ? (
        <EditPost post={post} setPost={setPost} setToEdit={setToEdit} />
      ) : (
        <div
          className="text-sm sm:text-base forum-post-body-content"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(post.content, domPurifyConfig),
          }}
        />
      )}
    </div>
  );
};

PostBody.propTypes = {
  post: PropTypes.object.isRequired,
  setPost: PropTypes.func,
  isPostDetail: PropTypes.bool.isRequired,
  toEdit: PropTypes.bool,
  setToEdit: PropTypes.func,
};

export default PostBody;
