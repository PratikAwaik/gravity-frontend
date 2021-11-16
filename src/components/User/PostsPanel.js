import React from "react";
import { Tab } from "@headlessui/react";
import Forums from "../Forums/Forums";
import PropTypes from "prop-types";
import InfiniteScrollWrapper from "../Utils/InfiniteScrollWrapper";
import { useDispatch } from "react-redux";
import { setNextPostsDispatcher } from "../../dispatchers/forums";
import { useParams } from "react-router";

const PostsPanel = ({ forums, classNames }) => {
  const params = useParams();
  const dispatch = useDispatch();

  return (
    <Tab.Panel
      className={classNames(
        "bg-white rounded-xl py-3",
        "focus:outline-none focus:ring-2 ring-offset-2 ring-white ring-opacity-60"
      )}
    >
      <InfiniteScrollWrapper
        dataLength={forums.results.length}
        nextFunc={() =>
          setNextPostsDispatcher(dispatch, {
            page: forums.page,
            limit: forums.limit,
          }, `${process.env.REACT_APP_API_URL}/api/users/${params.id}/posts`)
        }
        hasMore={forums.results.length % forums.limit === 0}
      >
        <Forums posts={forums.results} />
      </InfiniteScrollWrapper>
    </Tab.Panel>
  );
};

PostsPanel.propTypes = {
  posts: PropTypes.array.isRequired,
  classNames: PropTypes.func.isRequired,
};

export default PostsPanel;
