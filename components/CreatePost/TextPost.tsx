import * as React from "react";
import DisplayError from "../Utils/DisplayError";
import FancyEditor from "../Utils/FancyEditor";

interface TextPostProps {
  postData: any;
  setPostData: React.Dispatch<React.SetStateAction<any>>;
  error: any;
}

export default function TextPost({
  postData,
  setPostData,
  error,
}: TextPostProps) {
  const titleTextareaRef = React.createRef<HTMLTextAreaElement>();
  const [titleLength, setTitleLength] = React.useState(0);

  // increase title textarea height when content increases
  const textAreaChangeHandler = () => {
    const { current } = titleTextareaRef;
    (current as HTMLTextAreaElement).style.height = "auto";
    (current as HTMLTextAreaElement).style.height =
      (titleTextareaRef.current as HTMLTextAreaElement).scrollHeight + "px";
    setTitleLength((current as HTMLTextAreaElement).value.length);
    setPostData({ ...postData, title: (current as HTMLTextAreaElement).value });
  };

  return (
    <div className="p-4">
      <div className="mb-2">
        <div className="relative">
          <textarea
            maxLength={300}
            placeholder="Title"
            ref={titleTextareaRef}
            rows={1}
            onChange={textAreaChangeHandler}
            className="overflow-x-hidden break-words py-2 pl-2 pr-16 bg-transparent resize-none box-border w-full border border-theme-gray-line hover:border-theme-nav-icon focus:border-theme-nav-icon focus-visible:outline-none rounded-sm h-10 text-sm"
            required
          ></textarea>
          <span className="text-xxs font-bold absolute bottom-4 right-3 text-theme-gray-action-icon">
            {titleLength}/300
          </span>
          {error && error.field === "title" && <DisplayError error={error} />}
        </div>
      </div>
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
