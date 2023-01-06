import { forwardRef } from "react";

const LoadingIcon = forwardRef((_, ref: any) => {
  return (
    <div className="w-full my-5 flex items-center justify-center" ref={ref}>
      <img src="/images/loading.svg" className="w-9 h-9" />
    </div>
  );
});

export default LoadingIcon;
