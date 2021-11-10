import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import { getAllPostsDispatcher } from "../../dispatchers/forums";
import Forums from "./Forums";
import loading from "../../images/loading-icon.gif";

const fetchData = async (dispatch, { page, limit }) => {
  console.log(page, limit);
  scrollToPreviousPosition();
  await getAllPostsDispatcher(dispatch, {
    page: page + 1,
    limit: limit,
  });
};

function scrollToPreviousPosition() {
  const yPosition = window.localStorage.getItem("gravityScrollPosition");
  if (yPosition) {
    window.scrollTo(0, parseInt(yPosition));
    window.localStorage.removeItem("gravityScrollPosition");
  }
}

const Home = () => {
  const dispatch = useDispatch();
  const forums = useSelector((state) => state.forums);

  useEffect(() => {
    // (async function () {
    //   scrollToPreviousPosition();
    //   await getAllPostsDispatcher(dispatch, {
    //     page: forums.page + 1,
    //     limit: forums.limit,
    //   });
    // })();
    fetchData(dispatch, { page: 0, limit: forums.limit });
  }, [dispatch, forums.limit]);

  return (
    <div className="mt-16 forums-post-container pt-6 sm:pt-9 max-w-4xl mx-auto mb-24 sm:mb-16">
      <InfiniteScroll
        dataLength={forums.results.length}
        next={() =>
          fetchData(dispatch, { page: forums.page, limit: forums.limit })
        }
        hasMore={true}
        loader={
          <div>
            <img src={loading} alt="Loading Icon" />
          </div>
        }
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        <Forums posts={forums.results} />
      </InfiniteScroll>
    </div>
  );
};

export default Home;
