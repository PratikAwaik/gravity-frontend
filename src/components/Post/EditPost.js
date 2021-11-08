import React, { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import FancyEditor from "../Editors/FancyEditor";
import { editPostDispatcher } from "../../dispatchers/forums";
import { successPopup } from "../../helpers";

const EditPost = ({ post, setPost, setToEdit }) => {
  const [editorState, setEditorState] = useState(post.content);
  const currentUser = useSelector((state) => state.currentUser);
  const { id } = useParams();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await editPostDispatcher(
      dispatch,
      id,
      { content: editorState },
      currentUser.token
    );
    setPost({ ...post, content: editorState });
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
          <button
            type="submit"
            className="px-4 sm:px-5 py-1.5 border-2 border-theme-green rounded-md text-sm sm:text-base hover:bg-theme-green hover:text-theme-white"
          >
            Update
          </button>
          <button
            type="button"
            className="ml-4 px-4 sm:px-5 py-1.5 border-2 border-theme-red rounded-md text-sm sm:text-base hover:bg-theme-red"
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
  setPost: PropTypes.func.isRequired,
  setToEdit: PropTypes.func.isRequired,
};

export default EditPost;
