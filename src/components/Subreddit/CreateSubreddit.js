import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createSubredditDispatcher } from "../../dispatchers/subreddit";

const CreateSubreddit = () => {
  // no spaces, 3-21 characters, and only "_" are allowed
  // TODO: pfp input
  const [subreddit, setSubreddit] = useState({
    name: "",
    description: "",
  });
  const currentUser = useSelector((state) => state.currentUser);
  const history = useHistory();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    createSubredditDispatcher(dispatch, subreddit, currentUser.token);
  };

  return (
    <div className="mt-16 create-post-container pt-9 max-w-3xl mx-auto mb-16">
      <div>
        <h2 className="text-2xl mb-2 px-2 py-2 rounded-md font-bold">
          Create a Community
        </h2>
        <hr className="mb-5" />
      </div>

      <div className="create-post-wrapper">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col items-start mb-4">
            <label htmlFor="subreddit-name" className="mb-1">
              Name
            </label>
            <div className="w-full flex items-center border border-theme-gray rounded-sm">
              <span className="pl-2 text-base">r/</span>
              <input
                onChange={({ target }) =>
                  setSubreddit({ ...subreddit, name: target.value })
                }
                name="name"
                id="subreddit-name"
                minLength="3"
                maxLength="21"
                pattern="^[a-zA-Z0-9_]+$"
                value={subreddit.name}
                className="resize-none overflow-hidden text-base w-full p-2 bg-transparent border-none border-theme-gray rounded-sm outline-none focus-within::bg-transparent"
                required
                autoComplete="off"
              />
            </div>

            <span className="text-sm mt-2 text-theme-gray">
              {subreddit.name.length} / 21
            </span>
          </div>

          <div className="flex flex-col items-start mb-4">
            <label htmlFor="subreddit-description" className="mb-1">
              Description
            </label>
            <textarea
              onChange={({ target }) =>
                setSubreddit({ ...subreddit, description: target.value })
              }
              value={subreddit.description}
              rows="3"
              maxLength="350"
              className="resize-none overflow-hidden text-base w-full p-2 bg-transparent border border-theme-gray rounded-sm outline-none focus-within::bg-transparent"
            ></textarea>
          </div>

          <div className="flex items-center mt-5">
            <button
              type="submit"
              className="px-5 py-2 border-2 border-theme-green rounded-md hover:bg-theme-green hover:text-theme-white"
              onClick={handleSubmit}
            >
              Create
            </button>
            <button
              type="button"
              className="ml-4 px-5 py-2 border-2 border-theme-red rounded-md hover:bg-theme-red"
              onClick={() => history.goBack()}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateSubreddit;
