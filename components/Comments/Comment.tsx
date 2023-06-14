import CommentHeader from "./CommentHeader";
import CommentBody from "./CommentBody";
import UserAvatar from "../Utils/UserAvatar";
import FromNow from "../Utils/FromNow";
import CommentFooter from "./CommentFooter";
import { IComment } from "../../models/comment";
import { useEffect, useMemo, useState } from "react";
import { scrollWithOffset } from "../../utils/helpers/comments";

interface CommentProps {
  comment: IComment;
  isUserCommentsFeed?: boolean;
}

export default function Comment({
  comment,
  isUserCommentsFeed = false,
}: CommentProps) {
  const [hashedCommentId, setHashedCommentId] = useState<string | null>(null);

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
        hashedCommentId === comment?.id && "bg-theme-gray-alpha rounded"
      }`}
      id={comment?.id}
    >
      <div className="flex items-start">
        {!isUserCommentsFeed && (
          <div className="flex flex-col items-center">
            <UserAvatar
              key={`${comment?.author?.id}-comment`}
              user={comment?.author}
            />
          </div>
        )}
        <div>
          <CommentHeader comment={comment} />
          <div className="ml-2 mb-2">
            <CommentBody
              comment={comment}
              isUserCommentsFeed={isUserCommentsFeed}
            />
            {!isUserCommentsFeed && <CommentFooter comment={comment} />}
          </div>
        </div>
      </div>
    </div>
  );
}
