import React, { useState } from "react";
import PropTypes from "prop-types";
import CommentHeader from "./CommentHeader";
import CommentBody from "./CommentBody";
import CommentFooter from "./CommentFooter";
import FancyEditor from "../Editors/FancyEditor";
import { createCommentDispatcher } from "../../dispatchers/comments";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";

const Comment = ({ comment }) => {
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
        className="flex flex-col pt-5 pb-3 w-full h-full relative comment"
        style={{ paddingLeft: 16 * 1.5 * comment.level + "px" }}
      >
        <CommentHeader comment={comment} />
        <CommentBody comment={comment} toEdit={toEdit} setToEdit={setToEdit} />
        <CommentFooter
          comment={comment}
          setReplyClicked={setReplyClicked}
          setToEdit={setToEdit}
        />
        {replyClicked && (
          <div className="my-4 pl-6">
            <FancyEditor
              editorContent={editorContent}
              setEditorContent={setEditorContent}
              isPost={false}
            />

            <button
              type="button"
              className="border-2 border-theme-green rounded-md px-2 py-1 my-2 hover:bg-theme-green hover:text-white"
              onClick={handleCreateComment}
            >
              Comment
            </button>

            <button
              type="button"
              className="border-2 border-theme-red rounded-md px-2 py-1 my-2 hover:bg-theme-red hover:text-white ml-3"
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
};

export default Comment;
