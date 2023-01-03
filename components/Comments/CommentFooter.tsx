import * as React from "react";
import Link from "next/link";
import ReplyCommentModal from "./ReplyCommentModal";
import { useMutation } from "@apollo/client";
import { UPDATE_COMMENT_SCORE } from "../../graphql/comments/mutation";
import { useDisclosure } from "../../hooks/useDisclosure";
import { CommentScore, IComment } from "../../models/comment";
import { useAuth } from "../../utils/Auth";
import { PAGES } from "../../utils/constants";

interface CommentFooterProps {
  comment: IComment;
}

export default function CommentFooter({ comment }: CommentFooterProps) {
  const { currentUser } = useAuth();
  const [commentVoteCount, setCommentVoteCount] = React.useState<number>(0);
  const [commentScore, setCommentScore] = React.useState<
    CommentScore | null | undefined
  >(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [updateCommentScore] = useMutation(UPDATE_COMMENT_SCORE, {
    onError(error, clientOptions) {
      // set error
    },
    onCompleted(data, clientOptions) {
      const updatedCommentScore = data.updateCommentScore.commentScores[0];

      if (commentScore?.direction === "UPVOTE" && !updatedCommentScore) {
        setCommentVoteCount(commentVoteCount - 1);
      } else if (
        commentScore?.direction === "DOWNVOTE" &&
        !updatedCommentScore
      ) {
        setCommentVoteCount(commentVoteCount + 1);
      } else if (
        commentScore?.direction === "UPVOTE" &&
        updatedCommentScore.direction === "DOWNVOTE"
      ) {
        setCommentVoteCount(commentVoteCount - 2);
      } else if (
        commentScore?.direction === "DOWNVOTE" &&
        updatedCommentScore.direction === "UPVOTE"
      ) {
        setCommentVoteCount(commentVoteCount + 2);
      } else if (!commentScore && updatedCommentScore.direction === "UPVOTE") {
        setCommentVoteCount(commentVoteCount + 1);
      } else if (
        !commentScore &&
        updatedCommentScore.direction === "DOWNVOTE"
      ) {
        setCommentVoteCount(commentVoteCount - 1);
      }
      setCommentScore(updatedCommentScore);
    },
  });

  React.useEffect(() => {
    setCommentScore(comment?.commentScores?.[0]);
  }, [comment?.commentScores]);

  React.useEffect(() => {
    setCommentVoteCount(comment?.score);
  }, [comment?.score]);

  const hasVoted = React.useMemo(
    () => commentScore?.userId === currentUser?.id,
    [commentScore]
  );

  const handleVoteClick = (directionToChange: string) => {
    let direction;
    if (
      (commentScore?.direction === "UPVOTE" &&
        directionToChange === "UPVOTE") ||
      (commentScore?.direction === "DOWNVOTE" &&
        directionToChange === "DOWNVOTE")
    ) {
      direction = "UNVOTE";
    } else direction = directionToChange;
    updateCommentScore({ variables: { direction, commentId: comment.id } });
  };

  return (
    <div className="flex items-center">
      <div className="flex items-center">
        {!currentUser ? (
          <Link href={PAGES.LOGIN}>
            <a className="mr-2 text-theme-gray-action-icon">
              <i className="ri-rocket-2-line text-lg "></i>
            </a>
          </Link>
        ) : (
          <button
            type="button"
            className="mr-2 hover:text-theme-blue text-theme-gray-action-icon"
            onClick={() => handleVoteClick("UPVOTE")}
          >
            <i
              className={`ri-rocket-2-${
                hasVoted && commentScore?.direction === "UPVOTE"
                  ? "fill"
                  : "line"
              } text-lg ${
                hasVoted && commentScore?.direction === "UPVOTE"
                  ? "text-theme-blue"
                  : ""
              }`}
            ></i>
          </button>
        )}
        <span
          className={`text-xs mr-2 font-semibold ${
            hasVoted
              ? commentScore?.direction === "UPVOTE"
                ? "text-theme-blue"
                : commentScore?.direction === "DOWNVOTE"
                ? "text-theme-red"
                : ""
              : ""
          }`}
        >
          {commentVoteCount}
        </span>
        {!currentUser ? (
          <Link href={PAGES.LOGIN}>
            <a className="mr-2 transform rotate-180 text-theme-gray-action-icon">
              <i className="ri-rocket-2-line text-lg rotate-180"></i>
            </a>
          </Link>
        ) : (
          <button
            type="button"
            className={`mr-2 hover:text-theme-red transform rotate-180 text-theme-gray-action-icon ${
              hasVoted && commentScore?.direction === "DOWNVOTE"
                ? "text-theme-red"
                : ""
            }`}
            onClick={() => handleVoteClick("DOWNVOTE")}
          >
            <i
              className={`ri-rocket-2-${
                hasVoted && commentScore?.direction === "DOWNVOTE"
                  ? "fill"
                  : "line"
              } text-lg`}
            ></i>
          </button>
        )}
        <button
          className="inline-flex items-center text-theme-gray-action-icon hover:bg-theme-gray-nav-icon-faded px-2 rounded"
          onClick={onOpen}
        >
          <i className="ri-chat-1-line text-lg mr-1"></i>
          <span className="text-xs font-medium">Reply</span>
        </button>
      </div>
      {isOpen && (
        <ReplyCommentModal commentToReply={comment} onClose={onClose} />
      )}
    </div>
  );
}
