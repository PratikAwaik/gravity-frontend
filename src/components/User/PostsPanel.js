import React from "react";
import { Tab } from "@headlessui/react";
import Forums from "../Forums/Forums";
import PropTypes from "prop-types";

const PostsPanel = ({ posts, classNames }) => {
  return (
    <Tab.Panel
      className={classNames(
        "bg-white rounded-xl p-3",
        "focus:outline-none focus:ring-2 ring-offset-2 ring-white ring-opacity-60"
      )}
    >
      <Forums posts={posts} />
    </Tab.Panel>
  );
};

PostsPanel.propTypes = {
  posts: PropTypes.array.isRequired,
  classNames: PropTypes.func.isRequired,
};

export default PostsPanel;
