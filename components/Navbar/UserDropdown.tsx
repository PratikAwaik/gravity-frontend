import Link from "next/link";
import UserAvatar from "../Utils/UserAvatar";
import StorageService from "../../services/storage";
import {LOCAL_STORAGE_KEYS} from "../../utils/constants";
import {useDisclosure} from "../../hooks/useDisclosure";
import {useAuth} from "../../utils/Auth";
import {useEffect, useRef} from "react";
import {getUserDetailPath, PAGES} from "../../utils/constants";
import {useApolloClient} from "@apollo/client";
import {useRouter} from "next/router";
import toast from "react-hot-toast";

export default function UserDropdown() {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const apolloClient = useApolloClient();
  const router = useRouter();
  const {currentUser} = useAuth();
  const {isOpen, onOpen, onClose} = useDisclosure();

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (e: any) => {
    if (!dropdownRef.current?.contains(e.target)) {
      onClose();
    }
  };

  const handleLogout = async () => {
    try {
      const currentUserPrefixedName = `u/${currentUser?.username}`;

      StorageService.removeItem(LOCAL_STORAGE_KEYS.CURRENT_USER);
      await apolloClient.resetStore();
      await router.push(PAGES.INDEX).then(() => {
        router.reload();
        toast.success(`You are logged out from ${currentUserPrefixedName}`);
      });
    } catch (error) {
      console.error(error);
      toast.error(`Failed to logout. Please try again later!`);
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className={`bg-transparent flex items-center justify-between rounded py-1 px-2 min-h-min border hover:border-theme-gray-line ${
          isOpen ? "border-theme-gray-line" : "border-transparent"
        }`}
        onClick={isOpen ? onClose : onOpen}
      >
        <div className="flex items-center w-[10rem]">
          <div className="w-7 h-7 overflow-hidden rounded">
            <UserAvatar
              key={`${currentUser?.id}-dropdown`}
              user={currentUser}
              size={28}
            />
          </div>
          <div className="ml-1.5 flex flex-col items-start">
            <p className="text-xs font-medium whitespace-nowrap">
              {currentUser?.username}
            </p>
            <p className="flex items-center">
              <i className="ri-copper-diamond-line text-xs text-theme-red mr-0.5"></i>
              <span className="text-xs font-medium text-[#a8aaab]">
                {currentUser?.karma ?? 0} karma
              </span>
            </p>
          </div>
        </div>
        <i className="ri-arrow-drop-down-line text-3xl leading-5 text-theme-gray-action-icon"></i>
      </button>

      {isOpen && (
        <div className="absolute top-11 z-40 right-0 w-[15.75rem] border border-theme-gray-line bg-white rounded-md">
          <Link href={getUserDetailPath(currentUser?.username)}>
            <a
              className="flex items-center py-2 px-5 h-10 w-full hover:bg-[#0000000a]"
              onClick={onClose}
            >
              <i className="ri-user-3-line text-lg mr-2"></i>
              <span className="text-sm font-medium">Profile</span>
            </a>
          </Link>
          <Link href={PAGES.CREATE_COMMUNITY}>
            <a
              className="flex items-center py-2 px-5 h-10 w-full hover:bg-[#0000000a]"
              onClick={onClose}
            >
              <i className="ri-community-line text-lg mr-2"></i>
              <span className="text-sm font-medium">Create Community</span>
            </a>
          </Link>
          <button
            className="flex items-center py-2 px-5 h-10 w-full hover:bg-[#0000000a]"
            onClick={handleLogout}
          >
            <i className="ri-logout-box-line text-lg mr-2"></i>
            <span className="text-sm font-medium">Log Out</span>
          </button>
        </div>
      )}
    </div>
  );
}
