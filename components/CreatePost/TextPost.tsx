import * as React from "react";
import DisplayError from "../Utils/DisplayError";
import FancyEditor from "../Utils/FancyEditor";

interface TextPostProps {
  postData: any;
  setPostData: React.Dispatch<React.SetStateAction<any>>;
}

export default function TextPost({ postData, setPostData }: TextPostProps) {
  return (
    <div className="p-4">
      <div className="mb-2 border border-theme-gray-line hover:border-theme-nav-icon focus-within:border-theme-nav-icon">
        <FancyEditor
          editorContent={postData.content}
          setEditorContent={(content: string) =>
            setPostData({ ...postData, content })
          }
          isPost={true}
        />
      </div>
    </div>
  );
}
