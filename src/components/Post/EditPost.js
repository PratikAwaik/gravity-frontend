import React, { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import FancyEditor from "../Utils/FancyEditor";
import { editPostDispatcher } from "../../dispatchers/post";
import { successPopup } from "../../helpers";
import { editForumsPostDispatcher } from "../../dispatchers/forums";
import Swal from "sweetalert2";

const EditPost = ({ post, setToEdit }) => {
  const [editorState, setEditorState] = useState(post.content);
  const currentUser = useSelector((state) => state.currentUser);
  const { id } = useParams();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const postData = {
      id,
      content: editorState,
    };

    Swal.showLoading();
    await editPostDispatcher(dispatch, currentUser.token, postData);
    await editForumsPostDispatcher(dispatch, postData);
    await successPopup("Post updated successfully!");
    setToEdit(false);
  };

  return (
    <div className="mt-5 create-post-container pt-9 max-w-3xl mx-auto mb-5">
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

EditPost.propTypes = {
  post: PropTypes.object.isRequired,
  setToEdit: PropTypes.func.isRequired,
};

export default EditPost;
