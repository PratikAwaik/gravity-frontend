import { useQuery } from "@apollo/client";
import { useEffect } from "react";
import { GET_ALL_POSTS } from "../../graphql/posts/query";
import { usePostsStore } from "../../stores/posts";
import { LOCAL_STORAGE_KEYS } from "../../utils/constants";
import { scrollToPreviousPosition } from "../../utils/helpers/posts";
import Feed from "../Home/Feed";

interface UserPostsProps {
  userId: string;
}

export default function UserPosts({ userId }: UserPostsProps) {
  const { pageNo, setPageNo, hasMore, setHasMore } = usePostsStore((state) => ({
    pageNo: state.userPageNo,
    setPageNo: state.setUserPageNo,
    hasMore: state.userHasMore,
    setHasMore: state.setUserHasMore,
  }));
  const { data, loading, fetchMore } = useQuery(GET_ALL_POSTS, {
    variables: {
      userId: userId,
      pageNo: 0,
    },
    skip: !userId,
  });

  useEffect(() => {
    setPageNo(0);
    setHasMore(false);
    scrollToPreviousPosition(LOCAL_STORAGE_KEYS.USER_SCROLL_POSITION);
  }, []);

  if (loading) return null;

  return (
    <>
      <Feed
        serverPosts={data?.allPosts}
        fetchMore={fetchMore}
        pageNo={pageNo}
        setPageNo={setPageNo}
        hasMore={hasMore}
        setHasMore={setHasMore}
      />
    </>
  );
}
