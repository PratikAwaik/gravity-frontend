import { useMutation } from "@apollo/client";
import Link from "next/link";
import * as React from "react";
import { UPDATE_POST_SCORE } from "../../graphql/posts/mutations";
import { GET_ALL_POSTS } from "../../graphql/posts/query";
import { Post, PostScore } from "../../models/post";
import { useAuth } from "../../utils/Auth";
import { PAGES } from "../../utils/constants";
import numberFormatter from "../../utils/helpers/numberFormatter";

interface PostFooterProps {
  post: Post;
  isPostDetail: boolean;
}

export default function PostFooter({ post, isPostDetail }: PostFooterProps) {
  if (!post) return null;

  const { currentUser } = useAuth();
  const [postVoteCount, setPostVoteCount] = React.useState<number>(0);
  const [postScore, setPostScore] = React.useState<PostScore | null>(null);

  React.useEffect(() => {
    setPostScore(post.postScores[0]);
  }, [post.postScores]);

  // const postScore = React.useMemo(
  //   () => post.postScores?.[0],
  //   [post.postScores]
  // );
  const hasVoted = React.useMemo(
    () => postScore?.userId === currentUser?.id,
    [postScore, currentUser]
  );

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

  React.useEffect(() => {
    setPostVoteCount(post.score);
  }, [post.score]);

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
          className={`text-sm mr-2 font-semibold ${
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
      <Link href={`forums/${post.id}`}>
        <a className="hover:bg-theme-gray-nav-icon-faded">
          <span className="mx-2 inline-flex items-center text-theme-gray-action-icon">
            <i className="ri-chat-1-line text-lg mr-1"></i>
            <span className="text-sm font-medium">
              {numberFormatter.format(post.commentsCount)} comments
            </span>
          </span>
        </a>
      </Link>
    </div>
  );
}
