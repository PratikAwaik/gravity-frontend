import React from "react";
import loadingIcon from "../../images/loading-icon.gif";

const LoadingWrapper = ({ loading, children }) => {
  return loading ? (
    <div className="w-full h-full flex items-center justify-center">
      <img className="w-10 h-10" src={loadingIcon} alt="Loading Icon" />
    </div>
  ) : (
    children
  );
};

export default LoadingWrapper;
