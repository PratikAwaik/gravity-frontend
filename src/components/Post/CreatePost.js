import React, { useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createPostDispatcher } from "../../dispatchers/forums";
import FancyEditor from "../Editors/FancyEditor";
import ChooseCommunity from "./ChooseCommunity";
import { errorPopup, successPopup } from "../../helpers";

const CreatePost = () => {
  const titleTextareaRef = useRef(null);
  const [subredditSelected, setSubredditSelected] = useState({
    prefixedName: "Choose a Community",
  });
  const [titleLength, setTitleLength] = useState(0);
  const [editorContent, setEditorContent] = useState("");
  const history = useHistory();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state);

  // increase title textarea height when content increases
  const textAreaChangeHandler = () => {
    const { current } = titleTextareaRef;
    current.style.height = "auto";
    current.style.height = titleTextareaRef.current.scrollHeight + "px";
    setTitleLength(current.value.length);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (titleTextareaRef.current.value.trim()) {
      if (subredditSelected.id) {
        const postData = {
          subreddit: subredditSelected.id,
          title: titleTextareaRef.current.value.trim(),
          content: editorContent.trim(),
          type: "editor",
        };

        await createPostDispatcher(dispatch, postData, currentUser.token);
        await successPopup("Post created successfully!");
        history.goBack();
      } else {
        errorPopup("Please choose a community!");
      }
    } else {
      errorPopup("Please provide a title to your post!");
    }
  };

  return (
    <div className="mt-16 create-post-container pt-9 max-w-3xl mx-auto mb-16">
      <div>
        <h2 className="text-2xl mb-2 px-2 py-2 rounded-md font-bold">
          Create a Post
        </h2>
        <hr className="mb-5" />
      </div>

      <div className="my-5">
        <ChooseCommunity
          subredditSelected={subredditSelected}
          setSubredditSelected={setSubredditSelected}
        />
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
              className="resize-none overflow-hidden text-base w-full p-2 bg-transparent border border-gray-400 rounded-sm outline-none focus-within::bg-transparent"
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
            isPost={true}
          />

          <div className="flex items-center mt-5">
            <button
              type="submit"
              className="px-5 py-2 border-2 border-theme-green rounded-md hover:bg-theme-green hover:text-theme-white"
            >
              Post
            </button>
            <button
              type="button"
              className="ml-4 px-5 py-2 border-2 border-theme-red rounded-md hover:bg-theme-red"
              onClick={() => history.goBack()}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
