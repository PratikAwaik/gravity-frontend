import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const MembersDisplay = ({ members, label }) => {
  return (
    <div className="my-4 px-2 sm:px-0 w-full">
      <h3 className="font-bold tab tab-selected ml-0 mb-3">{label}</h3>
      <div className="w-full overflow-x-auto overflow-y-hidden">
        <div className="flex items-center px-3 w-max">
          {members.map((member) => (
            <Link
              to={`/user/${member.id}`}
              key={member.id}
              className="flex items-center mr-5"
            >
              <img
                className="w-7 h-7 rounded-full object-cover mr-1"
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
    </div>
  );
};

MembersDisplay.propTypes = {
  members: PropTypes.array.isRequired,
  label: PropTypes.string.isRequired,
};

export default MembersDisplay;
