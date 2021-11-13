import React, { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import FancyEditor from "../Editors/FancyEditor";
import { editCommentDispatcher } from "../../dispatchers/comments";
import Swal from "sweetalert2";

const EditComment = ({ comment, setToEdit }) => {
  const [editorState, setEditorState] = useState(comment.content);
  const currentUser = useSelector((state) => state.currentUser);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const commentData = {
      content: editorState,
    };

    await editCommentDispatcher(
      dispatch,
      comment.post,
      comment.id,
      commentData,
      currentUser.token
    );
    const result = await Swal.fire({
      title: "Comment updated Sucessfully!",
      icon: "success",
      customClass: {
        confirmButton: "bg-theme-green text-theme-white",
      },
    });
    if (result.isConfirmed) {
      setToEdit(false);
    }
  };

  return (
    <div className="mt-5 create-post-container max-w-3xl mx-auto mb-5">
      <form onSubmit={handleSubmit}>
        <FancyEditor
          editorContent={editorState}
          setEditorContent={setEditorState}
          isPost={true}
        />

        <div className="flex items-center mt-5">
          <button type="submit" className="success-btn">
            Update
          </button>
          <button
            type="button"
            className="cancel-btn"
            onClick={() => {
              setToEdit(false);
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

EditComment.propTypes = {
  comment: PropTypes.object.isRequired,
  setToEdit: PropTypes.func.isRequired,
};

export default EditComment;
