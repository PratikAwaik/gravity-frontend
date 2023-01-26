import Link from "next/link";
import DOMPurify from "isomorphic-dompurify";
import { IComment } from "../../models/comment";

interface CommentBodyProps {
  comment: IComment;
  isUserCommentsFeed?: boolean;
}

export default function CommentBody({
  comment,
  isUserCommentsFeed = false,
}: CommentBodyProps) {
  return isUserCommentsFeed ? (
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
  );
}
