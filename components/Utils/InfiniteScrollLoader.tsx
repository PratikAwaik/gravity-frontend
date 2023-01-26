import LoadingIcon from "./LoadingIcon";
import { forwardRef } from "react";

interface InfiniteScrollLoaderProps {
  hasMore: boolean;
}

const InfiniteScrollLoader = forwardRef(
  ({ hasMore }: InfiniteScrollLoaderProps, ref) => {
    return hasMore ? (
      <LoadingIcon ref={ref} />
    ) : (
      <div className="w-full my-5 flex items-center justify-center">
        You've seen it all!
      </div>
    );
  }
);

export default InfiniteScrollLoader;
