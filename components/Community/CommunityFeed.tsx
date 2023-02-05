import InfiniteScrollLoader from "../Utils/InfiniteScrollLoader";
import { useEffect, useRef } from "react";
import { useIntersectionObserver } from "../../hooks/useIntersectionObserver";
import { ICommunity } from "../../models/community";
import { LOCAL_STORAGE_KEYS } from "../../utils/constants";
import { scrollToPreviousPosition } from "../../utils/helpers/posts";

interface CommunityFeedProps {
  communities: ICommunity[];
  search?: string;
  fetchMore: Function;
  pageNo: number;
  setPageNo: (pageNo: number) => void;
  hasMore: boolean;
  setHasMore: (hasMore: boolean) => void;
}

export default function CommunityFeed({
  communities,
  search,
  pageNo,
  setPageNo,
  hasMore,
  setHasMore,
  fetchMore,
}: CommunityFeedProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const isIntersecting = useIntersectionObserver(ref);

  useEffect(() => {
    scrollToPreviousPosition(
      LOCAL_STORAGE_KEYS.SEARCH_COMMUNITIES_SCROLL_POSITION
    );
  }, []);

  useEffect(() => {
    (async () => {
      if (
        isIntersecting &&
        (hasMore || pageNo === 0) &&
        communities?.length > 0
      ) {
        const fetchMoreResult = await fetchMore({
          variables: {
            pageNo: pageNo + 1,
            search: search,
          },
          skip: !search,
        });
        setHasMore(fetchMoreResult?.data?.getSearchCommunities?.length === 12);
        setPageNo(pageNo + 1);
      }
    })();
  }, [isIntersecting]);

  return (
    <div className="w-full">
      {communities?.map((community: ICommunity) => (
        <div key={community?.id}></div>
      ))}
      <InfiniteScrollLoader ref={ref} hasMore={hasMore} />
    </div>
  );
}
