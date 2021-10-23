import React from "react";
import { Link } from "react-router-dom";

const SubredditCard = ({ subreddit }) => {
  return (
    <Link
      to={`/r/${subreddit.id}`}
      className="relative rounded-md shadow-md p-2 mt-3 mr-5 mb-3 w-60 flex flex-col items-center"
    >
      <div
        className="absolute top-0 left-0 rounded-t-md z-0 w-full h-14"
        style={{ backgroundColor: subreddit.coverColor }}
      ></div>
      <div className="mx-auto flex flex-col items-center z-20 mt-3">
        <img
          className="w-14 h-14 rounded-full"
          src={subreddit.communityIcon}
          alt="Subreddit Icon"
        />
        <span className="mt-2 font-bold text-base">{subreddit.name}</span>
      </div>

      <span className="text-sm my-3">{subreddit.members.length} members</span>
    </Link>
  );
};

export default SubredditCard;
