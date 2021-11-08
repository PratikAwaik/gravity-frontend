import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import ProfilePicture from "../Editors/ProfilePicture";
import { createSubredditDispatcher } from "../../dispatchers/subreddit";
import communitySrcImage from "../../images/community.png";
import { displayError, successPopup } from "../../helpers";
import { currentUserDetailsDispatcher } from "../../dispatchers/user";

const CreateSubreddit = () => {
  const [subreddit, setSubreddit] = useState({
    name: "",
    description: "",
    communityIcon: communitySrcImage,
  });
  const { currentUser, error } = useSelector((state) => state);
  const history = useHistory();
  const dispatch = useDispatch();

  const customSetImageDispatcher = (_, obj) => {
    setSubreddit({ ...subreddit, ...obj });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await createSubredditDispatcher(dispatch, subreddit, currentUser.token);
    await currentUserDetailsDispatcher(dispatch);
    await successPopup("Community created successfully");
    history.goBack();
  };

  return (
    <div className="mt-16 create-post-container pt-6 sm:pt-9 px-2 max-w-3xl mx-auto mb-20">
      <div>
        <h2 className="text-2xl mb-2 px-2 py-2 rounded-md font-bold">
          Create a Community
        </h2>
        <hr className="mb-5" />
      </div>

      <div className="create-post-wrapper">
        <form onSubmit={handleSubmit}>
          <div className="mx-auto rounded-full relative mb-4 shadow-inset w-36">
            <ProfilePicture
              icon={communitySrcImage}
              dispatcher={customSetImageDispatcher}
              objKey="communityIcon"
            />
          </div>

          <div className="flex flex-col items-start mb-4">
            <label htmlFor="subreddit-name" className="mb-1 text-gray-600">
              Name
            </label>
            <div className="w-full flex items-center border border-theme-gray rounded-sm">
              <span className="pl-2 text-base text-gray-600">r/</span>
              <input
                onChange={({ target }) =>
                  setSubreddit({ ...subreddit, name: target.value })
                }
                name="name"
                type="text"
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

            {displayError(error.error && error.error.name)}

            <div className="flex items-start mt-2 text-gray-500">
              <i className="ri-information-line mr-2 text-xl"></i>
              <span className="text-sm sm:text-md">
                Names cannot have spaces (e.g. "r/bookclub" not "r/book club"),
                must be between 3-21 characters, and underscores ("_") are the
                only special characters allowed.
              </span>
            </div>
          </div>

          <div className="flex flex-col items-start mb-4">
            <label
              htmlFor="subreddit-description"
              className="mb-1 text-gray-600"
            >
              Description
            </label>
            <textarea
              onChange={({ target }) =>
                setSubreddit({ ...subreddit, description: target.value })
              }
              value={subreddit.description}
              rows="3"
              required
              maxLength="350"
              className="resize-none overflow-hidden text-base w-full p-2 bg-transparent border border-theme-gray rounded-sm outline-none focus-within::bg-transparent"
            ></textarea>

            {displayError(error.error && error.error.description)}
          </div>

          <div className="flex items-center mt-5">
            <button
              type="submit"
              className="px-4 sm:px-5 py-1.5 border-2 border-theme-green rounded-md text-md sm:text-base hover:bg-theme-green hover:text-theme-white"
            >
              Create
            </button>
            <button
              type="button"
              className="ml-4 px-4 sm:px-5 py-1.5 border-2 border-theme-red rounded-md text-md sm:text-base hover:bg-theme-red"
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
