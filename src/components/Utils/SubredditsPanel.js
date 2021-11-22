import { Tab } from "@headlessui/react";
import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { classNames } from "../../helpers";

const SubredditsPanel = ({ subreddits }) => {
  return (
    <Tab.Panel
      className={classNames(
        "bg-white rounded-xl py-3",
        "focus:outline-none focus:ring-2 ring-offset-2 ring-white ring-opacity-60"
      )}
    >
      {subreddits.length > 0 ? (
        subreddits.map((subreddit) => (
          <Link
            key={subreddit.id}
            to={`/r/${subreddit.id}`}
            className="flex items-center px-1.5 py-3 shadow-md sm:rounded-md border-2 mb-4"
          >
            <div className="w-16 h-16 border-4 border-theme-white flex items-center justify-center flex-shrink-0 rounded-full mr-3">
              <img
                className="w-12 h-12 rounded-full object-cover"
                src={subreddit.communityIcon}
                alt="Subreddit Icon"
              />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center mb-1">
                <span className="text-sm font-bold">
                  {subreddit.prefixedName}
                </span>
                <span className="mini-dot"></span>
                <span className="text-theme-gray text-sm">
                  {subreddit.membersCount} members
                </span>
              </div>
              <span className="text-theme-gray text-sm">
                {subreddit.description}
              </span>
            </div>
          </Link>
        ))
      ) : (
        <span className="block text-center text-2xl">Nothing here yet...</span>
      )}
    </Tab.Panel>
  );
};

SubredditsPanel.propTypes = {
  subreddits: PropTypes.array.isRequired,
};

export default SubredditsPanel;
