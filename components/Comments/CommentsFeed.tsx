import FeedComment from "../User/FeedComment";
import InfiniteScrollLoader from "../Utils/InfiniteScrollLoader";
import { IComment } from "../../models/comment";
import { useEffect, useRef } from "react";
import { useIntersectionObserver } from "../../hooks/useIntersectionObserver";
import { scrollToPreviousPosition } from "../../utils/helpers/posts";
import { LOCAL_STORAGE_KEYS } from "../../utils/constants";

interface CommentsFeedProps {
  userId?: string;
  search?: string;
  comments: IComment[];
  fetchMore: Function;
  pageNo: number;
  setPageNo: (pageNo: number) => void;
  hasMore: boolean;
  setHasMore: (hasMore: boolean) => void;
}

export default function CommentsFeed({
  userId,
  search,
  comments,
  fetchMore,
  pageNo,
  setPageNo,
  hasMore,
  setHasMore,
}: CommentsFeedProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const isIntersecting = useIntersectionObserver(ref);

  useEffect(() => {
    scrollToPreviousPosition(LOCAL_STORAGE_KEYS.USER_COMMENTS_SCROLL_POSITION);
  }, []);

  useEffect(() => {
    (async () => {
      if (isIntersecting && (hasMore || pageNo === 0) && comments?.length > 0) {
        const fetchMoreResult = await fetchMore({
          variables: {
            pageNo: pageNo + 1,
            userId: userId,
            search: search,
          },
          skip: !userId,
        });
        setHasMore(fetchMoreResult?.data?.getAllComments?.length === 12);
        setPageNo(pageNo + 1);
      }
    })();
  }, [isIntersecting]);

  return (
    <div className="w-full">
      {comments?.map((comment: IComment) => (
        <FeedComment key={comment?.id} comment={comment} />
      ))}
      <InfiniteScrollLoader ref={ref} hasMore={hasMore} />
    </div>
  );
}
