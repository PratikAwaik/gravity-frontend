import React, { useState } from "react";
import PropTypes from "prop-types";
import CommentHeader from "./CommentHeader";
import CommentBody from "./CommentBody";
import CommentFooter from "./CommentFooter";
import FancyEditor from "../Utils/FancyEditor";
import { createCommentDispatcher } from "../../dispatchers/comments";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import Swal from "sweetalert2";
import { successPopup } from "../../helpers";

const Comment = ({ comment, post }) => {
  const [replyClicked, setReplyClicked] = useState(false);
  const [toEdit, setToEdit] = useState(false);
  const [editorContent, setEditorContent] = useState("");
  const currentUser = useSelector((state) => state.currentUser);
  const dispatch = useDispatch();
  const location = useLocation();

  const handleCreateComment = async (e) => {
    e.preventDefault();
    const commentData = {
      content: editorContent.trim(),
      repliedTo: comment.id,
      level: comment.level + 1,
    };
    Swal.showLoading();
    await createCommentDispatcher(
      dispatch,
      comment.post,
      currentUser.token,
      commentData
    );
    await successPopup("Replied successfully!");
    setEditorContent("");
    setReplyClicked(false);
  };

  const commentBars = [];

  for (let i = 0; i <= comment.level; i++) {
    commentBars.push(
      <div
        key={i}
        className={`bg-theme-white absolute z-0 pt-2 w-0.5 bottom-0`}
        style={{
          marginLeft: 16 * 1.5 * i + "px",
          height: i === comment.level ? "calc(100% - 50px)" : "100%",
        }}
      ></div>
    );
  }

  return (
    <div
      className={`w-full h-full flex items-center relative ${
        "#" + comment.id === location.hash && "rounded-md bg-yellow-100"
      }`}
      id={comment.id}
    >
      <div className="absolute left-3 z-0 h-full flex items-center justify-between">
        {commentBars}
      </div>

      <div
        className="flex flex-col pt-3 pb-2 w-full h-full relative comment"
        style={{ paddingLeft: 16 * 1.5 * comment.level + "px" }}
      >
        <CommentHeader comment={comment} post={post} />
        <CommentBody comment={comment} toEdit={toEdit} setToEdit={setToEdit} />
        <CommentFooter
          comment={comment}
          setReplyClicked={setReplyClicked}
          setToEdit={setToEdit}
        />
        {replyClicked && (
          <div className="my-2 sm:my-4 pl-6 w-full">
            <FancyEditor
              editorContent={editorContent}
              setEditorContent={setEditorContent}
              isPost={false}
            />

            <button
              type="button"
              className="success-btn"
              onClick={handleCreateComment}
            >
              Comment
            </button>

            <button
              type="button"
              className="cancel-btn"
              onClick={() => setReplyClicked(false)}
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

Comment.propTypes = {
  comment: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
};

export default Comment;
