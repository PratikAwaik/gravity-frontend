import React, { useState } from "react";
import PropTypes from "prop-types";
import CommentHeader from "./CommentHeader";
import CommentBody from "./CommentBody";
import CommentFooter from "./CommentFooter";
import FancyEditor from "../Editors/FancyEditor";
import { createCommentDispatcher } from "../../dispatchers/comments";
import { useDispatch, useSelector } from "react-redux";

const Comment = ({ comment }) => {
  const [replyClicked, setReplyClicked] = useState(false);
  const [editorContent, setEditorContent] = useState("");
  const currentUser = useSelector((state) => state.currentUser);
  const dispatch = useDispatch();

  const handleCreateComment = async (e) => {
    e.preventDefault();
    const commentData = {
      content: editorContent.trim(),
      repliedTo: comment.id,
      level: comment.level + 1,
    };
    await createCommentDispatcher(
      dispatch,
      comment.post,
      currentUser.token,
      commentData
    );
    setEditorContent("");
    setReplyClicked(false);
  };

  const commentBars = [];

  for (let i = 0; i <= comment.level; i++) {
    commentBars.push(
      <div
        key={i}
        className={`bg-theme-white absolute z-0 h-full pt-2 w-0.5`}
        style={{
          marginLeft: 16 * 1.5 * i + "px",
        }}
      ></div>
    );
  }

  return (
    <div className="w-full h-full">
      <div
        className="flex flex-col pt-5 w-full h-full relative comment"
        style={{ paddingLeft: 16 * 1.5 * comment.level + "px" }}
      >
        <CommentHeader comment={comment} />

        <div className="absolute left-2.5 z-0 h-full flex items-center justify-between">
          {commentBars}
        </div>

        <CommentBody comment={comment} />
        <CommentFooter comment={comment} setReplyClicked={setReplyClicked} />
        {replyClicked && (
          <div className="my-4 pl-6">
            <FancyEditor
              editorContent={editorContent}
              setEditorContent={setEditorContent}
              isPost={false}
            />

            <button type="button" onClick={handleCreateComment}>
              Comment
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

Comment.propTypes = {
  comment: PropTypes.object.isRequired,
};

export default Comment;
