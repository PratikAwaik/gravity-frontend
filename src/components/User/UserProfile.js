import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import axios from "axios";
import ProfilePicture from "../Editors/ProfilePicture";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import SubredditCards from "./SubredditCards";
import Tabs from "./Tabs";
import { updateCurrentUserDispatcher } from "../../dispatchers/user";
import { setPostsDispatcher } from "../../dispatchers/forums";
import loadingIcon from "../../images/loading-icon.gif";

const UserProfile = () => {
  const params = useParams();
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const currentUser = useSelector((state) => state.currentUser);
  const forums = useSelector((state) => state.forums);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    (async () => {
      try {
        const responseUser = await axios.get(`/api/users/${params.id}`);
        const responseSubreddits = await axios.get(
          `/api/users/${params.id}/subreddits`
        );
        const responsePosts = await axios.get(`/api/users/${params.id}/posts`);
        const responseComments = await axios.get(
          `/api/users/${params.id}/comments`
        );
        responseUser.data = {
          ...responseUser.data,
          ...responseSubreddits.data,
          ...responsePosts.data,
          ...responseComments.data,
        };
        setUser(responseUser.data);
        setPostsDispatcher(dispatch, responsePosts.data.posts);
      } catch (err) {
        history.replace("/404");
      }
      setLoading(false);
    })();
  }, [params.id, dispatch, history]);

  const calculateCakeDay = () => {
    const currDate = moment(Date.now());
    const diff = currDate.diff(user.createdAt, "years");
    return moment(user.createdAt)
      .add(diff + 1, "years")
      .format("LL");
  };

  return loading ? (
    <div className="w-screen h-screen flex items-center justify-center">
      <img src={loadingIcon} alt="Loading Icon" />
    </div>
  ) : user.id ? (
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

        {user.moderating.length > 0 && (
          <SubredditCards
            subreddits={user.moderating}
            headText="Moderating these communities"
          />
        )}

        {user.subscriptions.length > 0 && (
          <SubredditCards
            subreddits={user.subscriptions}
            headText="Subscriptions"
          />
        )}

        <Tabs posts={forums} comments={user.comments} />
      </div>
    </div>
  ) : null;
};

export default UserProfile;
