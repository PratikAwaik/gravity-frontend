import React, { useState } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import axios from "axios";
import LoadingWrapper from "./LoadingWrapper";

const ProfilePicture = ({ icon, dispatcher, objKey }) => {
  const [image, setImage] = useState(icon);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const file = e.target.files[0];

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "gravity_upload_preset");

    const reader = new FileReader();
    reader.onload = async (e) => {
      setLoading(true);
      setImage(e.target.result);
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/gravityuploads/image/upload`,
        data
      );
      dispatcher(dispatch, { [objKey]: response.data.secure_url });
      setLoading(false);
    };
    reader.readAsDataURL(file);
  };

  return (
    <LoadingWrapper loading={loading}>
      <div className="mb-5 text-center">
        <div className="w-full h-36 border-4 border-theme-white rounded-full mb-4 shadow-inset flex items-center justify-center">
          <img
            id="image"
            className="object-cover w-32 h-32 rounded-full"
            src={image}
            alt="Uploaded profile pic"
          />
        </div>

        <label
          htmlFor="fileInput"
          type="button"
          className="cursor-pointer flex items-center focus:outline-none border py-2 px-4 rounded-lg shadow-sm text-left text-gray-600 bg-white hover:bg-gray-100 font-medium w-max m-auto"
        >
          <i className="ri-camera-line text-lg mr-2"></i>
          Select
        </label>

        <input
          name="photo"
          id="fileInput"
          accept="image/*"
          className="hidden"
          type="file"
          onChange={handleInputChange}
        />
      </div>
    </LoadingWrapper>
  );
};

ProfilePicture.propTypes = {
  icon: PropTypes.string.isRequired,
  dispatcher: PropTypes.func.isRequired,
  objKey: PropTypes.string.isRequired,
};

export default ProfilePicture;
