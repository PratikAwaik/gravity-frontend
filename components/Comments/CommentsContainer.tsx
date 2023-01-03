import Comment from "./Comment";
import { useMemo } from "react";
import { IComment } from "../../models/comment";
import { usePostCommentsStore } from "../../stores/postComments";

interface CommentsContainerProps {
  recursiveComments?: IComment[];
}

export default function CommentsContainer({
  recursiveComments,
}: CommentsContainerProps) {
  const postComments = usePostCommentsStore((s) => s.postComments);

  const comments = useMemo(() => {
    return recursiveComments ?? postComments;
  }, [postComments, recursiveComments]);

  return (
    <div className="w-full">
      {comments?.map((comment: any) => (
        <div
          className={`max-w-full comments-container relative ${
            comment?.parentId && "ml-6"
          }`}
          key={comment?.id}
        >
          <div className="absolute left-5 top-11 w-0.5 h-[calc(100%_-_3rem)] border border-theme-gray-line hover:border-theme-button"></div>
          <Comment comment={comment} />
          {comment?.children?.length > 0 ? (
            <CommentsContainer recursiveComments={comment?.children} />
          ) : null}
        </div>
      ))}
    </div>
  );
}

/**
 * Need imprest money, from 2months i didnt have received salary from my previous company. Thereafter, you can deduct imprest money from my salary.
 * I am in urgent need of an imprest money since my previous company has not paid me my salary for the past 2 months. I am therefore requesting for an imprest money which you can deduct from my salary.
 */
