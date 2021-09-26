import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "ckeditor5-build-classic-autoimage";
import ckEditorConfig from "../../configs/ckEditorConfig";

const FancyEditor = ({ editorContent, setEditorContent }) => {
  const handleChange = (event, editor) => {
    const data = editor.getData();
    setEditorContent(data);
  };

  return (
    <CKEditor
      editor={ClassicEditor}
      data={editorContent}
      onChange={handleChange}
      config={ckEditorConfig}
    />
  );
};

export default FancyEditor;
