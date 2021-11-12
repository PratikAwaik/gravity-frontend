import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPostsDispatcher } from "../../dispatchers/forums";
import Forums from "./Forums";
import InfiniteScrollWrapper from "../Utils/InfiniteScrollWrapper";
import LoadingWrapper from "../Utils/LoadingWrapper";

const fetchData = async (dispatch, { page, limit }) => {
  await getAllPostsDispatcher(dispatch, {
    page: page + 1,
    limit: limit,
  });
};

const Home = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const forums = useSelector((state) => state.forums);

  useEffect(() => {
    (async () => {
      if (forums.page === 0) {
        await fetchData(dispatch, { page: forums.page, limit: forums.limit });
      }
      setLoading(false);
    })();
  }, [dispatch, forums.limit, forums.page]);

  return (
    <LoadingWrapper loading={loading}>
      <div className="mt-16 forums-post-container pt-6 sm:pt-9 max-w-4xl mx-auto mb-24 sm:mb-16">
        <InfiniteScrollWrapper
          dataLength={forums.results.length}
          nextFunc={() =>
            fetchData(dispatch, { page: forums.page, limit: forums.limit })
          }
          hasMore={forums.results.length % forums.limit === 0}
        >
          <Forums posts={forums.results} />
        </InfiniteScrollWrapper>
      </div>
    </LoadingWrapper>
  );
};

export default Home;
