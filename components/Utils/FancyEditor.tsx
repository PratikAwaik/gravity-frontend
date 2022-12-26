import * as React from "react";
import editorConfig from "../../utils/configs/ckEditorConfig";

interface FancyEditorProps {
  editorContent: string;
  setEditorContent: Function;
  isPost: boolean;
  placeholder?: string;
}

export default function FancyEditor({
  editorContent,
  setEditorContent,
  isPost,
  placeholder,
}: FancyEditorProps) {
  const editorRef = React.useRef<{ CKEditor: any; ClassicEditor: any }>();
  const [editorLoaded, setEditorLoaded] = React.useState(false);
  const { CKEditor, ClassicEditor } = editorRef.current || {};

  React.useEffect(() => {
    editorRef.current = {
      CKEditor: require("@ckeditor/ckeditor5-react").CKEditor,
      ClassicEditor: require("ckeditor5-build-classic-autoimage"),
    };
    setEditorLoaded(true);
  }, []);

  const handleChange = (event: any, editor: any) => {
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

  return editorLoaded ? (
    <div className="mb-2 border border-theme-gray-line hover:border-theme-nav-icon focus-within:border-theme-nav-icon">
      <CKEditor
        editor={ClassicEditor}
        data={editorContent}
        onChange={handleChange}
        config={{
          ...editorConfig,
          placeholder: placeholder ?? "Text (Optional)",
          toolbar: removeMediaEmbedFromConfig(),
        }}
      />
    </div>
  ) : (
    <div className="w-full flex items-center justify-center py-3">
      <i className="ri-loader-4-line text-2xl text-theme-gray-action-icon animate-spin"></i>
      <span className="text-sm text-theme-gray-action-icon font-medium ml-2">
        Loading Editor
      </span>
    </div>
  );
}
