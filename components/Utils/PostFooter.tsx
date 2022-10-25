import * as React from "react";
import Link from "next/link";
import { useAuth } from "../../utils/Auth";
import { PAGES } from "../../utils/constants";
import numberFormatter from "../../utils/helpers/numberFormatter";
import { useMutation } from "@apollo/client";
import { UPDATE_POST_SCORE } from "../../graphql/posts/mutations";
import { GET_ALL_POSTS } from "../../graphql/posts/query";

interface PostFooterProps {
  post: any;
  isPostDetail: boolean;
}

export default function PostFooter({ post, isPostDetail }: PostFooterProps) {
  const { currentUser } = useAuth();

  const postScore = React.useMemo(
    () => post.postScores?.[0],
    [post.postScores]
  );
  const hasVoted = React.useMemo(
    () => postScore?.userId === currentUser?.id,
    [postScore, currentUser]
  );

  const [updatePostScore] = useMutation(UPDATE_POST_SCORE, {
    refetchQueries: [{ query: GET_ALL_POSTS }],
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
      className={`forum-post-footer flex items-center justify-between ${
        isPostDetail && "mb-5"
      }`}
    >
      <div className="flex items-center">
        {!currentUser ? (
          <Link href={PAGES.LOGIN}>
            <a className="mr-2">
              <i className="ri-arrow-up-s-line text-2xl"></i>
            </a>
          </Link>
        ) : (
          <button
            type="button"
            className={`mr-2 hover:text-theme-red ${
              hasVoted && postScore?.direction === "UPVOTE"
                ? "text-theme-red"
                : ""
            }`}
            onClick={() => handleVoteClick("UPVOTE")}
          >
            <i className="ri-arrow-up-s-line text-2xl"></i>
          </button>
        )}

        <span className={`text-base mr-2 ${hasVoted && "text-theme-red"}`}>
          {post.score}
        </span>

        {!currentUser ? (
          <Link href={PAGES.LOGIN}>
            <a className="mr-2">
              <i className="ri-arrow-down-s-line text-2xl"></i>
            </a>
          </Link>
        ) : (
          <button
            type="button"
            className={`mr-2 hover:text-theme-red ${
              hasVoted && postScore?.direction === "DOWNVOTE"
                ? "text-theme-red"
                : ""
            }`}
            onClick={() => handleVoteClick("DOWNVOTE")}
          >
            <i className="ri-arrow-down-s-line text-2xl"></i>
          </button>
        )}

        <span className="text-base mx-2 inline-flex items-center">
          <i className="ri-chat-1-line text-xl mr-1"></i>
          <span>{numberFormatter.format(post.commentsCount)} comments</span>
        </span>
      </div>
    </div>
  );
}
