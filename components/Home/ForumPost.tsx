import PostHeader from "../Post/PostHeader";
import PostBody from "../Post/PostBody";
import PostFooter from "../Post/PostFooter";
import { IPost } from "../../models/post";

interface ForumPostProps {
  post: IPost;
}

export default function ForumPost({ post }: ForumPostProps) {
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
