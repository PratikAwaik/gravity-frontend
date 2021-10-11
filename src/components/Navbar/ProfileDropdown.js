import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const ProfileDropdown = ({ handleSignOut }) => {
  const currentUser = useSelector((state) => state.currentUser);
  return (
    <Menu as="div" className="relative inline-block text-left mx-2">
      <div>
        <Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-0.5 bg-white text-sm font-medium text-gray-700 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-theme-green">
          <i className="ri-home-7-line text-xl"></i>
          <i className="ri-arrow-down-s-line text-xl" aria-hidden="false"></i>
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
        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <Link
                  to={`/user/${currentUser.username}`}
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
                  <span className="text-sm">Create Community</span>
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

export default ProfileDropdown;
