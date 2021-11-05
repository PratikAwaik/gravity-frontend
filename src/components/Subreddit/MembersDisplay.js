import React from "react";
import { Link } from "react-router-dom";

const MembersDisplay = ({ members, label }) => {
  return (
    <div className="my-4 w-full overflow-x-auto overflow-y-hidden">
      <h3 className="font-bold tab tab-selected ml-0 mb-3">{label}</h3>
      <div className="flex items-center px-3 w-max">
        {members.map((member) => (
          <Link
            to={`/user/${member.id}`}
            key={member.id}
            className="flex items-center mr-5"
          >
            <img
              className="w-7 h-7 rounded-full object-cover mr-2"
              src={member.profilePic}
              alt="User Profile Pic"
            />
            <span className="text-md hover:underline">
              {member.prefixedName}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MembersDisplay;
