import LoadingWrapper from "../Utils/LoadingWrapper";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { GET_ALL_USERS } from "../../graphql/users/query";
import UserFeed from "../User/UserFeed";
import { useUsersStore } from "../../stores/users";

export default function SearchPeople() {
  const router = useRouter();
  const { pageNo, setPageNo, hasMore, setHasMore } = useUsersStore((state) => ({
    pageNo: state.searchUsersPageNo,
    setPageNo: state.setSearchUsersPageNo,
    hasMore: state.searchUsersHasMore,
    setHasMore: state.setSearchUsersHasMore,
  }));
  const { data, loading, fetchMore } = useQuery(GET_ALL_USERS, {
    variables: {
      search: router.query.q,
      pageNo: 0,
    },
    skip: !router.query.q,
  });

  return (
    <LoadingWrapper isLoading={loading}>
      <UserFeed
        users={data?.getAllUsers}
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
