import InfiniteScrollLoader from "../Utils/InfiniteScrollLoader";
import { useEffect, useRef } from "react";
import { useIntersectionObserver } from "../../hooks/useIntersectionObserver";
import { IUser } from "../../models/user";
import { LOCAL_STORAGE_KEYS } from "../../utils/constants";
import { scrollToPreviousPosition } from "../../utils/helpers/posts";

interface UserFeedProps {
  users: IUser[];
  search?: string;
  fetchMore: Function;
  pageNo: number;
  setPageNo: (pageNo: number) => void;
  hasMore: boolean;
  setHasMore: (hasMore: boolean) => void;
}

export default function UserFeed({
  users,
  fetchMore,
  search,
  pageNo,
  setPageNo,
  hasMore,
  setHasMore,
}: UserFeedProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const isIntersecting = useIntersectionObserver(ref);

  useEffect(() => {
    scrollToPreviousPosition(LOCAL_STORAGE_KEYS.SEARCH_USERS_SCROLL_POSITION);
  }, []);

  useEffect(() => {
    (async () => {
      if (isIntersecting && (hasMore || pageNo === 0) && users?.length > 0) {
        const fetchMoreResult = await fetchMore({
          variables: {
            pageNo: pageNo + 1,
            search: search,
          },
          skip: !search,
        });
        setHasMore(fetchMoreResult?.data?.getAllUsers?.length === 12);
        setPageNo(pageNo + 1);
      }
    })();
  }, [isIntersecting]);

  return (
    <div className="w-full">
      {users?.map((community: IUser) => (
        <div key={community?.id}></div>
      ))}
      <InfiniteScrollLoader ref={ref} hasMore={hasMore} />
    </div>
  );
}
