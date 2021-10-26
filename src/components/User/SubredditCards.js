import React from "react";
import { Link } from "react-router-dom";

const SubredditCards = ({ subreddits, headText }) => {
  return (
    <div className="flex flex-col mb-5 overflow-x-auto">
      <div className="bg-gray-500 w-full px-2 py-1 text-lg text-theme-white rounded-md">
        {headText}
      </div>
      <div className="flex items-center">
        {subreddits.map((subreddit) => (
          <Link
            key={subreddit.id}
            to={`/r/${subreddit.id}`}
            className="relative rounded-md shadow-md p-2 mt-3 mr-5 mb-3 w-60 flex flex-col items-center"
          >
            <div
              className="absolute top-0 left-0 rounded-t-md z-0 w-full h-14"
              style={{ backgroundColor: subreddit.coverColor }}
            ></div>
            <div className="mx-auto flex flex-col items-center z-10 mt-3">
              <img
                className="w-14 h-14 rounded-full"
                src={subreddit.communityIcon}
                alt="Subreddit Icon"
              />
              <span className="mt-2 font-bold text-base">{subreddit.name}</span>
            </div>

            <span className="text-sm my-3">
              {subreddit.members.length} members
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SubredditCards;