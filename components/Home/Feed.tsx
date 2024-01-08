import FeedPost from "./FeedPost";
import InfiniteScrollLoader from "../Utils/InfiniteScrollLoader";
import {useEffect, useRef} from "react";
import {useIntersectionObserver} from "../../hooks/useIntersectionObserver";
import {IPost} from "../../models/post";
import {PAGINATION_LIMIT} from "../../utils/constants";
import EmptyState from "../Utils/EmptyState";
import sadSvg from "../../public/images/sad.svg";

interface FeedProps {
  serverPosts: IPost[];
  fetchMore: Function;
  pageNo: number;
  setPageNo: (pageNo: number) => void;
  hasMore: boolean;
  setHasMore: (hasMore: boolean) => void;
  isCommunityPosts?: boolean;
  communityId?: string;
  isUserPosts?: boolean;
  userId?: string;
  search?: string;
}

export default function Feed({
  serverPosts,
  fetchMore,
  isCommunityPosts = false,
  communityId,
  pageNo,
  setPageNo,
  hasMore,
  setHasMore,
  isUserPosts = false,
  userId,
  search,
}: FeedProps) {
  const ref = useRef(null);
  const isIntersecting = useIntersectionObserver(ref);

  useEffect(() => {
    (async () => {
      if (
        isIntersecting &&
        (hasMore || pageNo === 0) &&
        serverPosts?.length > 0
      ) {
        const fetchMoreResult = await fetchMore({
          variables: {
            pageNo: pageNo + 1,
            communityId: communityId,
            userId: userId,
            search: search,
          },
          skip: (isCommunityPosts && !communityId) || (isUserPosts && !userId),
        });
        setHasMore(
          fetchMoreResult?.data?.allPosts?.length === PAGINATION_LIMIT
        );
        setPageNo(pageNo + 1);
      }
    })();
  }, [isIntersecting]);

  return (
    <div className="w-full">
      {serverPosts?.length > 0 ? (
        <>
          {serverPosts?.map((post: any) => (
            <FeedPost
              post={post}
              key={post.id}
              isCommunityPosts={isCommunityPosts}
              isUserPosts={isUserPosts}
            />
          ))}
          <InfiniteScrollLoader ref={ref} hasMore={hasMore} />
        </>
      ) : (
        <EmptyState
          icon={sadSvg}
          title={
            search && search.length > 0
              ? "No results found!"
              : "Wow, such empty!"
          }
        />
      )}
    </div>
  );
}
