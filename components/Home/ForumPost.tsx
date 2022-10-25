import PostHeader from "../Utils/PostHeader";
import PostBody from "../Utils/PostBody";
import PostFooter from "../Utils/PostFooter";

export default function ForumPost({ post }: { post: any }) {
  return (
    <div className="forum-post-container bg-transparent p-2 sm:p-4 border border-theme-gray-200 rounded-md mb-3 sm:mb-6 relative">
      <PostHeader post={post} />
      <PostBody post={post} isPostDetail={false} toEdit={false} />
      <PostFooter post={post} isPostDetail={false} />
    </div>
  );
}
