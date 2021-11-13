import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import ProfilePicture from "../Utils/ProfilePicture";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import SubredditCards from "./SubredditCards";
import Tabs from "./Tabs";
import { updateCurrentUserDispatcher } from "../../dispatchers/currentUser";
import LoadingWrapper from "../Utils/LoadingWrapper";
import {
  getUserDispatcher,
  getUserSubredditsDispatcher,
  getUserPostsDispatcher,
  getUserCommentsDispatcher,
  unsetUserDispatcher,
} from "../../dispatchers/userProfile";

const UserProfile = () => {
  const params = useParams();
  // const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const { currentUser, userProfile } = useSelector((state) => state);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    (async () => {
      await unsetUserDispatcher(dispatch);
      await getUserDispatcher(dispatch, params.id, history);
      await getUserSubredditsDispatcher(dispatch, params.id);
      await getUserPostsDispatcher(dispatch, params.id, {
        page: 1,
        limit: userProfile.posts.limit,
      });
      await getUserCommentsDispatcher(dispatch, params.id, {
        page: 1,
        limit: userProfile.comments.limit,
      });
      setLoading(false);
    })();
  }, [
    params.id,
    dispatch,
    history,
    userProfile.posts.limit,
    userProfile.comments.limit,
  ]);

  const calculateCakeDay = () => {
    const currDate = moment(Date.now());
    const diff = currDate.diff(userProfile.user.createdAt, "years");
    return moment(userProfile.user.createdAt)
      .add(diff + 1, "years")
      .format("LL");
  };

  return (
    <LoadingWrapper loading={loading} width="w-screen" height="h-screen">
      {userProfile.user.username ? (
        <div className="max-w-5xl mx-auto pt-9 pb-12">
          <div className="user-details">
            <div className="mx-auto rounded-full relative mb-4 shadow-inset w-36">
              {userProfile.user.id === currentUser.id ? (
                <ProfilePicture
                  icon={userProfile.user.profilePic}
                  dispatcher={updateCurrentUserDispatcher}
                  objKey="profilePic"
                />
              ) : (
                <div className="mx-auto w-36 h-36 mb-5 rounded-full border-4 border-theme-white flex items-center justify-center">
                  <img
                    className="object-cover w-32 h-32 rounded-full"
                    src={userProfile.user.profilePic}
                    alt="User Profile Pic"
                  />
                </div>
              )}
            </div>
            <div className="mb-6 flex items-center justify-center max-w-md mx-auto">
              <div className="flex flex-col items-center">
                <p className="text-xl sm:text-2xl font-bold mb-2">
                  {userProfile.user.prefixedName}
                </p>
                <p className="flex items-end">
                  <i className="ri-cake-fill inline-block text-theme-red mr-2 text-2xl"></i>{" "}
                  <span className="font-semibold text-base sm:text-lg">
                    Cake Day - {calculateCakeDay()}
                  </span>
                </p>
              </div>
            </div>

            {userProfile.subreddits.moderating &&
              userProfile.subreddits.moderating.length > 0 && (
                <SubredditCards
                  subreddits={userProfile.subreddits.moderating}
                  headText="Moderating these communities"
                />
              )}

            {userProfile.subreddits.subscriptions &&
              userProfile.subreddits.subscriptions.length > 0 && (
                <SubredditCards
                  subreddits={userProfile.subreddits.subscriptions}
                  headText="Subscriptions"
                />
              )}

            <Tabs
              posts={userProfile.posts.results}
              comments={userProfile.comments.results}
            />
          </div>
        </div>
      ) : null}
    </LoadingWrapper>
  );
};

export default UserProfile;
