import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const ProfileDropdown = ({ handleSignOut }) => {
  const currentUser = useSelector((state) => state.currentUser);
  return (
    <Menu as="div" className="relative inline-block text-left mx-2">
      <div>
        <Menu.Button className="inline-flex items-center justify-center w-full rounded-md p-1 px-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-300">
          {/* User Icon */}
          <i className="ri-user-3-line text-xl"></i>

          {/* Down Icon */}
          <i className="ri-arrow-down-s-line text-xl hidden sm:block"></i>

          {/* Up Icon */}
          <i className="ri-arrow-up-s-line text-xl block sm:hidden"></i>
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="origin-top-right absolute right-0 -top-40 sm:top-10 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <Link
                  to={`/user/${currentUser.id}`}
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "px-4 py-2 text-sm flex items-center"
                  )}
                >
                  <i className="ri-profile-line text-lg mr-2"></i>
                  <span className="text-sm">Profile</span>
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <Link
                  to="/r/create"
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "px-4 py-2 text-sm flex items-center"
                  )}
                >
                  <i className="ri-community-line text-lg mr-2"></i>
                  <span className="text-sm">Create a Community</span>
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  to=""
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "w-full px-4 py-2 text-sm flex items-center"
                  )}
                  onClick={handleSignOut}
                >
                  <i className="ri-logout-box-r-line text-lg mr-2"></i>
                  <span className="text-sm">Sign Out</span>
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

ProfileDropdown.propTypes = {
  handleSignOut: PropTypes.func.isRequired,
};

export default ProfileDropdown;
