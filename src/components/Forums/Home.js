import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPostsDispatcher } from "../../dispatchers/forums";
import Forums from "./Forums";
import { sortByDate } from "../../helpers";

const Home = () => {
  const dispatch = useDispatch();
  const forums = useSelector((state) => sortByDate(state.forums, true));

  useEffect(() => {
    (async function () {
      scrollToPreviousPosition();
      await getAllPostsDispatcher(dispatch);
    })();
  }, [dispatch]);

  function scrollToPreviousPosition() {
    const yPosition = window.localStorage.getItem("gravityScrollPosition");
    if (yPosition) {
      window.scrollTo(0, parseInt(yPosition));
      window.localStorage.removeItem("gravityScrollPosition");
    }
  }

  return (
    <div className="mt-16 forums-post-container pt-9 max-w-4xl mx-auto mb-16">
      <Forums posts={forums} />
    </div>
  );
};

export default Home;
