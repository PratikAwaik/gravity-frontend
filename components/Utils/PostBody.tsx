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
      className={`forum-post-body overflow-hidden mb-4 ${
        !isPostDetail ? "max-h-44 sm:max-h-52" : ""
      }`}
      style={!isPostDetail ? contentStyle : {}}
    >
      {/* post content */}
      {!isPostDetail ? (
        <Link href={`/forums/${post?.id}`}>
          <a className="forum-post-body-title">
            <h3 className="text-lg sm:text-xl font-bold mb-3">{post.title}</h3>
          </a>
        </Link>
      ) : (
        <div>
          <h3 className="text-lg sm:text-xl font-bold mb-3">{post.title}</h3>
        </div>
      )}

      {/* edit post */}
      {toEdit ? (
        // <EditPost post={post} setPost={setPost} setToEdit={setToEdit} />
        <></>
      ) : (
        <div
          className="text-sm sm:text-base forum-post-body-content"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(post.content),
          }}
        />
      )}
    </div>
  );
}
