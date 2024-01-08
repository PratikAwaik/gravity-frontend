import Feed from "../Home/Feed";
import LoadingWrapper from "../Utils/LoadingWrapper";
import {useEffect} from "react";
import {usePostsStore} from "../../stores/posts";
import {LOCAL_STORAGE_KEYS} from "../../utils/constants";
import {scrollToPreviousPosition} from "../../utils/helpers/posts";
import {useQuery} from "@apollo/client";
import {GET_ALL_POSTS} from "../../graphql/posts/query";

interface UserPostsProps {
  userId: string;
}

export default function UserPosts({userId}: UserPostsProps) {
  const {pageNo, setPageNo, hasMore, setHasMore} = usePostsStore((state) => ({
    pageNo: state.userPageNo,
    setPageNo: state.setUserPageNo,
    hasMore: state.userHasMore,
    setHasMore: state.setUserHasMore,
  }));
  const {data, loading, fetchMore} = useQuery(GET_ALL_POSTS, {
    variables: {
      userId: userId,
      pageNo: 0,
    },
    skip: !userId,
  });

  useEffect(() => {
    scrollToPreviousPosition(LOCAL_STORAGE_KEYS.USER_POSTS_SCROLL_POSITION);
  }, []);

  return (
    <LoadingWrapper isLoading={loading}>
      <Feed
        serverPosts={data?.allPosts}
        fetchMore={fetchMore}
        pageNo={pageNo}
        setPageNo={setPageNo}
        hasMore={hasMore}
        setHasMore={setHasMore}
        userId={userId}
        isUserPosts
      />
    </LoadingWrapper>
  );
}
