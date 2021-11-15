import React, { Fragment, useState, useEffect } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import axios from "axios";

const ChooseCommunity = ({ subredditSelected, setSubredditSelected }) => {
  const currentUser = useSelector((state) => state.currentUser);
  const [subreddits, setSubreddits] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/users/${currentUser.id}/subreddits`);
      setSubreddits(response.data.subscriptions);
    })();
  }, [currentUser.id]);

  return (
    <div className="w-72 z-20">
      <Listbox
        value={subredditSelected.prefixedName}
        onChange={setSubredditSelected}
      >
        <div className="relative mt-1">
          <Listbox.Button className="mt-3 relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-sm border border-gray-400 cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm">
            <span className="flex items-center text-base truncate">
              {subredditSelected.communityIcon && (
                <img
                  className="w-7 h-7 object-contain rounded-full mr-2"
                  src={subredditSelected.communityIcon}
                  alt="Community Icon"
                />
              )}
              {subredditSelected.prefixedName}
            </span>
            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              {/* Selector Icon */}
              <i className="ri-code-line text-gray-400 transform rotate-90"></i>
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-20 pl-0">
              {subreddits.map((subreddit) => (
                <Listbox.Option
                  key={subreddit.id}
                  className={({ active }) =>
                    `${active ? "text-amber-900 bg-amber-100" : "text-gray-900"}
                          cursor-default select-none relative py-2 pl-3 pr-4 list-none`
                  }
                  value={subreddit}
                >
                  {({ subredditSelected, active }) => (
                    <>
                      <span
                        className={`${
                          subredditSelected ? "font-medium" : "font-normal"
                        } truncate flex items-center text-base`}
                      >
                        <img
                          className="w-7 h-7 object-contain rounded-full mr-2"
                          src={subreddit.communityIcon}
                          alt="Community Icon"
                        />
                        {subreddit.prefixedName}
                      </span>
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};

ChooseCommunity.propTypes = {
  subredditSelected: PropTypes.object.isRequired,
  setSubredditSelected: PropTypes.func.isRequired,
};

export default ChooseCommunity;
