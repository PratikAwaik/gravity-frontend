import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createPostDispatcher } from "../../dispatchers/forums";
import FancyEditor from "../Editors/FancyEditor";
import Swal from "sweetalert2";

const CreatePost = () => {
  const titleTextareaRef = useRef(null);
  const [titleLength, setTitleLength] = useState(0);
  const [editorContent, setEditorContent] = useState(
    "<p>Write Something...</p>"
  );
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.currentUser);

  // increase title textarea height when content increases
  const textAreaChangeHandler = () => {
    const { current } = titleTextareaRef;
    current.style.height = "auto";
    current.style.height = titleTextareaRef.current.scrollHeight + "px";
    setTitleLength(current.value.length);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (titleLength > 300) {
      Swal.fire({
        title: "Title must have maximum of 300 characters.",
        icon: "warning",
      });
    } else {
      const postData = {
        title: titleTextareaRef.current.value,
        content: editorContent,
        type: "editor",
      };

      createPostDispatcher(dispatch, postData, currentUser.token);
      // redirect to post Detail
    }
  };

  return (
    <div className="mt-16 create-post-container pt-9 max-w-3xl mx-auto mb-16">
      <div>
        <h2 className="text-2xl mb-2 px-2 py-2 rounded-md font-bold">
          Post on the Forum
        </h2>
        <hr className="mb-5" />
      </div>

      <div className="mb-5">
        <h4 className="text-xl">Have an interesting thought? Share it!</h4>
      </div>

      <div className="create-post-wrapper">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col items-start mb-4">
            <textarea
              ref={titleTextareaRef}
              onChange={textAreaChangeHandler}
              name="title"
              placeholder="Title"
              maxLength="300"
              className="resize-none overflow-hidden text-base w-full p-2 bg-transparent border border-theme-gray rounded-sm outline-none focus-within::bg-transparent"
              rows="1"
              required
            ></textarea>
            <span className="text-sm mt-2 text-theme-gray">
              {titleLength} / 300
            </span>
          </div>

          <FancyEditor
            editorContent={editorContent}
            setEditorContent={setEditorContent}
          />

          <div className="flex items-center mt-5">
            <button
              type="submit"
              className="px-5 py-2 border-2 border-theme-green rounded-md hover:bg-theme-green hover:text-theme-white"
            >
              Post
            </button>
            <Link
              to="/"
              className="ml-4 px-5 py-2 border-2 border-theme-red rounded-md hover:bg-theme-red"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
