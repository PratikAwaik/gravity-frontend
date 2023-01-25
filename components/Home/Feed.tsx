import LoadingIcon from "../Utils/LoadingIcon";
import FeedPost from "./FeedPost";
import { useEffect, useRef } from "react";
import { useIntersectionObserver } from "../../hooks/useIntersectionObserver";
import { IPost } from "../../models/post";
import { usePostsStore } from "../../stores/posts";

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
}: FeedProps) {
  const ref = useRef(null);
  const isIntersecting = useIntersectionObserver(ref, { threshold: 0.5 });

  useEffect(() => {
    (async () => {
      if (isIntersecting && (hasMore || pageNo === 0)) {
        const fetchMoreResult = await fetchMore({
          variables: {
            pageNo: pageNo + 1,
            communityId: communityId,
            userId: userId,
          },
          skip: (isCommunityPosts && !communityId) || (isUserPosts && !userId),
        });
        setHasMore(fetchMoreResult?.data?.allPosts?.length === 12);
        setPageNo(pageNo + 1);
      }
    })();
  }, [isIntersecting]);

  return (
    <div className="w-full">
      {serverPosts?.map((post: any) => (
        <FeedPost
          post={post}
          key={post.id}
          isCommunityPosts={isCommunityPosts}
          isUserPosts={isUserPosts}
        />
      ))}
      {hasMore ? (
        <LoadingIcon ref={ref} />
      ) : (
        <div className="w-full my-5 flex items-center justify-center">
          You've seen it all!
        </div>
      )}
    </div>
  );
}
