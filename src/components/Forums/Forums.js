import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPostsDispatcher } from "../../dispatchers/forums";
import { currentUserDetailsDispatcher } from "../../dispatchers/user";
import { sortByDate } from "../../helpers";

const ForumPost = React.lazy(() => import("./ForumPost"));

const Forums = () => {
  const dispatch = useDispatch();
  const forums = useSelector((state) => sortByDate(state.forums, true));
  const currentUser = useSelector((state) => state.currentUser);

  useEffect(() => {
    (async function () {
      scrollToPreviousPosition();
      await getAllPostsDispatcher(dispatch);
    })();
  }, [dispatch]);

  useEffect(() => {
    if (currentUser.id) currentUserDetailsDispatcher(dispatch);
  }, [dispatch, currentUser.id]);

  function scrollToPreviousPosition() {
    const yPosition = window.localStorage.getItem("gravityScrollPosition");
    if (yPosition) {
      window.scrollTo(0, parseInt(yPosition));
      window.localStorage.removeItem("gravityScrollPosition");
    }
  }

  return (
    <div className="mt-16 forums-post-container pt-9 max-w-4xl mx-auto mb-16">
      <div className="forums-post-wrapper">
        {forums.map((post) => (
          <React.Suspense key={post.id}>
            <ForumPost forums={forums} currentUser={currentUser} post={post} />
          </React.Suspense>
        ))}
      </div>
    </div>
  );
};

export default Forums;
