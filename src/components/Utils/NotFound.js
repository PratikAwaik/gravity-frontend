import React from "react";
import { Link, useHistory } from "react-router-dom";
import image404 from "../../images/404.jpg";

const NotFound = () => {
  const history = useHistory();

  return (
    <div className="w-screen h-screen -mt-16 relative text-white z-50 overflow-hidden">
      <img
        className="w-full h-full object-cover absolute top-0 left-0 overflow-hidden"
        src={image404}
        alt="404 Not Found"
        loading="lazy"
      />

      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-max">
        <span className="text-4xl sm:text-7xl font-light tracking-wider">
          404
        </span>
        <span className="text-4xl sm:text-7xl font-bold tracking-wider block">
          Lost in Space
        </span>
        <div className="w-48 h-1 bg-white mt-2 mb-5"></div>
        <span className="block text-md sm:text-lg">
          You have reached the edge of the universe.
        </span>
        <span className="block text-md sm:text-lg">
          The page you requested could not be found.
        </span>
        <span className="block text-md sm:text-lg">
          Don't worry and return to the previous page.
        </span>

        <div className="flex items-center my-8">
          <Link
            to="/"
            className="uppercase tracking-wide px-5 py-2 flex items-center justify-center text-sm sm:text-lg mr-5 bg-theme-green rounded-2xl border-2 border-theme-green"
          >
            go home
          </Link>
          <button
            className="uppercase tracking-wide px-5 py-2 flex items-center justify-center text-sm sm:text-lg border-2 border-white rounded-2xl hover:bg-theme-orange hover:border-theme-orange"
            type="button"
            onClick={() => history.goBack()}
          >
            back
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
