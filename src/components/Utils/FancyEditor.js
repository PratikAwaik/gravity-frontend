import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "ckeditor5-build-classic-autoimage";
import PropTypes from "prop-types";
import editorConfig from "../../configs/ckEditorConfig";

const FancyEditor = ({ editorContent, setEditorContent, isPost }) => {
  const handleChange = (event, editor) => {
    const data = editor.getData();
    setEditorContent(data);
  };

  const removeMediaEmbedFromConfig = () => {
    return {
      items: editorConfig.toolbar.items.filter((item) =>
        isPost ? item : item !== "mediaEmbed"
      ),
    };
  };

  return (
    <CKEditor
      editor={ClassicEditor}
      data={editorContent}
      onChange={handleChange}
      config={{
        ...editorConfig,
        toolbar: removeMediaEmbedFromConfig(),
      }}
    />
  );
};

FancyEditor.propTypes = {
  editorContent: PropTypes.string.isRequired,
  setEditorContent: PropTypes.func.isRequired,
  isPost: PropTypes.bool.isRequired,
};

export default FancyEditor;
