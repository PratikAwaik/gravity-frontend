import { Fragment, useEffect } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSubredditsDispatcher } from "../../dispatchers/subreddit";

const ChooseCommunity = ({ subredditSelected, setSubredditSelected }) => {
  const subreddits = useSelector((state) => state.subreddits);
  const dispatch = useDispatch();

  useEffect(() => {
    getAllSubredditsDispatcher(dispatch);
  }, [dispatch]);

  return (
    <div className="w-72 z-20">
      <Listbox value={subredditSelected.name} onChange={setSubredditSelected}>
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
              {subredditSelected.name}
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
                        {subreddit.name}
                      </span>
                      {/* {subredditSelected ? (
                        <span
                          className={`${
                            active ? "text-amber-600" : "text-amber-600"
                          }
                                absolute inset-y-0 left-0 flex items-center pl-3`}
                        >
                          <svg
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </span>
                      ) : null} */}
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

export default ChooseCommunity;
