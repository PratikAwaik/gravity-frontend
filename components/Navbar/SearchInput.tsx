import Link from "next/link";
import numberFormatter from "../../utils/helpers/numberFormatter";
import { useQuery } from "@apollo/client";
import { FormEvent, MouseEvent, useEffect, useRef, useState } from "react";
import { GET_SEARCH_COMMUNITIES } from "../../graphql/community/query";
import { useDisclosure } from "../../hooks/useDisclosure";
import { ICommunity } from "../../models/community";
import { useRouter } from "next/router";
import { SearchTabsTypes } from "../../models/utils";

export default function SearchInput() {
  const [value, setValue] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const { data, loading } = useQuery(GET_SEARCH_COMMUNITIES, {
    variables: {
      name: value,
      limit: 5,
    },
    skip: !value,
  });

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (data && !isOpen) {
      onOpen();
    }
  }, [data]);

  const handleClickOutside = (e: any) => {
    if (!dropdownRef.current?.contains(e.target)) {
      onClose();
    }
  };

  const handleInputFocus = () => {
    if (value || !isOpen) onOpen();
  };

  const redirectToResultsPage = (
    e: FormEvent<HTMLFormElement> | MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    router.push(`/search?q=${value}&tab=${SearchTabsTypes.POSTS}`);
    onClose();
  };

  return (
    <div
      className="flex flex-grow items-stretch max-w-2xl rounded-3xl relative text-theme-body-text-color bg-theme-gray-field border border-theme-gray-line hover:border-theme-blue hover:bg-white focus-within:border-theme-blue focus-within:bg-white"
      ref={dropdownRef}
    >
      <form
        onSubmit={redirectToResultsPage}
        className="w-full flex items-center"
      >
        <span className="h-full font-normal text-center bg-transparent rounded text-base justify-center w-8 pl-3 py-1 flex items-center text-theme-body-text-color">
          <i className="ri-search-line text-lg text-theme-gray-action-icon"></i>
        </span>
        <input
          type="text"
          placeholder="Search Gravity"
          className="pl-2 pr-3 py-1.5 bg-theme-gray-field relative border-none text-sm outline-none w-full rounded-3xl placeholder-theme-gray-action-icon hover:bg-white focus-within:bg-white"
          value={value}
          onChange={({ target }) => setValue(target.value)}
          onFocus={handleInputFocus}
        />
      </form>

      {isOpen && value && (
        <div className="w-full absolute top-10 left-0 bg-white py-3 border border-theme-gray-line rounded shadow-sm shadow-[#1c1c1c33]">
          {data?.getSearchedCommunities?.length > 0 ? (
            <>
              <p className="text-sm font-medium px-4 pb-4">Communities</p>
              {data?.getSearchCommunities?.map((community: ICommunity) => (
                <Link
                  key={community?.id}
                  href={`/community/${community?.name}`}
                >
                  <a
                    className="w-full py-2 px-4 flex items-center hover:bg-theme-gray-field"
                    onClick={onClose}
                  >
                    <img
                      src={community?.icon}
                      alt={community?.name}
                      className="w-6 h-6 rounded-full mr-2"
                    />
                    <div>
                      <p className="text-sm font-medium">
                        {community?.prefixedName}
                      </p>
                      <p className="flex items-center text-xs font-normal text-theme-meta-text">
                        <span>Community</span>
                        <span className="mini-dot"></span>
                        <span className="mr-1">
                          {numberFormatter.format(community?.membersCount)}
                        </span>
                        <span>members</span>
                      </p>
                    </div>
                  </a>
                </Link>
              ))}
            </>
          ) : (
            <button
              type="button"
              className="flex items-center hover:bg-theme-gray-field w-full"
              onClick={redirectToResultsPage}
            >
              <span className="h-full font-normal text-center bg-transparent rounded text-base justify-center w-8 pl-3 py-1 flex items-center text-theme-body-text-color">
                <i className="ri-search-line text-lg text-theme-gray-action-icon"></i>
              </span>
              <p className="ml-2 overflow-hidden text-ellipsis whitespace-nowrap text-sm">
                Search for "{value}"
              </p>
            </button>
          )}
        </div>
      )}
    </div>
  );
}
