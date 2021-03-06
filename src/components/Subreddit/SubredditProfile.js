import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import {
  setNextPostsDispatcher,
  setSubredditPostsDispatcher,
} from "../../dispatchers/forums";
import { updateCurrentUserSubscriptionDispatcher } from "../../dispatchers/currentUser";
import Forums from "../Forums/Forums";
import MembersDisplay from "./MembersDisplay";
import ProfilePicture from "../Utils/ProfilePicture";
import { updateSubredditIconDispatcher } from "../../dispatchers/subreddit";
import LoadingWrapper from "../Utils/LoadingWrapper";
import InfiniteScrollWrapper from "../Utils/InfiniteScrollWrapper";
import { Link } from "react-router-dom";

const SubredditProfile = () => {
  const [subreddit, setSubreddit] = useState({});
  const [loading, setLoading] = useState(true);
  const { forums, currentUser } = useSelector((state) => state);
  const dispatch = useDispatch();
  const params = useParams();
  const history = useHistory();

  const baseUrl = process.env.REACT_APP_API_URL + "/api/r/" + params.id;

  useEffect(() => {
    (async () => {
      try {
        const result = await Promise.all([
          axios.get(baseUrl),
          axios.get(`${baseUrl}/users`),
          axios.get(`${baseUrl}/posts?page=1&limit=6`),
        ]);
        result[0].data = {
          ...result[0].data,
          ...result[1].data,
        };
        setSubreddit(result[0].data);
        setSubredditPostsDispatcher(dispatch, result[2].data);
      } catch (error) {
        history.replace("/404");
      }
      setLoading(false);
      window.scrollTo(0, 0);
    })();
  }, [params.id, dispatch, history, baseUrl]);

  const updateIconCustomDispatcher = async (dispatch, data) => {
    updateSubredditIconDispatcher(
      dispatch,
      subreddit.id,
      data,
      currentUser.token
    );
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
      {subreddit.id && (
        <div className="w-full pb-20">
          <div
            className="w-full absolute top-0 h-56"
            style={{ backgroundColor: subreddit.coverColor }}
          ></div>

          <div className="max-w-4xl mx-auto mt-44">
            <div className="flex items-center flex-col">
              <div className="w-36 rounded-full z-10 bg-white">
                {currentUser.id && currentUser.id === subreddit.moderator.id ? (
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
                currentUser.id === subreddit.moderator.id ? null : (
                  <button
                    type="button"
                    className="px-4 py-0.5 w-24 flex items-center justify-center text-md border-2 rounded-md border-gray-400 hover:bg-gray-200 group"
                    onClick={handleClick}
                  >
                    {currentUser.subscriptions &&
                    currentUser.subscriptions.includes(subreddit.id) ? (
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
                    <span className="font-normal">{subreddit.description}</span>
                  </p>
                  <p className="font-bold my-2">
                    Established On:{" "}
                    <span className="font-normal">
                      {moment(subreddit.createdAt).format("LL")}
                    </span>
                  </p>
                  <p className="font-bold my-2 flex items-center">
                    Moderator:{" "}
                    <Link
                      to={`/user/${subreddit.moderator.id}`}
                      className="flex items-center font-normal ml-3"
                    >
                      <img
                        className="w-7 h-7 rounded-full object-cover mr-1"
                        src={subreddit.moderator.profilePic}
                        alt="Moderator's profile icon"
                      />
                      <span className="text-md hover:underline">
                        {subreddit.moderator.prefixedName}
                      </span>
                    </Link>
                  </p>
                  <p className="font-bold my-2">
                    Members:{" "}
                    <span className="font-normal">
                      {subreddit.membersCount}
                    </span>
                  </p>
                </div>
              </div>

              <MembersDisplay members={subreddit.members} label="Members" />
            </div>

            <div>
              <h3 className="font-bold tab tab-selected mb-3">Posts</h3>
              {forums.results.length > 0 ? (
                <InfiniteScrollWrapper
                  dataLength={forums.results.length}
                  nextFunc={() =>
                    setNextPostsDispatcher(
                      dispatch,
                      "subredditPage",
                      {
                        page: forums.subredditPage,
                        limit: forums.limit,
                      },
                      `${baseUrl}/posts`
                    )
                  }
                  hasMore={forums.hasMore}
                >
                  <Forums posts={forums.results} />
                </InfiniteScrollWrapper>
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
