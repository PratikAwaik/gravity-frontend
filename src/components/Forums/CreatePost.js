import React, { useState, useEffect, useRef } from "react";
import { Editor } from "react-draft-wysiwyg";
import { convertToRaw } from "draft-js";
import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createPostAction } from "../../actions/forums";
import forumsServices from '../../services/forums';
import fancyToolbarConfig from "../../editor.config";
// import rehypeSanitize from "rehype-sanitize";

// TODO: Add support for markdown editor 

const CreatePost = () => {
  const titleTextareaRef = useRef(null);
  const [editorContent, setEditorContent] = useState('');
  // const [mdContent, setMdContent] = useState('');
  // const [isFancyEditor, setIsFancyEditor] = useState(true);
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.currentUser);

  // increase title textarea height when content increases
  useEffect(() => {
    titleTextareaRef.current.style.height = 'inherit';
    const scrollHeight = titleTextareaRef.current.scrollHeight;

    // get computed styles for the element
    const computed = window.getComputedStyle(titleTextareaRef.current);
    const paddingTopHeight = parseInt(computed.getPropertyValue('padding-top'), 10);
    titleTextareaRef.current.style.height = scrollHeight + paddingTopHeight + 'px';

  }, [titleTextareaRef]);
  
  // const toggleEditor = () => {
  //   setIsFancyEditor(!isFancyEditor);
  // }

  const handleSubmit = (e) => {
    e.preventDefault();
    const postData = {
      title: titleTextareaRef.current.value,
      content: JSON.stringify(convertToRaw(editorContent.getCurrentContent())),
      type: 'editor'
    }
    
    forumsServices.setToken(currentUser.token);
    dispatch(createPostAction(postData));
    // redirect to post Detail
  }

  return (
    <div className="mt-16 create-post-container pt-9 max-w-3xl mx-auto mb-16">
      <div>
        <h2 className="text-2xl mb-2 px-2 py-2 rounded-md font-bold">Post on the Forum</h2>
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
              name="title" 
              placeholder="Title" 
              maxLength="300"
              className="resize-none text-base w-full p-2 bg-transparent border-2 rounded-md border-theme-purple outline-none focus-within::bg-transparent"
              rows="1"
              required
            ></textarea>
          </div>

          {/* <div className="flex items-center mb-4">
            <button 
              type="button" 
              className={`mr-4 p-2 border-2 border-theme-purple rounded-md ${isFancyEditor ? 'bg-theme-purple' : ''}`}
              onClick={toggleEditor}
            >
              Fancy Editor
            </button>
            <button 
              type="button" 
              className={`mr-4 p-2 border-2 border-theme-purple rounded-md ${!isFancyEditor ? 'bg-theme-purple' : ''}`}
              onClick={toggleEditor}
            >
              Markdown Mode
            </button>
          </div> */}
            
          <Editor
            editorState={editorContent}
            toolbarClassName="bg-theme-purple text-theme-black"
            wrapperClassName="border-2 border-theme-purple rounded-md"
            editorClassName="p-2"
            toolbar={fancyToolbarConfig}
            onEditorStateChange={(editorState) => setEditorContent(editorState)}
            placeholder="Write here..."
            handlePastedText={() => false}
          />

          <div className="flex items-center mt-5">
            <button type="submit" className="px-5 py-2 border-2 border-theme-purple rounded-md hover:bg-theme-purple">Post</button>
            <Link to="/" className="ml-4 px-5 py-2 border-2 border-theme-red rounded-md hover:bg-theme-red">Cancel</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreatePost;