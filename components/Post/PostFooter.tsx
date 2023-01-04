import * as React from "react";
import Link from "next/link";
import numberFormatter from "../../utils/helpers/numberFormatter";
import { useMutation } from "@apollo/client";
import { UPDATE_POST_SCORE } from "../../graphql/posts/mutations";
import { IPost, PostScore, PostType } from "../../models/post";
import { usePostCommentsStore } from "../../stores/postComments";
import { useAuth } from "../../utils/Auth";
import { getPostDetailPath, PAGES } from "../../utils/constants";
import { useDisclosure } from "../../hooks/useDisclosure";
import EditPostModal from "./EditPostModal";

interface PostFooterProps {
  post: IPost;
  isPostDetail: boolean;
}

export default function PostFooter({ post, isPostDetail }: PostFooterProps) {
  const { currentUser } = useAuth();
  const [postVoteCount, setPostVoteCount] = React.useState<number>(0);
  const [postScore, setPostScore] = React.useState<PostScore | null>(null);
  const { postCommentsCount, setPostCommentsCount } = usePostCommentsStore(
    (s) => ({
      postCommentsCount: s.postCommentsCount,
      setPostCommentsCount: s.setPostCommentsCount,
    })
  );
  const {
    isOpen: isEditPostModalOpen,
    onOpen: onEditPostModalOpen,
    onClose: onEditPostModalClose,
  } = useDisclosure();

  React.useEffect(() => {
    setPostScore(post?.postScores?.[0]);
  }, [post?.postScores]);

  const hasVoted = React.useMemo(
    () => postScore?.userId === currentUser?.id,
    [postScore, currentUser]
  );

  React.useEffect(() => {
    setPostVoteCount(post?.score);
  }, [post?.score]);

  React.useEffect(() => {
    setPostCommentsCount(post?.commentsCount);
  }, [post?.commentsCount]);

  const [updatePostScore] = useMutation(UPDATE_POST_SCORE, {
    // refetchQueries: [
    //   { query: queryToRefetch, variables: queryVariables ?? {} },
    // ],
    onError(error, clientOptions?) {
      // set error
    },
    onCompleted(data, clientOptions) {
      const updatedPostScore = data.updatePostScore.postScores[0];

      if (postScore?.direction === "UPVOTE" && !updatedPostScore) {
        setPostVoteCount(postVoteCount - 1);
      } else if (postScore?.direction === "DOWNVOTE" && !updatedPostScore) {
        setPostVoteCount(postVoteCount + 1);
      } else if (
        postScore?.direction === "UPVOTE" &&
        updatedPostScore.direction === "DOWNVOTE"
      ) {
        setPostVoteCount(postVoteCount - 2);
      } else if (
        postScore?.direction === "DOWNVOTE" &&
        updatedPostScore.direction === "UPVOTE"
      ) {
        setPostVoteCount(postVoteCount + 2);
      } else if (!postScore && updatedPostScore.direction === "UPVOTE") {
        setPostVoteCount(postVoteCount + 1);
      } else if (!postScore && updatedPostScore.direction === "DOWNVOTE") {
        setPostVoteCount(postVoteCount - 1);
      }
      setPostScore(updatedPostScore);
    },
  });

  const handleVoteClick = (directionToChange: string) => {
    let direction;
    if (
      (postScore?.direction === "UPVOTE" && directionToChange === "UPVOTE") ||
      (postScore?.direction === "DOWNVOTE" && directionToChange === "DOWNVOTE")
    ) {
      direction = "UNVOTE";
    } else direction = directionToChange;
    updatePostScore({ variables: { direction, postId: post.id } });
  };

  return (
    <div
      className={`forum-post-footer flex items-center p-2 pl-0 pb-0 ${
        isPostDetail && "mb-5"
      }`}
    >
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
                hasVoted && postScore?.direction === "UPVOTE" ? "fill" : "line"
              } text-lg ${
                hasVoted && postScore?.direction === "UPVOTE"
                  ? "text-theme-blue"
                  : ""
              }`}
            ></i>
          </button>
        )}
        <span
          className={`text-xs mr-2 font-semibold ${
            hasVoted
              ? postScore?.direction === "UPVOTE"
                ? "text-theme-blue"
                : postScore?.direction === "DOWNVOTE"
                ? "text-theme-red"
                : ""
              : ""
          }`}
        >
          {postVoteCount === 0 ? "Vote" : postVoteCount}
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
              hasVoted && postScore?.direction === "DOWNVOTE"
                ? "text-theme-red"
                : ""
            }`}
            onClick={() => handleVoteClick("DOWNVOTE")}
          >
            <i
              className={`ri-rocket-2-${
                hasVoted && postScore?.direction === "DOWNVOTE"
                  ? "fill"
                  : "line"
              } text-lg`}
            ></i>
          </button>
        )}
      </div>
      <Link href={getPostDetailPath(post?.id)}>
        <a className="hover:bg-theme-gray-nav-icon-faded rounded">
          <span className="mx-2 inline-flex items-center text-theme-gray-action-icon">
            <i className="ri-chat-1-line text-lg mr-1"></i>
            <span className="text-xs font-medium">
              {numberFormatter?.format(
                isPostDetail ? postCommentsCount : post?.commentsCount
              )}{" "}
              comments
            </span>
          </span>
        </a>
      </Link>
      {isPostDetail && post?.type === PostType.TEXT && (
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-sm py-1.5 px-1 whitespace-nowrap hover:bg-theme-gray-nav-icon-faded text-xs text-theme-gray-action-icon font-medium mr-1"
          onClick={onEditPostModalOpen}
        >
          Edit
        </button>
      )}
      {isEditPostModalOpen && (
        <EditPostModal onClose={onEditPostModalClose} post={post} />
      )}
    </div>
  );
}
