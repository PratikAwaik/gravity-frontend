import FeedCommentHeader from "./FeedCommentHeader";
import Comment from "../Comments/Comment";
import { IComment } from "../../models/comment";

interface FeedCommentProps {
  comment: IComment;
}

export default function FeedComment({ comment }: FeedCommentProps) {
  return (
    <div className="bg-white mb-3 py-2 border border-theme-post-line rounded hover:border-theme-post-icon-color">
      <FeedCommentHeader comment={comment} />
      <Comment comment={comment} isUserCommentsFeed />
    </div>
  );
}
