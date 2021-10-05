import React, { useState } from "react";
import PropTypes from "prop-types";
import CommentHeader from "./CommentHeader";
import CommentBody from "./CommentBody";
import CommentFooter from "./CommentFooter";
import FancyEditor from "../Editors/FancyEditor";
import { createCommentDispatcher } from "../../dispatchers/comments";
import { useDispatch, useSelector } from "react-redux";

const Comment = ({ foundingComment, repliesToFoundingComment }) => {
  const [replyClicked, setReplyClicked] = useState(false);
  const [editorContent, setEditorContent] = useState("");
  const [showReplies, setShowReplies] = useState(false);
  const currentUser = useSelector((state) => state.currentUser);
  const comments = useSelector((state) => state.comments);
  const dispatch = useDispatch();

  const handleCreateComment = async (e) => {
    e.preventDefault();
    const commentData = {
      content: editorContent,
      repliedTo: foundingComment.id,
    };
    await createCommentDispatcher(
      dispatch,
      foundingComment.post,
      currentUser.token,
      commentData
    );
    setEditorContent("");
  };

  return (
    <div className="flex flex-col mb-5 comment">
      <CommentHeader comment={foundingComment} />
      <CommentBody comment={foundingComment} />
      <CommentFooter
        foundingComment={foundingComment}
        setReplyClicked={setReplyClicked}
        setShowReplies={setShowReplies}
      />
      {replyClicked && (
        <div className="pl-6 my-4">
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
  );
};

Comment.propTypes = {
  foundingComment: PropTypes.object.isRequired,
};

export default Comment;
