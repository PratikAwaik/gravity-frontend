import { useQuery } from "@apollo/client";
import * as React from "react";
import { GET_USER_SUBSCRIPTIONS } from "../../graphql/users/query";

export default function CommunityDropdown() {
  const { data } = useQuery(GET_USER_SUBSCRIPTIONS);
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedCommunity, setSelectedCommunity] = React.useState(null);
  const [searchText, setSearchText] = React.useState("");
  const [searchResults, setSearchResults] = React.useState([]);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  React.useEffect(() => {
    setSearchResults(data?.userSubscriptions);
  }, [data?.userSubscriptions]);

  React.useEffect(() => {
    const results = data?.userSubscriptions.filter((sub: any) =>
      sub.prefixedName.toLowerCase().includes(searchText.toLowerCase())
    );
    setSearchResults(results);
  }, [searchText]);

  const handleClickOutside = (e: any) => {
    if (!dropdownRef.current?.contains(e.target)) {
      setIsOpen(false);
    }
  };

  const handleCommunitySelect = (community: any) => {
    setSelectedCommunity(community);
    setSearchText(community.prefixedName);
    setIsOpen(false);
  };

  return (
    <div className="my-3 w-72" ref={dropdownRef}>
      <div className="w-full h-10 relative p-2 border border-theme-white-400 rounded-md">
        <div className="h-full w-full flex items-center justify-between">
          <input
            type="text"
            placeholder={isOpen ? "Search Communities" : "Choose a Community"}
            className="bg-transparent border-none outline-none w-full text-base"
            onFocus={() => setIsOpen(true)}
            value={searchText}
            onChange={({ target }) => setSearchText(target.value)}
          />
          <button type="button" onClick={() => setIsOpen(!isOpen)}>
            <i className="ri-arrow-down-s-line text-2xl"></i>
          </button>
        </div>
        {/* list */}
        {isOpen && (
          <div className="absolute top-12 left-0 w-full border border-theme-white-400 rounded-md p-2">
            {searchResults.map((sub: any) => (
              <button
                key={sub.id}
                className="flex items-center py-2 w-full"
                onClick={() => handleCommunitySelect(sub)}
              >
                <img
                  src={sub.icon}
                  alt="community icon"
                  className="w-10 h-10 rounded-full"
                />
                <div className="flex flex-col items-start ml-2">
                  <span className="text-sm font-semibold">
                    {sub.prefixedName}
                  </span>
                  <span className="text-sm">{sub.membersCount} members</span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
