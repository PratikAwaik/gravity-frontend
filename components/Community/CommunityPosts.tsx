import Feed from "../Home/Feed";
import LoadingWrapper from "../Utils/LoadingWrapper";
import { useQuery } from "@apollo/client";
import { GET_ALL_POSTS } from "../../graphql/posts/query";
import { usePostsStore } from "../../stores/posts";
import { useEffect } from "react";
import { scrollToPreviousPosition } from "../../utils/helpers/posts";
import { LOCAL_STORAGE_KEYS } from "../../utils/constants";

interface CommunityPostsProps {
  communityId: string;
}

export default function CommunityPosts({ communityId }: CommunityPostsProps) {
  const { pageNo, setPageNo, hasMore, setHasMore } = usePostsStore((state) => ({
    pageNo: state.communityPageNo,
    setPageNo: state.setCommunityPageNo,
    hasMore: state.communityHasMore,
    setHasMore: state.setCommunityHasMore,
  }));
  const { data, loading, fetchMore } = useQuery(GET_ALL_POSTS, {
    variables: {
      communityId,
      pageNo: 0,
    },
    skip: !communityId,
  });

  useEffect(() => {
    scrollToPreviousPosition(
      LOCAL_STORAGE_KEYS.COMMUNITY_POSTS_SCROLL_POSITION
    );
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
        isCommunityPosts
        communityId={communityId}
      />
    </LoadingWrapper>
  );
}
