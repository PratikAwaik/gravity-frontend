import { useState } from "react";
import { Tab } from "@headlessui/react";
import PostsPanel from "./PostsPanel";
import CommentsPanel from "./CommentsPanel";
import PropTypes from "prop-types";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Tabs = ({ posts, comments }) => {
  const [categories] = useState({
    Posts: posts,
    Comments: comments,
  });

  return (
    <div className="w-full px-2 pt-4 pb-8 sm:px-0">
      <Tab.Group>
        <Tab.List className="flex p-1 space-x-1 bg-blue-900/20 rounded-xl items-center justify-center">
          {Object.keys(categories).map((category) => (
            <Tab
              key={category}
              className={({ selected }) =>
                classNames(
                  "w-max px-2.5 py-2 text-sm uppercase leading-5 font-medium rounded-lg mx-3",
                  "ring-offset-2 ring-white ring-opacity-60",
                  selected
                    ? "bg-theme-white shadow border-2"
                    : "hover:bg-white/[0.12]"
                )
              }
            >
              {category}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-2">
          <PostsPanel posts={posts} classNames={classNames} />
          <CommentsPanel comments={comments} classNames={classNames} />
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

Tabs.propTypes = {
  posts: PropTypes.array.isRequired,
  comments: PropTypes.array.isRequired,
};

export default Tabs;
