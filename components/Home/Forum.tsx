import LoadingIcon from "../Utils/LoadingIcon";
import ForumPost from "./ForumPost";
import { useEffect, useRef, useState } from "react";
import { useIntersectionObserver } from "../../hooks/useIntersectionObserver";
import { IPost } from "../../models/post";
import { usePostsStore } from "../../stores/posts";

interface ForumProps {
  serverPosts: IPost[];
  fetchMore: Function;
}

export default function Forum({ serverPosts, fetchMore }: ForumProps) {
  const ref = useRef(null);
  const isIntersecting = useIntersectionObserver(ref, { threshold: 0.5 });
  const { homePageNo, setHomePageNo, hasMore, setHasMore } = usePostsStore(
    (state) => ({
      homePageNo: state.homePageNo,
      setHomePageNo: state.setHomePageNo,
      hasMore: state.homeHasMore,
      setHasMore: state.setHomeHasMore,
    })
  );

  useEffect(() => {
    (async () => {
      if (isIntersecting && (hasMore || homePageNo === 0)) {
        const fetchMoreResult = await fetchMore({
          variables: {
            pageNo: homePageNo + 1,
          },
        });
        setHasMore(fetchMoreResult.data.allPosts.length === 12);
        setHomePageNo(homePageNo + 1);
      }
    })();
  }, [isIntersecting]);

  return (
    <div className="w-full">
      {serverPosts?.map((post: any) => (
        <ForumPost post={post} key={post.id} />
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
