import CommunityFeed from "../Community/CommunityFeed";
import LoadingWrapper from "../Utils/LoadingWrapper";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { GET_SEARCH_COMMUNITIES } from "../../graphql/community/query";
import { useCommunityStore } from "../../stores/community";

export default function SearchCommunities() {
  const router = useRouter();
  const { pageNo, setPageNo, hasMore, setHasMore } = useCommunityStore(
    (state) => ({
      pageNo: state.searchCommunityPageNo,
      setPageNo: state.setSearchCommunityPageNo,
      hasMore: state.searchCommunityHasMore,
      setHasMore: state.setSearchCommunityHasMore,
    })
  );
  const { data, loading, fetchMore } = useQuery(GET_SEARCH_COMMUNITIES, {
    variables: {
      search: router.query.q,
      pageNo: 0,
    },
    skip: !router.query.q,
  });

  return (
    <LoadingWrapper isLoading={loading}>
      <CommunityFeed
        communities={data?.getSearchCommunities}
        fetchMore={fetchMore}
        search={router.query.q as string}
        pageNo={pageNo}
        setPageNo={setPageNo}
        hasMore={hasMore}
        setHasMore={setHasMore}
      />
    </LoadingWrapper>
  );
}
