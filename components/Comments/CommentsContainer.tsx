import Comment from "./Comment";
import { useMemo } from "react";
import { IComment } from "../../models/comment";

interface CommentsContainerProps {
  allComments: IComment[];
  recursiveComments?: IComment[];
}

export default function CommentsContainer({
  allComments,
  recursiveComments,
}: CommentsContainerProps) {
  const comments = useMemo(() => {
    return recursiveComments ?? allComments;
  }, [allComments, recursiveComments]);

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
            <CommentsContainer
              allComments={allComments}
              recursiveComments={comment?.children}
            />
          ) : null}
        </div>
      ))}
    </div>
  );
}
