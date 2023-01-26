import Feed from "../Home/Feed";
import { useEffect } from "react";
import { IPost } from "../../models/post";
import { usePostsStore } from "../../stores/posts";
import { LOCAL_STORAGE_KEYS } from "../../utils/constants";
import { scrollToPreviousPosition } from "../../utils/helpers/posts";

interface UserPostsProps {
  userId: string;
  userPosts: IPost[];
  fetchMore: Function;
}

export default function UserPosts({
  userId,
  userPosts,
  fetchMore,
}: UserPostsProps) {
  const { pageNo, setPageNo, hasMore, setHasMore } = usePostsStore((state) => ({
    pageNo: state.userPageNo,
    setPageNo: state.setUserPageNo,
    hasMore: state.userHasMore,
    setHasMore: state.setUserHasMore,
  }));

  useEffect(() => {
    scrollToPreviousPosition(LOCAL_STORAGE_KEYS.USER_SCROLL_POSITION);
  }, []);

  return (
    <Feed
      serverPosts={userPosts}
      fetchMore={fetchMore}
      pageNo={pageNo}
      setPageNo={setPageNo}
      hasMore={hasMore}
      setHasMore={setHasMore}
      userId={userId}
      isUserPosts
    />
  );
}
