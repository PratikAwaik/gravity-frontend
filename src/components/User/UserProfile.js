import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import ProfilePicture from "../Editors/ProfilePicture";
import moment from "moment";
import { useSelector } from "react-redux";
import SubredditCard from "./SubredditCard";

const UserProfile = () => {
  const params = useParams();
  const [user, setUser] = useState({});
  const currentUser = useSelector((state) => state.currentUser);

  useEffect(() => {
    (async () => {
      const response = await axios.get(`/api/users/${params.id}`);
      setUser(response.data);
    })();
  }, [params.id]);

  console.log(user);

  return (
    <div className="max-w-5xl mx-auto pt-9">
      <div className="user-details">
        <div className="mb-4">
          {user.id === currentUser.id ? (
            <ProfilePicture image={user.profilePic} />
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
          <div className="flex flex-col mb-5 overflow-x-auto">
            <div className="bg-gray-500 w-full px-2 py-1 text-lg text-theme-white rounded-md">
              Moderatoring these communities
            </div>
            <div className="flex items-center">
              {user.moderating.map((subreddit) => (
                <SubredditCard key={subreddit.id} subreddit={subreddit} />
              ))}
            </div>
          </div>
        )}

        {user.id && user.subscriptions.length > 0 && (
          <div className="flex flex-col mb-5 overflow-x-auto">
            <div className="bg-gray-500 w-full px-2 py-1 text-lg text-theme-white rounded-md">
              Subscriptions
            </div>
            <div className="flex items-center">
              {user.subscriptions.map((subreddit) => (
                <SubredditCard key={subreddit.id} subreddit={subreddit} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
