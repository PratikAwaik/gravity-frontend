import LoadingWrapper from "../Utils/LoadingWrapper";
import Feed from "../Home/Feed";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { GET_ALL_POSTS } from "../../graphql/posts/query";
import { usePostsStore } from "../../stores/posts";

export default function SearchPostsWrapper() {
  const router = useRouter();
  const { pageNo, setPageNo, hasMore, setHasMore } = usePostsStore((state) => ({
    pageNo: state.searchPageNo,
    setPageNo: state.setSearchPageNo,
    hasMore: state.searchHasMore,
    setHasMore: state.setSearchHasMore,
  }));
  const { data, loading, fetchMore } = useQuery(GET_ALL_POSTS, {
    variables: {
      search: router.query.q,
      pageNo: 0,
    },
    skip: !router.query.q,
  });

  return (
    <LoadingWrapper isLoading={loading}>
      <Feed
        serverPosts={data?.allPosts}
        fetchMore={fetchMore}
        pageNo={pageNo}
        setPageNo={setPageNo}
        hasMore={hasMore}
        setHasMore={setHasMore}
        search={router.query.q as string}
      />
    </LoadingWrapper>
  );
}
