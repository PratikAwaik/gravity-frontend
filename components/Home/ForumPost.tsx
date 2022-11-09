import PostHeader from "../Utils/PostHeader";
import PostBody from "../Utils/PostBody";
import PostFooter from "../Utils/PostFooter";

export default function ForumPost({ post }: { post: any }) {
  return (
    <div className="forum-post-container bg-white p-2 sm:p-4 sm:pb-1 border border-gray-300 hover:border-gray-400 rounded-md mb-3 relative">
      <PostHeader post={post} />
      <PostBody post={post} isPostDetail={false} toEdit={false} />
      <PostFooter post={post} isPostDetail={false} />
    </div>
  );
}
