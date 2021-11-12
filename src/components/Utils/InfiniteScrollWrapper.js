import React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import loading from "../../images/loading-icon.gif";

const InfiniteScrollWrapper = ({ children, dataLength, nextFunc, hasMore }) => {
  return (
    <InfiniteScroll
      dataLength={dataLength}
      next={nextFunc}
      hasMore={hasMore}
      loader={
        <div className="w-full h-full flex items-center justify-center">
          <img className="w-10 h-10" src={loading} alt="Loading Icon" />
        </div>
      }
      endMessage={
        <p className="text-center text-lg">
          <b>You have reached the end of the Universe!</b>
        </p>
      }
    >
      {children}
    </InfiniteScroll>
  );
};

export default InfiniteScrollWrapper;
