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
      content: editorContent,
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

  return (
    <div className="w-full h-full">
      <div
        className="flex flex-col pt-5 w-full h-full relative comment"
        style={{ paddingLeft: 16 * 1.5 * comment.level + "px" }}
      >
        <div
          className="bg-theme-white absolute left-2.5 top-5 z-0 h-full w-0.5"
          style={{ marginLeft: 16 * 1.5 * comment.level + "px" }}
        ></div>
        <CommentHeader comment={comment} />
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
