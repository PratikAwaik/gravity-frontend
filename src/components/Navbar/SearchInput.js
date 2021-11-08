import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

const setStateBasedOnLocation = (
  pathname,
  subreddits,
  setSubredditSelected
) => {
  const parsedPathname = pathname.split("/").filter((path) => path !== "");
  if (parsedPathname[0] === "r") {
    const targetSubreddit = subreddits.find(
      (sr) => sr.id === parsedPathname[1]
    );
    setSubredditSelected(targetSubreddit || {});
  } else {
    setSubredditSelected({});
  }
};

const SearchInput = () => {
  const [value, setValue] = useState("");
  const [searchResult, setSearchResult] = useState({
    subreddits: [],
    posts: [],
  });
  const [clickedOutside, setClickedOutside] = useState(true);
  const [subredditSelected, setSubredditSelected] = useState({});
  const { subreddits, forums } = useSelector((state) => state);
  const searchRef = useRef();
  const location = useLocation();

  useEffect(() => {
    setStateBasedOnLocation(
      location.pathname,
      subreddits,
      setSubredditSelected
    );
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [location, subreddits]);

  function handleClickOutside(e) {
    if (!searchRef.current.contains(e.target)) {
      setClickedOutside(true);
    }
  }

  function handleClickInside() {
    return setClickedOutside(false);
  }

  const handleInputChange = (e) => {
    e.preventDefault();
    const value = e.target.value;
    setValue(value);
    const result = {
      posts: value
        ? forums.filter((post) =>
            post.title.toLowerCase().trim().includes(value.toLowerCase().trim())
          )
        : [],
      subreddits: value
        ? subreddits.filter((sr) =>
            sr.name.toLowerCase().trim().includes(value.toLowerCase().trim())
          )
        : [],
    };
    setSearchResult(result);
  };

  const handleLinkClick = (result) => {
    setSubredditSelected(result);
    setValue("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div
      className={`flex flex-grow items-stretch max-w-2xl rounded border relative border-gray-400 ${
        !clickedOutside ? "ring" : ""
      }`}
      onClick={handleClickInside}
    >
      <form onSubmit={handleSubmit} className="w-full flex items-center">
        <span className="h-full font-normal text-center text-gray-400 bg-transparent rounded text-base justify-center w-8 pl-2 py-1 flex items-center">
          <i className="ri-search-line text-xl"></i>
        </span>
        {subredditSelected.id && (
          <div className="left-10 font-normal text-center bg-gray-200 text-base justify-center py-1 px-5 flex items-center rounded-3xl mx-2">
            <img
              className="w-5 h-5 rounded-full object-cover mr-2"
              src={subredditSelected.communityIcon}
              alt="Selected Subreddit's Community Icon"
            />
            <span className="font-bold text-sm sm:text-md">
              {subredditSelected.prefixedName}
            </span>
          </div>
        )}
        <input
          type="text"
          placeholder="Search Gravity"
          className="px-3 py-1 placeholder-gray-400 text-gray-600 relative bg-white border-none pl-1.5 text-base outline-none w-full"
          onChange={handleInputChange}
          value={value}
        />
      </form>

      <div ref={searchRef} className="absolute w-full top-16 z-50">
        {!clickedOutside &&
          (searchResult.subreddits.length > 0 ||
            searchResult.posts.length > 0) && (
            <div className="max-h-72 overflow-y-auto bg-white border-2 border-theme-white rounded-md">
              <div className="w-full">
                {searchResult.subreddits.map((result) => (
                  <Link
                    key={result.id}
                    to={`/r/${result.id}`}
                    className="flex items-center py-4 px-3 border-b-2 border-gray-300 hover:bg-gray-200"
                    onClick={() => handleLinkClick(result)}
                  >
                    <img
                      className="w-7 h-7 rounded-full mr-3"
                      src={result.communityIcon}
                      alt="Subreddit Community Icon"
                    />
                    <span className="font-bold mr-3">{result.name}</span>
                    <div className="w-1 h-1 rounded-full bg-theme-black mr-3"></div>
                    <span className="text-theme-gray text-sm">
                      {result.members.length} Members
                    </span>
                  </Link>
                ))}

                {searchResult.posts.map((post) => (
                  <Link
                    key={post.id}
                    to={`/forums/${post.id}`}
                    className="flex items-center py-4 px-3 border-b-2 border-gray-300 hover:bg-gray-200"
                  >
                    <p className="font-bold text-lg">{post.title}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}
      </div>
    </div>
  );
};

export default SearchInput;
