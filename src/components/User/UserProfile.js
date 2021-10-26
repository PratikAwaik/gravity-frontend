import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import ProfilePicture from "../Editors/ProfilePicture";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import SubredditCards from "./SubredditCards";
import Tabs from "./Tabs";
import { updateCurrentUserDispatcher } from "../../dispatchers/user";

const UserProfile = () => {
  const params = useParams();
  const [user, setUser] = useState({});
  const [image, setImage] = useState(user.profilePic);
  const currentUser = useSelector((state) => state.currentUser);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const response = await axios.get(`/api/users/${params.id}`);
      setUser(response.data);
    })();
    return () => {
      if (image && image !== user.profilePic) {
        updateCurrentUserDispatcher(dispatch, { profilePic: image });
      }
    };
  }, [params.id, dispatch, image, user.profilePic]);

  return (
    <div className="max-w-5xl mx-auto pt-9">
      <div className="user-details">
        <div className="mb-4">
          {user.id === currentUser.id ? (
            <ProfilePicture
              image={image ? image : user.profilePic}
              setImage={setImage}
            />
          ) : (
            <div className="mx-auto w-32 h-32 border rounded-full relative bg-gray-100 mb-4 shadow-inset">
              <img
                className="object-cover w-full h-32 rounded-full"
                src={user.profilePic}
                alt="User Profile Pic"
              />
            </div>
          )}
        </div>
        <div className="mb-4 flex items-center justify-between max-w-md mx-auto">
          <div className="flex flex-col items-center">
            <span>400,213</span>
            <span>Karma Icon</span>
          </div>
          <div className="flex flex-col items-center">
            <span>{moment(user.createdAt).format("LL")}</span>
            <span>
              <i className="ri-cake-2-line inline-block"></i> Cake Day
            </span>
          </div>
        </div>

        {user.id && user.moderating.length > 0 && (
          <SubredditCards
            subreddits={user.moderating}
            headText="Moderating these communities"
          />
        )}

        {user.id && user.subscriptions.length > 0 && (
          <SubredditCards
            subreddits={user.subscriptions}
            headText="Subscriptions"
          />
        )}

        {user.id && <Tabs posts={user.posts} comments={user.comments} />}
      </div>
    </div>
  );
};

export default UserProfile;
