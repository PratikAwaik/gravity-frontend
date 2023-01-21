import Head from "next/head";
import Feed from "../components/Home/Feed";
import LoadingWrapper from "../components/Utils/LoadingWrapper";
import { useQuery } from "@apollo/client";
import { useEffect } from "react";
import { GET_ALL_POSTS } from "../graphql/posts/query";
import { LOCAL_STORAGE_KEYS, PAGES } from "../utils/constants";
import { scrollToPreviousPosition } from "../utils/helpers/posts";
import { usePostsStore } from "../stores/posts";

export default function Home() {
  const { pageNo, setPageNo, hasMore, setHasMore } = usePostsStore((state) => ({
    pageNo: state.homePageNo,
    setPageNo: state.setHomePageNo,
    hasMore: state.homeHasMore,
    setHasMore: state.setHomeHasMore,
  }));
  const { loading, data, fetchMore } = useQuery(GET_ALL_POSTS, {
    variables: {
      pageNo: 0,
    },
  });

  useEffect(() => {
    scrollToPreviousPosition(LOCAL_STORAGE_KEYS.HOME_SCROLL_POSITION);
  }, []);

  return (
    <>
      <Head>
        <title>Gravity</title>
      </Head>
      <div className="w-full h-full">
        <div className="py-5 px-6 flex items-center justify-center">
          <div className="forum max-w-3xl h-full">
            <LoadingWrapper isLoading={loading}>
              <Feed
                serverPosts={data?.allPosts ?? []}
                fetchMore={fetchMore}
                pageNo={pageNo}
                setPageNo={setPageNo}
                hasMore={hasMore}
                setHasMore={setHasMore}
              />
            </LoadingWrapper>
          </div>
        </div>
      </div>
    </>
  );
}
