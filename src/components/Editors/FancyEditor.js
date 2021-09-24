import React from "react";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import ckEditorConfig from "../../configs/ckEditorConfig";

const FancyEditor = ({ editorContent, setEditorContent }) => {
  const handleChange = (event, editor) => {
    const data = editor.getData();
    setEditorContent(data);
  }

  return (
    <CKEditor
      editor={ClassicEditor}
      data={editorContent}
      onReady={editor => console.log('editor ready to use', editor)} 
      onChange={handleChange}
      config={ckEditorConfig}
    />
  );
}

export default FancyEditor;