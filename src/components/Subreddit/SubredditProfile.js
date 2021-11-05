import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { setPostsDispatcher } from "../../dispatchers/forums";
import { updateCurrentUserSubscriptionDispatcher } from "../../dispatchers/user";
import Forums from "../Forums/Forums";
import MembersDisplay from "./MembersDisplay";
import loadingIcon from "../../images/loading-icon.gif";
import ProfilePicture from "../Editors/ProfilePicture";
import { updateSubredditIconDispatcher } from "../../dispatchers/subreddit";

const SubredditProfile = () => {
  const [subreddit, setSubreddit] = useState({});
  const [loading, setLoading] = useState(true);
  const { forums, currentUser } = useSelector((state) => state);
  const dispatch = useDispatch();
  const params = useParams();

  useEffect(() => {
    (async () => {
      const responseSubreddit = await axios.get(`/api/r/${params.id}`);
      const responseSubredditPosts = await axios.get(
        `/api/r/${params.id}/posts`
      );
      const responseSubredditUsers = await axios.get(
        `/api/r/${params.id}/users`
      );
      responseSubredditPosts.data.posts = responseSubredditPosts.data.posts.map(
        (post) => {
          return {
            ...post,
            subreddit: responseSubreddit.data,
          };
        }
      );
      responseSubreddit.data = {
        ...responseSubreddit.data,
        ...responseSubredditPosts.data,
        ...responseSubredditUsers.data,
      };
      setSubreddit(responseSubreddit.data);
      setPostsDispatcher(dispatch, responseSubredditPosts.data.posts);
      setLoading(false);
    })();
  }, [params.id, dispatch]);

  const updateIconCustomDispatcher = async (dispatch, data) => {
    const config = {
      headers: {
        Authorization: "Bearer " + currentUser.token,
      },
    };
    await axios.patch(`/api/r/${subreddit.id}/update`, data, config);
    updateSubredditIconDispatcher(dispatch, subreddit.id, data.communityIcon);
  };

  const handleClick = async () => {
    const config = {
      headers: {
        Authorization: "Bearer " + currentUser.token,
      },
    };
    const subredditCopy = Object.assign({}, subreddit);

    let subscribe = false;

    if (!currentUser.subscriptions.includes(subreddit.id)) {
      subscribe = true;
      subredditCopy.members = subredditCopy.members.concat(currentUser);
    } else {
      subredditCopy.members = subredditCopy.members.filter(
        (member) => member.id !== currentUser.id
      );
    }

    await axios.patch(
      `/api/r/${subreddit.id}/subscribe`,
      { subscribe },
      config
    );
    setSubreddit(subredditCopy);
    updateCurrentUserSubscriptionDispatcher(dispatch, {
      subredditId: subreddit.id,
      subscribe,
    });
  };

  return loading ? (
    <div className="w-screen h-screen flex items-center justify-center">
      <img src={loadingIcon} alt="Loading Icon" />
    </div>
  ) : subreddit.id ? (
    <div className="w-full">
      <div
        className="w-full absolute top-0 h-56"
        style={{ backgroundColor: subreddit.coverColor }}
      ></div>

      <div className="max-w-4xl mx-auto mt-44">
        <div className="flex items-center flex-col">
          <div className="w-36 rounded-full z-10 bg-white">
            {currentUser.id && currentUser.moderating.includes(subreddit.id) ? (
              <ProfilePicture
                icon={subreddit.communityIcon}
                dispatcher={updateIconCustomDispatcher}
                objKey="communityIcon"
              />
            ) : (
              <div className="w-full h-full rounded-full mx-auto mb-5 border-4 border-theme-white flex items-center justify-center">
                <img
                  className="w-32 h-32 rounded-full object-cover"
                  src={subreddit.communityIcon}
                  alt="Subreddit Icon"
                />
              </div>
            )}
          </div>

          <div className="mb-4">
            <span className="text-2xl font-bold text-theme-gray">
              {subreddit.prefixedName}
            </span>
          </div>

          {currentUser.id ? (
            subreddit.moderators.length < 2 &&
            currentUser.moderating.includes(subreddit.id) ? null : (
              <button
                type="button"
                className="px-4 py-0.5 w-24 flex items-center justify-center text-md border-2 rounded-md border-gray-400 hover:bg-gray-200 group"
                onClick={handleClick}
              >
                {currentUser.subscriptions.includes(subreddit.id) ? (
                  <>
                    <span className="group-hover:hidden">Joined</span>
                    <span className="hidden group-hover:inline-block">
                      Leave
                    </span>
                  </>
                ) : (
                  "Join"
                )}
              </button>
            )
          ) : null}
        </div>

        <div className="mt-4 mb-8">
          <div className="mb-4">
            <h3 className="font-bold mb-2 tab tab-selected ml-0">
              About the Community
            </h3>
            <div className="px-3">
              <p className="font-bold my-2">
                About:{" "}
                <span className="font-normal">{subreddit.description}</span>
              </p>
              <p className="font-bold my-2">
                Established On:{" "}
                <span className="font-normal">
                  {moment(subreddit.createdAt).format("LL")}
                </span>
              </p>
              <p className="font-bold my-2">
                Members:{" "}
                <span className="font-normal">{subreddit.members.length}</span>
              </p>
            </div>
          </div>

          <MembersDisplay members={subreddit.moderators} label="Moderators" />
          <MembersDisplay members={subreddit.members} label="Members" />
        </div>

        <div>
          <h3 className="font-bold tab tab-selected mb-3 ml-0">Posts</h3>
          <Forums posts={forums} />
        </div>
      </div>
    </div>
  ) : null;
};

export default SubredditProfile;
