import PostHeader from "../Post/PostHeader";
import PostBody from "../Post/PostBody";
import PostFooter from "../Post/PostFooter";
import { IPost } from "../../models/post";

interface FeedPostProps {
  post: IPost;
  isCommunityPosts?: boolean;
}

export default function FeedPost({
  post,
  isCommunityPosts = false,
}: FeedPostProps) {
  return (
    <div className="forum-post-container bg-white relative border border-theme-post-line rounded mb-3 hover:border-theme-post-icon-color">
      <div className="w-full p-3">
        <PostHeader post={post} isCommunityPosts={isCommunityPosts} />
        <PostBody
          post={post}
          isPostDetail={false}
          isCommunityPosts={isCommunityPosts}
        />
        <PostFooter
          post={post}
          isPostDetail={false}
          isCommunityPosts={isCommunityPosts}
        />
      </div>
    </div>
  );
}
