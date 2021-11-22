import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import ProfilePicture from "../Utils/ProfilePicture";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import Tabs from "../Utils/Tabs";
import { updateCurrentUserDispatcher } from "../../dispatchers/currentUser";
import LoadingWrapper from "../Utils/LoadingWrapper";
import axios from "axios";
import { setUserPostsDispatcher } from "../../dispatchers/forums";
import { setCommentsDispatcher } from "../../dispatchers/comments";
import PostsPanel from "../Utils/PostsPanel";
import CommentsPanel from "./CommentsPanel";
import { classNames } from "../../helpers";
import SubredditsPanel from "../Utils/SubredditsPanel";

const UserProfile = () => {
  const params = useParams();
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const { currentUser, forums, comments } = useSelector((state) => state);
  const [categories] = useState({
    Moderating: user.moderating,
    Subscriptions: user.subscriptions,
    Posts: forums.results,
    Comments: comments,
  });
  const dispatch = useDispatch();
  const history = useHistory();

  const baseUrl = process.env.REACT_APP_API_URL + "/api/users/" + params.id;

  useEffect(() => {
    (async () => {
      try {
        const result = await Promise.all([
          axios.get(baseUrl),
          axios.get(`${baseUrl}/subreddits`),
          axios.get(`${baseUrl}/posts?page=1&limit=6`),
          axios.get(`${baseUrl}/comments?page=1&limit=12`),
        ]);
        result[0].data = {
          ...result[0].data,
          ...result[1].data,
        };
        setUser(result[0].data);
        setUserPostsDispatcher(dispatch, result[2].data);
        await setCommentsDispatcher(dispatch, result[3].data);
      } catch (err) {
        history.replace("/404");
      }
      setLoading(false);
      window.scrollTo(0, 0);
    })();
  }, [dispatch, history, params.id, baseUrl]);

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
                <p className="text-xl sm:text-2xl font-bold">{user.username}</p>
                <div className="mb-2 text-md text-theme-gray flex items-center">
                  <p>{user.prefixedName}</p>
                  <div className="w-0.5 h-0.5 bg-gray-500 rounded-full mx-1.5"></div>
                  <span>{moment(user.createdAt).format("LL")}</span>
                </div>
              </div>
            </div>

            <Tabs categories={categories}>
              <SubredditsPanel subreddits={user.moderating} />
              <SubredditsPanel subreddits={user.subscriptions} />
              <PostsPanel pageName="userPage" baseUrl={baseUrl + "/posts"} />
              <CommentsPanel
                comments={comments}
                classNames={classNames}
                baseUrl={baseUrl}
              />
            </Tabs>
          </div>
        </div>
      ) : null}
    </LoadingWrapper>
  );
};

export default UserProfile;
