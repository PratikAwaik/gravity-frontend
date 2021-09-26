import React, { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import FancyEditor from "../Editors/FancyEditor";
import { editPostDispatcher } from "../../dispatchers/forums";
import Swal from "sweetalert2";

const EditPost = ({ post, toEdit, setToEdit }) => {
  const [title, setTitle] = useState(post.title);
  const [editorState, setEditorState] = useState(post.content);
  const currentUser = useSelector((state) => state.currentUser);
  const { id } = useParams();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (title.length > 300) {
      Swal.fire({
        title: "Title must have maximum of 300 characters.",
        icon: "warning",
      });
    } else {
      const postData = {
        title: title,
        content: editorState,
        type: "editor",
      };

      await editPostDispatcher(dispatch, id, postData, currentUser.token);
      const result = await Swal.fire("Post updated Sucessfully!");
      if (result.isConfirmed) {
        setToEdit(!toEdit);
      }
    }
  };

  return (
    <div className="mt-16 create-post-container pt-9 max-w-3xl mx-auto mb-16">
      <div>
        <h2 className="text-2xl mb-2 px-2 py-2 rounded-md font-bold">
          Edit Your Post
        </h2>
        <hr className="mb-5" />
      </div>

      <div className="create-post-wrapper">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col items-start mb-4">
            <textarea
              onChange={({ target }) => setTitle(target.value)}
              name="title"
              placeholder="Title"
              maxLength="300"
              className="resize-none overflow-hidden text-base w-full p-2 bg-transparent border border-theme-gray rounded-sm outline-none focus-within::bg-transparent"
              rows="1"
              value={title}
              required
            ></textarea>
            <span className="text-sm mt-2 text-theme-gray">
              {title.length} / 300
            </span>
          </div>

          <FancyEditor
            editorContent={editorState}
            setEditorContent={setEditorState}
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
                setToEdit(!toEdit);
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

EditPost.propTypes = {
  post: PropTypes.object.isRequired,
  toEdit: PropTypes.bool.isRequired,
  setToEdit: PropTypes.func.isRequired,
};

export default EditPost;
