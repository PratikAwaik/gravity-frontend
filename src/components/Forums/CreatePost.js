import React, { useState, useEffect, useRef } from "react";
import { Editor } from "react-draft-wysiwyg";
import MDEditor from '@uiw/react-md-editor';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const CreatePost = () => {
  const titleTextareaRef = useRef(null);
  const [editorContent, setEditorContent] = useState('');
  const [mdContent, setMdContent] = useState('');
  const [isFancyEditor, setIsFancyEditor] = useState(true);

  useEffect(() => {
    titleTextareaRef.current.style.height = 'inherit';
    const scrollHeight = titleTextareaRef.current.scrollHeight;

    // get computed styles for the element
    const computed = window.getComputedStyle(titleTextareaRef.current);
    const paddingTopHeight = parseInt(computed.getPropertyValue('padding-top'), 10);
    titleTextareaRef.current.style.height = scrollHeight + paddingTopHeight + 'px';
  }, [titleTextareaRef]);

  const fancyToolbarConfig = {
    options: [
      'inline', 
      'blockType', 
      'list', 
      'textAlign', 
      'link', 
      'embedded', 
      'emoji', 
      'image', 
      'remove', 
      'history'
    ]
  }
  
  const toggleEditor = () => {
    setIsFancyEditor(!isFancyEditor);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <div className="mt-16 create-post-container pt-9 max-w-3xl mx-auto mb-12">
      <div>
        <h2 className="text-2xl mb-2 px-2 py-2 rounded-md font-bold">Post on the Forum</h2>
        <hr className="mb-5" />
      </div>

      <div className="mb-5">
        <h4 className="text-xl">Have an interesting thought? Share it!</h4>
      </div>

      <div className="create-post-wrapper">
        <form onSubmit={handleSubmit}>
          <textarea 
            ref={titleTextareaRef}
            name="title" 
            placeholder="Title" 
            maxLength="300"
            className="resize-none mb-4 text-base w-full p-2 bg-transparent border-2 rounded-md border-theme-purple outline-none focus-within::bg-transparent"
            rows="1"
          ></textarea>

          <div className="flex items-center mb-4">
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
          </div>

          {
            isFancyEditor &&
            <Editor
              editorState={editorContent}
              toolbarClassName="bg-theme-purple text-theme-black"
              wrapperClassName="border-2 border-theme-purple rounded-md"
              editorClassName="p-2"
              toolbar={fancyToolbarConfig}
              onEditorStateChange={(editorState) => setEditorContent(editorState)}
            />
          }
          {
            !isFancyEditor &&
            <div className="markdown-container border-2 border-theme-purple rounded-md">
              <MDEditor value={mdContent} onChange={(content) => setMdContent(content)} />
            </div>
          }
        </form>
      </div>
    </div>
  );
}

export default CreatePost;