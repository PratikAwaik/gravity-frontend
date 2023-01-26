import DOMPurify from "isomorphic-dompurify";
import Link from "next/link";
import Avatar from "../Utils/Avatar";
import FromNow from "../Utils/FromNow";
import CommentFooter from "./CommentFooter";
import { IComment } from "../../models/comment";
import { useAuth } from "../../utils/Auth";
import { useEffect, useMemo, useState } from "react";
import { getUserDetailPath } from "../../utils/constants";
import { scrollWithOffset } from "../../utils/helpers/comments";

interface CommentProps {
  comment: IComment;
  isUserCommentsFeed?: boolean;
}

export default function Comment({
  comment,
  isUserCommentsFeed = false,
}: CommentProps) {
  const { currentUser } = useAuth();
  const [hashedCommentId, setHashedCommentId] = useState<string | null>(null);

  const isOriginalPoster = useMemo(
    () => currentUser?.id === comment?.author?.id,
    [currentUser, comment?.author]
  );

  useEffect(() => {
    if (window !== undefined && window.location.hash) {
      const hashedId = window.location.hash.slice(1);
      if (hashedId === comment?.id) {
        const commentDOM = document.getElementById(hashedId);
        if (commentDOM) {
          scrollWithOffset(commentDOM);
          setHashedCommentId(hashedId);
        }
      }
    }
  }, [window.location.hash, comment?.id]);

  return comment.deleted ? (
    <div className="w-full pl-2 py-3 pr-2">
      <div className="flex items-center">
        <div className="w-7 h-7 rounded-full bg-theme-gray-line"></div>
        <div className="ml-2 flex items-center">
          <span className="text-xs text-theme-meta-text">
            Comment deleted by user
          </span>
          <span className="mini-dot"></span>
          <FromNow date={comment?.createdAt} />
        </div>
      </div>
    </div>
  ) : (
    <div
      className={`w-full pl-2 pr-2 relative ${!isUserCommentsFeed && "pt-2"} ${
        hashedCommentId === comment?.id && "bg-theme-gray-alpha"
      }`}
      id={comment?.id}
    >
      <div className="flex items-start">
        {!isUserCommentsFeed && (
          <div className="flex flex-col items-center">
            <Avatar user={comment?.author} />
          </div>
        )}
        <div>
          <div className="flex items-center mt-2 mb-2">
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
          <div className="ml-2 mb-2">
            {isUserCommentsFeed ? (
              <Link href={`/posts/${comment?.postId}#${comment?.id}`}>
                <a className="details-link">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(comment?.content),
                    }}
                    className="mb-2"
                  />
                </a>
              </Link>
            ) : (
              <div
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(comment?.content),
                }}
                className="mb-2"
              />
            )}
            {!isUserCommentsFeed && <CommentFooter comment={comment} />}
          </div>
        </div>
      </div>
    </div>
  );
}
