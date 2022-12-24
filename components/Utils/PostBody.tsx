import * as React from "react";
import Link from "next/link";
import DOMPurify from "isomorphic-dompurify";
import { MediaType, Post, PostType } from "../../models/post";

interface PostBodyProps {
  post: Post;
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
    maskImage:
      post.type !== PostType.MEDIA && post.type !== PostType.ARTICLE
        ? "linear-gradient(180deg, #000 70%, transparent)"
        : "",
    WebkitMaskImage:
      post.type !== PostType.MEDIA && post.type !== PostType.ARTICLE
        ? "linear-gradient(180deg, #000 70%, transparent)"
        : "",
    maxHeight:
      post.type === PostType.MEDIA
        ? "32rem"
        : post.type === PostType.TEXT
        ? "15.625rem"
        : "fit-content",
  };

  return (
    <div
      className={`forum-post-body overflow-hidden ${
        !isPostDetail ? "max-h-44 sm:max-h-52" : ""
      }`}
      style={!isPostDetail ? contentStyle : {}}
    >
      {/* post content */}
      {post.type !== PostType.ARTICLE &&
        (!isPostDetail ? (
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
        ))}

      {/* edit post */}
      {toEdit ? (
        // <EditPost post={post} setPost={setPost} setToEdit={setToEdit} />
        <></>
      ) : (
        <div
          className={`text-sm forum-post-body-content font-theme-font-family-noto px-0 relative ${
            post.type === PostType.TEXT && "pb-2"
          }`}
        >
          {post.type === PostType.TEXT && (
            <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(post.content),
              }}
            />
          )}
          {post.type === PostType.MEDIA && (
            <>
              {post.mediaType === MediaType.IMAGE ? (
                <img src={post.content} alt={post.title} />
              ) : (
                <video
                  controls
                  preload="metadata"
                  className="w-full object-contain"
                  playsInline
                >
                  <source src={post.content} />
                </video>
              )}
            </>
          )}
          {post.type === PostType.ARTICLE && (
            <div className="w-full h-full flex items-start justify-between">
              <div>
                <Link href={`/forums/${post?.id}`}>
                  <a className=" text-theme-post-title-text-color font-semibold">
                    <h3 className="text-lg font-medium mb-2 break-words">
                      {post.title}
                    </h3>
                  </a>
                </Link>
                <div className="flex items-center">
                  <a
                    href={post.content}
                    className="text-theme-link-text-color text-xs my-1 mx-2 ml-0 whitespace-nowrap w-44 flex items-center"
                    target="_blank"
                  >
                    <span className="w-max block text-ellipsis overflow-hidden hover:underline">
                      {post.content.slice(12)}
                    </span>
                    <i className="ri-external-link-line"></i>
                  </a>
                </div>
              </div>
              <div className="h-28 w-40">
                <a
                  href={post.content}
                  className="w-full h-full object-contain"
                  target="_blank"
                >
                  <div className="h-full w-full flex items-center justify-center relative rounded border border-theme-blue">
                    {post.articleImage ? (
                      <img
                        src={post.articleImage}
                        alt={post.title}
                        className="w-full h-full rounded object-cover"
                      />
                    ) : (
                      <i className="ri-links-line text-2xl text-theme-blue"></i>
                    )}
                    <div className="absolute bottom-0 right-0 bg-theme-blue w-5 h-5 rounded-tl flex items-center justify-center">
                      <i className="ri-external-link-line text-sm text-white"></i>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
