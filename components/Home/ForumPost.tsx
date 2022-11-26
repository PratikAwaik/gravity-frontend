import PostHeader from "../Utils/PostHeader";
import PostBody from "../Utils/PostBody";
import PostFooter from "../Utils/PostFooter";

export default function ForumPost({ post }: { post: any }) {
  return (
    <div className="forum-post-container bg-white relative border border-theme-post-line rounded mb-3 hover:border-theme-post-icon-color">
      <div className="w-full p-3">
        <PostHeader post={post} />
        <PostBody post={post} isPostDetail={false} toEdit={false} />
        <PostFooter post={post} isPostDetail={false} />
      </div>
    </div>
  );
}
