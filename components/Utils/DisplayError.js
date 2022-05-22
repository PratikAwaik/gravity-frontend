import React from "react";

const DisplayError = ({ error }) => {
  return (
    error && (
      <div className="p-2 text-lg bg-theme-red rounded-lg text-center mb-6">
        {error}
      </div>
    )
  );
};

export default DisplayError;
