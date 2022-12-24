import { useRef } from "react";

interface ArticlePostProps {
  postData: any;
  setPostData: React.Dispatch<React.SetStateAction<any>>;
}

export default function ArticlePost({
  postData,
  setPostData,
}: ArticlePostProps) {
  const linkTextareaRef = useRef<any>();

  // increase title textarea height when content increases
  const textAreaChangeHandler = () => {
    const { current } = linkTextareaRef;
    (current as HTMLTextAreaElement).style.height = "auto";
    (current as HTMLTextAreaElement).style.height =
      (linkTextareaRef.current as HTMLTextAreaElement).scrollHeight + "px";
    setPostData({
      ...postData,
      content: (current as HTMLTextAreaElement).value,
    });
  };

  return (
    <div className="m-4">
      <div className="w-full h-full">
        <textarea
          maxLength={300}
          placeholder="Url"
          ref={linkTextareaRef}
          rows={3}
          onChange={textAreaChangeHandler}
          className="overflow-x-hidden break-words py-2 pl-2 pr-16 bg-transparent resize-none box-border w-full border border-theme-gray-line hover:border-theme-nav-icon focus:border-theme-nav-icon focus-visible:outline-none rounded-sm h-16 text-sm"
          required
        ></textarea>
      </div>
    </div>
  );
}
