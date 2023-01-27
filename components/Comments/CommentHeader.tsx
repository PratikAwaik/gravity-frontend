import Link from "next/link";
import FromNow from "../Utils/FromNow";
import { useMemo } from "react";
import { IComment } from "../../models/comment";
import { useAuth } from "../../utils/Auth";
import { getUserDetailPath } from "../../utils/constants";

interface CommentHeaderProps {
  comment: IComment;
}

export default function CommentHeader({ comment }: CommentHeaderProps) {
  const { currentUser } = useAuth();
  const isOriginalPoster = useMemo(
    () => currentUser?.id === comment?.author?.id,
    [currentUser, comment?.author]
  );

  return (
    <div className="flex items-center flex-wrap mt-2 mb-2">
      <Link href={getUserDetailPath(comment?.author?.username)}>
        <a className="text-xs font-medium text-theme-nav-icon ml-2 hover:underline z-10">
          {comment?.author?.username}
        </a>
      </Link>
      {isOriginalPoster && (
        <span className="ml-1 uppercase font-bold text-theme-blue text-xs z-10">
          op
        </span>
      )}
      <div className="mini-dot"></div>
      <FromNow date={comment?.createdAt} />
      {comment?.updatedAt && (
        <>
          <span className="mini-dot"></span>
          <span className="italic text-xs text-theme-meta-text">
            edited <FromNow date={comment?.updatedAt} />
          </span>
        </>
      )}
    </div>
  );
}
