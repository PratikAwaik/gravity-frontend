import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const SubredditCards = ({ subreddits, headText }) => {
  return (
    <div className="flex flex-col mb-7 px-2">
      <div className="tab tab-selected ml-0">{headText}</div>
      <div className="w-full overflow-x-auto">
        <div className="w-max flex items-center">
          {subreddits.map((subreddit) => (
            <Link
              key={subreddit.id}
              to={`/r/${subreddit.id}`}
              className="relative rounded-md shadow-md p-2 mt-3 mr-5 mb-3 w-56 flex flex-col items-center"
            >
              <div
                className="absolute top-0 left-0 rounded-t-md z-0 w-full h-14"
                style={{ backgroundColor: subreddit.coverColor }}
              ></div>
              <div className="mx-auto flex flex-col items-center z-10 mt-3">
                <div className="bg-white flex items-center justify-center rounded-full w-16 h-16">
                  <img
                    className="w-14 h-14 rounded-full"
                    src={subreddit.communityIcon}
                    alt="Subreddit Icon"
                  />
                </div>
                <span className="mt-2 font-bold text-base">
                  {subreddit.name}
                </span>
              </div>

              <span className="text-sm my-3">
                {subreddit.members.length} members
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

SubredditCards.propTypes = {
  subreddits: PropTypes.array.isRequired,
  headText: PropTypes.string.isRequired,
};

export default SubredditCards;
