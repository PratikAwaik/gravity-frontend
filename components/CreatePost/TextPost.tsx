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
      <FancyEditor
        editorContent={postData.content}
        setEditorContent={(content: string) =>
          setPostData({ ...postData, content })
        }
        isPost={true}
      />
    </div>
  );
}
