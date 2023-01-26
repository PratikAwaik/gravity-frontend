import * as React from "react";
import Link from "next/link";
import EditPostModal from "./EditPostModal";
import numberFormatter from "../../utils/helpers/numberFormatter";
import { useMutation } from "@apollo/client";
import { UPDATE_POST_SCORE } from "../../graphql/posts/mutations";
import { IPost, PostType } from "../../models/post";
import { useAuth } from "../../utils/Auth";
import { getPostDetailPath, PAGES } from "../../utils/constants";
import { useDisclosure } from "../../hooks/useDisclosure";
import { storeScrollPosition } from "../../utils/helpers/posts";

interface PostFooterProps {
  post: IPost;
  isPostDetail: boolean;
  isCommunityPosts?: boolean;
  isUserPosts?: boolean;
}

export default function PostFooter({
  post,
  isPostDetail,
  isCommunityPosts = false,
  isUserPosts = false,
}: PostFooterProps) {
  const { currentUser } = useAuth();
  const {
    isOpen: isEditPostModalOpen,
    onOpen: onEditPostModalOpen,
    onClose: onEditPostModalClose,
  } = useDisclosure();

  const postScore = React.useMemo(
    () => post?.postScores?.[0],
    [post?.postScores]
  );

  const hasVoted = React.useMemo(
    () => postScore?.userId === currentUser?.id,
    [postScore, currentUser]
  );

  const [updatePostScore] = useMutation(UPDATE_POST_SCORE, {
    update(cache, { data: { updatePostScore } }) {
      cache.modify({
        id: cache.identify(updatePostScore),
        fields: {
          postScores() {
            return updatePostScore?.postScores;
          },
          score() {
            return updatePostScore?.score;
          },
        },
      });
    },
    onError(error, clientOptions?) {
      // set error
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
      <div className="flex items-center z-10">
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
          {post?.score === 0 ? "Vote" : post?.score}
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
        <a
          className="hover:bg-theme-gray-nav-icon-faded rounded z-10"
          onClick={() =>
            storeScrollPosition(isPostDetail, isCommunityPosts, isUserPosts)
          }
        >
          <span className="mx-2 inline-flex items-center text-theme-gray-action-icon">
            <i className="ri-chat-1-line text-lg mr-1"></i>
            <span className="text-xs font-medium">
              {numberFormatter?.format(post?.commentsCount)} comments
            </span>
          </span>
        </a>
      </Link>
      {isPostDetail &&
        post?.type === PostType.TEXT &&
        currentUser?.id === post?.author?.id && (
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
