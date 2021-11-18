import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setNextPostsDispatcher,
  setPostsDispatcher,
} from "../../dispatchers/forums";
import Forums from "./Forums";
import InfiniteScrollWrapper from "../Utils/InfiniteScrollWrapper";
import LoadingWrapper from "../Utils/LoadingWrapper";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const forums = useSelector((state) => state.forums);

  useEffect(() => {
    (async () => {
      if (forums.page === 1) {
        await setPostsDispatcher(dispatch);
      }
      setLoading(false);
      window.scrollTo(0, 0);
    })();
  }, [dispatch, forums.page]);

  return (
    <LoadingWrapper loading={loading} width="w-screen" height="h-screen">
      <div className="mt-16 forums-post-container pt-6 sm:pt-9 max-w-4xl mx-auto mb-24 sm:mb-16">
        <InfiniteScrollWrapper
          dataLength={forums.results.length}
          nextFunc={() =>
            setNextPostsDispatcher(dispatch, "page", {
              page: forums.page,
              limit: forums.limit,
            })
          }
          hasMore={forums.hasMore}
        >
          <Forums posts={forums.results} />
        </InfiniteScrollWrapper>
      </div>
    </LoadingWrapper>
  );
};

export default Home;
