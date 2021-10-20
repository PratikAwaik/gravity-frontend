import React from "react";

const ProfilePicture = ({ image, setImage }) => {
  const handleInputChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => setImage(e.target.result);
    reader.readAsDataURL(file);
  };

  return (
    <div className="mb-5 text-center">
      <div className="mx-auto w-32 h-32 border rounded-full relative bg-gray-100 mb-4 shadow-inset">
        <img
          id="image"
          className="object-cover w-full h-32 rounded-full"
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
        Browse Photo
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
  );
};

export default ProfilePicture;
