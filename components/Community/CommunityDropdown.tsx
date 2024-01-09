import * as React from "react";
import Link from "next/link";
import {useQuery} from "@apollo/client";
import {useRouter} from "next/router";
import {GET_USER_SUBSCRIPTIONS} from "../../graphql/users/query";
import {useDisclosure} from "../../hooks/useDisclosure";
import {ICommunity} from "../../models/community";

interface CommunityDropdownProps {
  setSelectedCommunity: React.Dispatch<React.SetStateAction<any>>;
}

export default function CommunityDropdown({
  setSelectedCommunity,
}: CommunityDropdownProps) {
  const {data} = useQuery(GET_USER_SUBSCRIPTIONS);
  const {isOpen, onOpen, onClose} = useDisclosure();
  const [searchText, setSearchText] = React.useState("");
  const [searchResults, setSearchResults] = React.useState([]);
  const dropdownRef = React.useRef<HTMLDivElement>(null);
  const router = useRouter();

  React.useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  React.useEffect(() => {
    if (data?.userSubscriptions) setSearchResults(data?.userSubscriptions);

    if (router?.query?.community) {
      const community = data?.userSubscriptions?.find(
        (sub: any) =>
          sub?.name?.toLowerCase() ===
          (router?.query?.community as string).toLowerCase()
      );
      if (community) {
        setSelectedCommunity(community);
        setSearchText(community?.prefixedName);
      }
    }
  }, [data?.userSubscriptions, router?.query?.community]);

  React.useEffect(() => {
    const results = data?.userSubscriptions.filter((sub: any) =>
      sub.prefixedName.toLowerCase().includes(searchText.toLowerCase())
    );
    setSearchResults(results);
  }, [searchText]);

  const handleClickOutside = (e: any) => {
    if (!dropdownRef.current?.contains(e.target)) {
      onClose();
    }
  };

  const handleCommunitySelect = (community: any) => {
    setSelectedCommunity(community);
    setSearchText(community.prefixedName);
    onClose();
  };

  return (
    <div className="my-3 w-80 z-40" ref={dropdownRef}>
      <div className="w-full h-11 relative p-2 px-3 border border-theme-gray-line bg-white rounded-md">
        <div className="h-full w-full flex items-center justify-between">
          <input
            type="text"
            placeholder={isOpen ? "Search Communities" : "Choose a Community"}
            className="bg-transparent border-none outline-none w-full text-sm placeholder:text-theme-body-text-color font-medium"
            onFocus={onOpen}
            value={searchText}
            onChange={({target}) => setSearchText(target.value)}
          />
          <button type="button" onClick={() => (isOpen ? onClose() : onOpen())}>
            <i className="ri-arrow-down-s-line text-xl text-theme-gray-action-icon"></i>
          </button>
        </div>
        {/* list */}
        {isOpen && (
          <div className="absolute top-11 z-40 left-0 w-full max-h-96 overflow-y-scroll border border-theme-gray-line bg-white rounded-md p-2">
            <div className="flex items-center justify-between mb-2">
              <span className="text-theme-gray-action-icon font-medium text-xs">
                Your Communities
              </span>
              <Link href="/create/community">
                <a className="text-theme-blue font-medium text-xs px-2 py-1 hover:bg-theme-gray-nav-icon-faded hover:rounded-3xl">
                  Create New
                </a>
              </Link>
            </div>
            {searchResults?.map((sub: Partial<ICommunity>) => (
              <button
                key={sub.id}
                className="flex items-center py-2 w-full"
                onClick={() => handleCommunitySelect(sub)}
              >
                <img
                  src={sub.icon?.url}
                  alt="community icon"
                  className="w-8 h-8 rounded-full"
                />
                <div className="flex flex-col items-start ml-3">
                  <span className="text-sm font-medium">
                    {sub.prefixedName}
                  </span>
                  <span className="text-xs text-theme-gray-action-icon">
                    {sub.membersCount} members
                  </span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
