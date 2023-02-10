import InfiniteScrollLoader from "../Utils/InfiniteScrollLoader";
import { useEffect, useRef } from "react";
import { useIntersectionObserver } from "../../hooks/useIntersectionObserver";
import { ICommunity } from "../../models/community";
import { LOCAL_STORAGE_KEYS } from "../../utils/constants";
import { scrollToPreviousPosition } from "../../utils/helpers/posts";
import Link from "next/link";
import CommunityAvatar from "../Utils/CommunityAvatar";
import numberFormatter from "../../utils/helpers/numberFormatter";

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
        <div key={community?.id} className="w-full">
          <Link href={`/community/${community?.id}`}>
            <a className="p-4 flex items-center bg-white border border-theme-post-line">
              <CommunityAvatar
                className="w-8 h-8 flex-shrink-0"
                community={community}
              />
              <div className="pl-2">
                <div className="flex items-center mb-1">
                  <h6 className="text-xs font-bold leading-4">
                    {community?.prefixedName}
                  </h6>
                  <span className="mini-dot"></span>
                  <p className="text-xs leading-4 text-theme-meta-text">
                    {numberFormatter.format(community?.membersCount)} Members
                  </p>
                </div>
                <p
                  className="font-theme-font-family-noto text-theme-meta-text text-xs leading-[18px] text-ellipsis overflow-hidden w-full"
                  style={{
                    display: "-webkit-box",
                    WebkitLineClamp: "1",
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  {community?.description}
                </p>
              </div>
            </a>
          </Link>
        </div>
      ))}
      <InfiniteScrollLoader ref={ref} hasMore={hasMore} />
    </div>
  );
}
