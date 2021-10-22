import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";

const UserProfile = () => {
  const params = useParams();
  const [user, setUser] = useState({});

  useEffect(() => {
    (async () => {
      const response = await axios.get(`/api/users/${params.id}`);
      setUser(response.data);
    })();
  }, [params.id]);

  return <div>User Profile</div>;
};

export default UserProfile;
