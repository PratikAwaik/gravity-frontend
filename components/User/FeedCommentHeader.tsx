import Link from "next/link";
import { IComment } from "../../models/comment";

interface FeedCommentHeaderProps {
  comment: IComment;
}

export default function FeedCommentHeader({ comment }: FeedCommentHeaderProps) {
  return (
    <div className="flex items-center pb-2 pl-3 text-theme-gray-action-icon border-b border-theme-gray-line">
      <i className="ri-chat-1-line text-xl leading-5 mr-2"></i>
      <div className="flex items-center flex-wrap text-xs leading-4 flex-auto">
        <Link href={`/user/${comment?.author?.username}`}>
          <a className="text-theme-blue hover:underline">
            {comment?.author?.username}
          </a>
        </Link>
        <span className="mx-1">commented on</span>
        <Link href={`/posts/${comment?.postId}`}>
          <a className="break-words">{comment?.post?.title}</a>
        </Link>
        <span className="mini-dot"></span>
        <Link href={`/community/${comment?.post?.community?.name}`}>
          <a className="font-bold text-theme-body-text-color hover:underline">
            {comment?.post?.community?.prefixedName}
          </a>
        </Link>
        <span className="mini-dot"></span>
        <span className="mr-1">Posted by</span>
        <Link href={`/user/${comment?.post?.author?.username}`}>
          <a className="hover:underline">
            {comment?.post?.author?.prefixedName}
          </a>
        </Link>
      </div>
    </div>
  );
}
