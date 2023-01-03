import DOMPurify from "isomorphic-dompurify";
import Link from "next/link";
import Avatar from "../Utils/Avatar";
import FromNow from "../Utils/FromNow";
import CommentFooter from "./CommentFooter";
import { IComment } from "../../models/comment";
import { useAuth } from "../../utils/Auth";
import { useMemo } from "react";
import { getUserDetailPath } from "../../utils/constants";

interface CommentProps {
  comment: IComment;
}

export default function Comment({ comment }: CommentProps) {
  const { currentUser } = useAuth();

  const isOriginalPoster = useMemo(
    () => currentUser?.id === comment?.author?.id,
    [currentUser, comment?.author]
  );

  return (
    <div className="w-full pl-2 pt-2 pr-2">
      {/* header */}
      <div className="flex items-start">
        <div className="flex flex-col items-center">
          <Avatar user={comment?.author} />
        </div>
        <div>
          <div className="flex items-center mt-2 mb-2">
            <Link href={getUserDetailPath(comment?.author?.username)}>
              <a className="text-xs font-medium text-theme-nav-icon ml-2 hover:underline">
                {comment?.author?.username}
              </a>
            </Link>
            {isOriginalPoster && (
              <span className="ml-1 uppercase font-bold text-theme-blue text-xs">
                op
              </span>
            )}
            <div className="mini-dot"></div>
            <FromNow date={comment?.createdAt} />
          </div>
          <div className="ml-2 mb-2">
            <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(comment?.content),
              }}
              className="mb-2"
            />
            <CommentFooter comment={comment} />
          </div>
        </div>
      </div>
    </div>
  );
}
