import React, { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import FancyEditor from "../Editors/FancyEditor";
import { editPostDispatcher } from "../../dispatchers/forums";
import Swal from "sweetalert2";

const EditPost = ({ post, setToEdit }) => {
  const [editorState, setEditorState] = useState(post.content);
  const currentUser = useSelector((state) => state.currentUser);
  const { id } = useParams();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const postData = {
      content: editorState,
      type: "editor",
    };

    await editPostDispatcher(dispatch, id, postData, currentUser.token);
    const result = await Swal.fire({
      title: "Post updated Sucessfully!",
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
            className="px-5 py-2 border-2 border-theme-green rounded-md hover:bg-theme-green hover:text-theme-white"
          >
            Update
          </button>
          <button
            type="button"
            className="ml-4 px-5 py-2 border-2 border-theme-red rounded-md hover:bg-theme-red"
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
