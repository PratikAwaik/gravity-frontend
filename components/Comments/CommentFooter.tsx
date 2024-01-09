import * as React from "react";
import Link from "next/link";
import EditAndReplyCommentModal from "./EditAndReplyCommentModal";
import ConfirmDeleteCommentModal from "./ConfirmDeleteCommentModal";
import {useMutation} from "@apollo/client";
import {UPDATE_COMMENT_SCORE} from "../../graphql/comments/mutation";
import {useDisclosure} from "../../hooks/useDisclosure";
import {IComment} from "../../models/comment";
import {PAGES} from "../../utils/constants";
import {useAuth} from "../../utils/Auth";

interface CommentFooterProps {
  comment: IComment;
}

export default function CommentFooter({comment}: CommentFooterProps) {
  const {currentUser} = useAuth();
  const {isOpen, onOpen, onClose} = useDisclosure();
  const {
    isOpen: isConfirmDeleteModalOpen,
    onOpen: onConfirmDeleteModalOpen,
    onClose: onConfirmDeleteModalClose,
  } = useDisclosure();
  const isOriginalPoster = React.useMemo(
    () => currentUser?.id === comment?.author?.id,
    [currentUser, comment?.author]
  );
  const [toEditComment, setToEditComment] = React.useState<boolean>(false);
  const commentScore = React.useMemo(
    () => comment?.commentScores?.[0],
    [comment?.commentScores]
  );
  const commentVoteCount = React.useMemo(
    () => comment?.score,
    [comment?.score]
  );

  const [updateCommentScore] = useMutation(UPDATE_COMMENT_SCORE, {
    update: (cache, {data: {updateCommentScore}}) => {
      cache.modify({
        id: cache.identify(updateCommentScore),
        fields: {
          commentScores() {
            return updateCommentScore?.commentScores;
          },
          score() {
            return updateCommentScore?.score;
          },
        },
      });
    },
    onError(error, clientOptions) {
      // set error
    },
  });

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
    updateCommentScore({variables: {direction, commentId: comment.id}});
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
          className="inline-flex items-center text-theme-gray-action-icon hover:bg-theme-gray-nav-icon-faded py-1.5 px-1 rounded-sm mr-1"
          onClick={onOpen}
        >
          <i className="ri-chat-1-line text-lg mr-1 leading-4"></i>
          <span className="text-xs font-medium">Reply</span>
        </button>
        {isOriginalPoster && (
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-sm py-1.5 px-1 whitespace-nowrap hover:bg-theme-gray-nav-icon-faded text-xs text-theme-gray-action-icon font-medium mr-1"
            onClick={() => {
              setToEditComment(true);
              onOpen();
            }}
          >
            Edit
          </button>
        )}
        {isOriginalPoster && (
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-sm py-1.5 px-1 whitespace-nowrap hover:bg-theme-gray-nav-icon-faded text-xs text-theme-gray-action-icon font-medium mr-1"
            onClick={onConfirmDeleteModalOpen}
          >
            Delete
          </button>
        )}
      </div>
      {isOpen && (
        <EditAndReplyCommentModal
          commentToReply={comment}
          commentToEdit={comment}
          onClose={onClose}
          toEditComment={toEditComment}
        />
      )}
      {isConfirmDeleteModalOpen && (
        <ConfirmDeleteCommentModal
          onClose={onConfirmDeleteModalClose}
          comment={comment}
        />
      )}
    </div>
  );
}
