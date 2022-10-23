import Link from "next/link";
import FromNow from "./FromNow";

export default function PostHeader({ post }: { post: any }) {
  return (
    <div className="forum-post-header text-sm mb-2 flex sm:flex-row sm:items-center z-10">
      <Link href={`/community/${post.community.id}`}>
        <a className="flex items-end mr-2 hover:underline flex-shrink-0">
          <img
            className="w-9 h-9 sm:w-6 sm:h-6 rounded-full mr-1"
            src={post.community.icon}
            alt="Community Icon"
          />
          <span className="font-bold hidden sm:inline-block">
            {post.community.prefixedName}
          </span>
        </a>
      </Link>

      <div className="flex flex-col">
        <Link href={`/community/${post.community.id}`}>
          <a className="font-bold sm:hidden">{post.community.prefixedName}</a>
        </Link>
        <div className="flex flex-wrap items-center text-xs sm:text-sm mt-0.5 text-theme-white-500">
          Posted by
          <Link href={`/user/${post.author.id}`}>
            <a className="ml-1 hover:underline">{post.author.prefixedName}</a>
          </Link>
          <span className="mini-dot"></span>
          <FromNow date={post.createdAt} />
          {post.editedAt && <span className="ml-1">(edited)</span>}
        </div>
      </div>
    </div>
  );
}
