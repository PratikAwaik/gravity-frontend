import FeedComment from "./FeedComment";
import InfiniteScrollLoader from "../Utils/InfiniteScrollLoader";
import { IComment } from "../../models/comment";
import { useEffect, useRef } from "react";
import { useIntersectionObserver } from "../../hooks/useIntersectionObserver";
import { useCommentsStore } from "../../stores/comments";
import { scrollToPreviousPosition } from "../../utils/helpers/posts";
import { LOCAL_STORAGE_KEYS } from "../../utils/constants";

interface UserCommentsFeedProps {
  userId: string;
  userComments: IComment[];
  fetchMore: Function;
}

export default function UserCommentsFeed({
  userId,
  userComments,
  fetchMore,
}: UserCommentsFeedProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const isIntersecting = useIntersectionObserver(ref);

  const { pageNo, setPageNo, hasMore, setHasMore } = useCommentsStore(
    (state) => ({
      pageNo: state.userCommentsPageNo,
      setPageNo: state.setUserCommentsPageNo,
      hasMore: state.userCommentsHasMore,
      setHasMore: state.setUserCommentsHasMore,
    })
  );

  useEffect(() => {
    scrollToPreviousPosition(LOCAL_STORAGE_KEYS.USER_COMMENTS_SCROLL_POSITION);
  }, []);

  useEffect(() => {
    (async () => {
      if (
        isIntersecting &&
        (hasMore || pageNo === 0) &&
        userComments?.length > 0
      ) {
        const fetchMoreResult = await fetchMore({
          variables: {
            pageNo: pageNo + 1,
            userId: userId,
          },
          skip: !userId,
        });
        setHasMore(fetchMoreResult?.data?.getAllUserComments?.length === 12);
        setPageNo(pageNo + 1);
      }
    })();
  }, [isIntersecting]);

  return (
    <div className="w-full">
      {userComments?.map((comment: any) => (
        <FeedComment key={comment?.id} comment={comment} />
      ))}
      <InfiniteScrollLoader ref={ref} hasMore={hasMore} />
    </div>
  );
}