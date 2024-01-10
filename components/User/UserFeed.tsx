import InfiniteScrollLoader from "../Utils/InfiniteScrollLoader";
import {useEffect, useRef} from "react";
import {useIntersectionObserver} from "../../hooks/useIntersectionObserver";
import {IUser} from "../../models/user";
import {LOCAL_STORAGE_KEYS} from "../../utils/constants";
import {scrollToPreviousPosition} from "../../utils/helpers/posts";
import Link from "next/link";
import UserAvatar from "../Utils/UserAvatar";
import numberFormatter from "../../utils/helpers/numberFormatter";
import EmptyState from "../Utils/EmptyState";
import sadSvg from "../../public/images/sad.svg";

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
      {users?.length > 0 ? (
        <>
          {users?.map((user: IUser) => (
            <div key={user?.id}>
              <Link href={`/user/${user?.username}`}>
                <a className="p-4 flex items-center bg-white border border-theme-post-line">
                  <UserAvatar user={user} size={36} square={false} />
                  <div className="flex items-center pl-2">
                    <h6 className="text-xs font-bold">{user?.prefixedName}</h6>
                    <span className="mini-dot"></span>
                    <p className="text-xs text-theme-meta-text">
                      {numberFormatter.format(user?.karma)} Karma
                    </p>
                  </div>
                </a>
              </Link>
            </div>
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
