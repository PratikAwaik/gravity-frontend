import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { GET_ALL_COMMENTS } from "../../graphql/comments/query";
import { useCommentsStore } from "../../stores/comments";
import CommentsFeed from "../Comments/CommentsFeed";
import LoadingWrapper from "../Utils/LoadingWrapper";

export default function SearchComments() {
  const router = useRouter();
  const { pageNo, setPageNo, hasMore, setHasMore } = useCommentsStore(
    (state) => ({
      pageNo: state.searchCommentsPageNo,
      setPageNo: state.setSearchCommentsPageNo,
      hasMore: state.searchCommentsHasMore,
      setHasMore: state.setSearchCommentsHasMore,
    })
  );
  const { data, loading, fetchMore } = useQuery(GET_ALL_COMMENTS, {
    variables: {
      search: router.query.q,
      pageNo: 0,
    },
    skip: !router.query.q,
  });

  return (
    <LoadingWrapper isLoading={loading}>
      <CommentsFeed
        search={router.query.q as string}
        fetchMore={fetchMore}
        pageNo={pageNo}
        setPageNo={setPageNo}
        hasMore={hasMore}
        setHasMore={setHasMore}
        comments={data?.getAllComments}
      />
    </LoadingWrapper>
  );
}
