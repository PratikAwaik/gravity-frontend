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
import axios from "axios";
import { setPostsDispatcher } from "../../dispatchers/forums";
import { setCommentsDispatcher } from "../../dispatchers/comments";

const UserProfile = () => {
  const params = useParams();
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const { currentUser, forums, comments } = useSelector((state) => state);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    (async () => {
      try {
        const responseUser = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/users/${params.id}`
        );
        const responseSubreddits = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/users/${params.id}/subreddits`
        );
        const responsePosts = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/users/${params.id}/posts?page=1&limit=8`
        );
        const responseComments = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/users/${params.id}/comments?page=1&limit=20`
        );
        responseUser.data = {
          ...responseUser.data,
          ...responseSubreddits.data,
        };
        setUser(responseUser.data);
        setPostsDispatcher(dispatch, responsePosts.data.posts);
        setCommentsDispatcher(dispatch, responseComments.data.comments);
      } catch (err) {
        history.replace("/404");
      }
      // await unsetUserDispatcher(dispatch);
      // await getUserDispatcher(dispatch, params.id, history);
      // await getUserSubredditsDispatcher(dispatch, params.id);
      // await getUserPostsDispatcher(dispatch, params.id, {
      //   page: 1,
      //   limit: userProfile.posts.limit,
      // });
      // await getUserCommentsDispatcher(dispatch, params.id, {
      //   page: 1,
      //   limit: userProfile.comments.limit,
      // });
      setLoading(false);
    })();
  }, [dispatch, history, params.id]);

  const calculateCakeDay = () => {
    const currDate = moment(Date.now());
    const diff = currDate.diff(user.createdAt, "years");
    return moment(user.createdAt)
      .add(diff + 1, "years")
      .format("LL");
  };

  return (
    <LoadingWrapper loading={loading} width="w-screen" height="h-screen">
      {user.username ? (
        <div className="max-w-5xl mx-auto pt-9 pb-12">
          <div className="user-details">
            <div className="mx-auto rounded-full relative mb-4 shadow-inset w-36">
              {user.id === currentUser.id ? (
                <ProfilePicture
                  icon={user.profilePic}
                  dispatcher={updateCurrentUserDispatcher}
                  objKey="profilePic"
                />
              ) : (
                <div className="mx-auto w-36 h-36 mb-5 rounded-full border-4 border-theme-white flex items-center justify-center">
                  <img
                    className="object-cover w-32 h-32 rounded-full"
                    src={user.profilePic}
                    alt="User Profile Pic"
                  />
                </div>
              )}
            </div>
            <div className="mb-6 flex items-center justify-center max-w-md mx-auto">
              <div className="flex flex-col items-center">
                <p className="text-xl sm:text-2xl font-bold mb-2">
                  {user.prefixedName}
                </p>
                <p className="flex items-end">
                  <i className="ri-cake-fill inline-block text-theme-red mr-2 text-2xl"></i>{" "}
                  <span className="font-semibold text-base sm:text-lg">
                    Cake Day - {calculateCakeDay()}
                  </span>
                </p>
              </div>
            </div>

            {user.moderating &&
              user.moderating.length > 0 && (
                <SubredditCards
                  subreddits={user.moderating}
                  headText="Moderating these communities"
                />
              )}

            {user.subscriptions &&
              user.subscriptions.length > 0 && (
                <SubredditCards
                  subreddits={user.subscriptions}
                  headText="Subscriptions"
                />
              )}

            <Tabs
              posts={forums.results}
              comments={comments}
            />
          </div>
        </div>
      ) : null}
    </LoadingWrapper>
  );
};

export default UserProfile;
