import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { setPostsDispatcher } from "../../dispatchers/forums";
import { updateCurrentUserSubscriptionDispatcher } from "../../dispatchers/currentUser";
import Forums from "../Forums/Forums";
import MembersDisplay from "./MembersDisplay";
import ProfilePicture from "../Utils/ProfilePicture";
import { updateSubredditIconDispatcher } from "../../dispatchers/subreddit";
import LoadingWrapper from "../Utils/LoadingWrapper";
import {
  getSubredditDispatcher,
  getSubredditPostsDispatcher,
  getSubredditUsersDispatchers,
} from "../../dispatchers/subredditProfile";

const SubredditProfile = () => {
  const [subreddit, setSubreddit] = useState({});
  const [loading, setLoading] = useState(true);
  const { subredditProfile, currentUser } = useSelector((state) => state);
  const dispatch = useDispatch();
  const params = useParams();
  const history = useHistory();

  useEffect(() => {
    (async () => {
      // try {
      //   const responseSubreddit = await axios.get(
      //     `${process.env.REACT_APP_API_URL}/api/r/${params.id}`
      //   );
      //   const responseSubredditPosts = await axios.get(
      //     `${process.env.REACT_APP_API_URL}/api/r/${params.id}/posts`
      //   );
      //   const responseSubredditUsers = await axios.get(
      //     `${process.env.REACT_APP_API_URL}/api/r/${params.id}/users`
      //   );
      //   responseSubredditPosts.data.posts =
      //     responseSubredditPosts.data.posts.map((post) => {
      //       return {
      //         ...post,
      //         subreddit: responseSubreddit.data,
      //       };
      //     });
      //   responseSubreddit.data = {
      //     ...responseSubreddit.data,
      //     ...responseSubredditPosts.data,
      //     ...responseSubredditUsers.data,
      //   };
      //   setSubreddit(responseSubreddit.data);
      //   setPostsDispatcher(dispatch, responseSubredditPosts.data.posts);
      // } catch (error) {
      //   history.replace("/404");
      // }
      await getSubredditDispatcher(dispatch, params.id, history);
      await getSubredditUsersDispatchers(dispatch, params.id);
      await getSubredditPostsDispatcher(dispatch, params.id, {
        page: 1,
        limit: subredditProfile.posts.limit,
      });
      setLoading(false);
    })();
  }, [params.id, dispatch, history, subredditProfile.posts.limit]);

  const updateIconCustomDispatcher = async (dispatch, data) => {
    const config = {
      headers: {
        Authorization: "Bearer " + currentUser.token,
      },
    };
    await axios.patch(
      `${process.env.REACT_APP_API_URL}/api/r/${subreddit.id}/update`,
      data,
      config
    );
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
      `${process.env.REACT_APP_API_URL}/api/r/${subreddit.id}/subscribe`,
      { subscribe },
      config
    );
    setSubreddit(subredditCopy);
    updateCurrentUserSubscriptionDispatcher(dispatch, {
      subredditId: subreddit.id,
      subscribe,
    });
  };

  return (
    <LoadingWrapper loading={loading} width="w-screen" height="h-screen">
      {subredditProfile.subreddit.id && (
        <div className="w-full pb-20">
          <div
            className="w-full absolute top-0 h-56"
            style={{ backgroundColor: subredditProfile.subreddit.coverColor }}
          ></div>

          <div className="max-w-4xl mx-auto mt-44">
            <div className="flex items-center flex-col">
              <div className="w-36 rounded-full z-10 bg-white">
                {currentUser.id &&
                currentUser.moderating.includes(
                  subredditProfile.subreddit.id
                ) ? (
                  <ProfilePicture
                    icon={subredditProfile.subreddit.communityIcon}
                    dispatcher={updateIconCustomDispatcher}
                    objKey="communityIcon"
                  />
                ) : (
                  <div className="w-full h-full rounded-full mx-auto mb-5 border-4 border-theme-white flex items-center justify-center">
                    <img
                      className="w-32 h-32 rounded-full object-cover"
                      src={subredditProfile.subreddit.communityIcon}
                      alt="Subreddit Icon"
                    />
                  </div>
                )}
              </div>

              <div className="mb-4">
                <span className="text-2xl font-bold text-theme-gray">
                  {subredditProfile.subreddit.prefixedName}
                </span>
              </div>

              {currentUser.id ? (
                subredditProfile.users.moderators &&
                subredditProfile.users.moderators.length < 2 &&
                currentUser.moderating.includes(
                  subredditProfile.subreddit.id
                ) ? null : (
                  <button
                    type="button"
                    className="px-4 py-0.5 w-24 flex items-center justify-center text-md border-2 rounded-md border-gray-400 hover:bg-gray-200 group"
                    onClick={handleClick}
                  >
                    {currentUser.subscriptions.includes(
                      subredditProfile.subreddit.id
                    ) ? (
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

            <div className="mt-4 mb-8 px-2">
              <div className="mb-4">
                <h3 className="font-bold mb-2 tab tab-selected ml-0">
                  About the Community
                </h3>
                <div className="px-3">
                  <p className="font-bold my-2">
                    About:{" "}
                    <span className="font-normal">
                      {subredditProfile.subreddit.description}
                    </span>
                  </p>
                  <p className="font-bold my-2">
                    Established On:{" "}
                    <span className="font-normal">
                      {moment(subredditProfile.subreddit.createdAt).format(
                        "LL"
                      )}
                    </span>
                  </p>
                  <p className="font-bold my-2">
                    Members:{" "}
                    <span className="font-normal">
                      {subredditProfile.users.members &&
                        subredditProfile.users.members.length}
                    </span>
                  </p>
                </div>
              </div>

              <MembersDisplay
                members={subredditProfile.users.moderators}
                label="Moderators"
              />
              <MembersDisplay
                members={subredditProfile.users.members}
                label="Members"
              />
            </div>

            <div>
              <h3 className="font-bold tab tab-selected mb-3">Posts</h3>
              {subredditProfile.posts.results.length > 0 ? (
                <Forums posts={subredditProfile.posts.results} />
              ) : (
                <span className="text-2xl block text-center">
                  No posts yet...
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </LoadingWrapper>
  );
};

export default SubredditProfile;
