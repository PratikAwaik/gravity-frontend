import * as React from "react";
import Link from "next/link";
import DOMPurify from "isomorphic-dompurify";

interface PostBodyProps {
  post: any;
  //   setPost: React.Dispatch<React.SetStateAction<any>>;
  isPostDetail: boolean;
  toEdit: boolean;
  //   setToEdit: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function PostBody({
  post,
  isPostDetail,
  toEdit,
}: PostBodyProps) {
  const contentStyle = {
    maskImage: "linear-gradient(180deg, #000 70%, transparent)",
    WebkitMaskImage: "linear-gradient(180deg, #000 70%, transparent)",
    maxHeight:
      post.type === "MEDIA"
        ? "512px"
        : post.type === "TEXT"
        ? "250px"
        : "fit-content",
  };

  const storeScrollPosition = () => {
    window.localStorage.setItem(
      "gravityScrollPosition",
      window.pageYOffset.toString()
    );
  };

  return (
    <div
      className={`forum-post-body overflow-hidden ${
        !isPostDetail ? "max-h-44 sm:max-h-52" : ""
      }`}
      style={!isPostDetail ? contentStyle : {}}
    >
      {/* post content */}
      {!isPostDetail ? (
        <Link href={`/forums/${post?.id}`}>
          <a className=" text-theme-post-title-text-color">
            <h3 className="text-lg font-medium mb-2 break-words">
              {post.title}
            </h3>
          </a>
        </Link>
      ) : (
        <div>
          <h3 className="text-lg font-semibold mb-2 text-theme-post-title-text-color">
            {post.title}
          </h3>
        </div>
      )}

      {/* edit post */}
      {toEdit ? (
        // <EditPost post={post} setPost={setPost} setToEdit={setToEdit} />
        <></>
      ) : (
        <div
          className="text-sm forum-post-body-content font-theme-font-family-noto px-0 pb-3"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(post.content),
          }}
        />
      )}
    </div>
  );
}
