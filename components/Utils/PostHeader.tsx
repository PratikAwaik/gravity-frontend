import Link from "next/link";
import FromNow from "./FromNow";

export default function PostHeader({ post }: { post: any }) {
  return (
    <div className="forum-post-header text-xs mb-2 flex sm:flex-row sm:items-center z-10">
      <Link href={`/community/${post.community.id}`}>
        <a className="flex items-center hover:underline flex-shrink-0">
          <img
            className="w-5 h-5 rounded-full mr-1"
            src={post.community.icon}
            alt="Community Icon"
          />
          <span className="font-bold hidden sm:inline-block">
            {post.community.prefixedName}
          </span>
        </a>
      </Link>

      <span className="mini-dot"></span>

      <div className="flex flex-col">
        <Link href={`/community/${post.community.id}`}>
          <a className="font-bold sm:hidden text-theme-font-black">
            {post.community.prefixedName}
          </a>
        </Link>
        <div className="flex flex-wrap items-center text-xs text-theme-font-black">
          Posted by
          <Link href={`/user/${post.author.id}`}>
            <a className="ml-1 hover:underline mr-1">
              {post.author.prefixedName}
            </a>
          </Link>
          <FromNow date={post.createdAt} />
          {post.editedAt && <span className="ml-1">(edited)</span>}
        </div>
      </div>
    </div>
  );
}
