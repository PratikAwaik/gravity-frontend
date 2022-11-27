import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { PAGES } from "../../utils/constants";
import { useAuth } from "../../utils/Auth";

export default function Icons() {
  const router = useRouter();
  const { currentUser } = useAuth();

  return currentUser ? (
    <div className="flex items-center mx-4">
      <Link href={PAGES.INDEX}>
        <a
          className={`mr-3 rounded px-2 py-0.5 hover:bg-theme-gray-nav-icon-faded relative tooltip ${
            router.pathname === PAGES.INDEX && "bg-theme-gray-nav-icon-faded"
          }`}
        >
          <i className="ri-home-smile-2-line text-xl"></i>
          <span className="invisible w-fit text-xs bg-gray-800 text-white text-center rounded-md p-1 px-3 absolute bottom-3/4 -left-1/2 -mb-16 z-20 whitespace-nowrap tooltip-text after:content-[' '] after:absolute after:bottom-full after:left-1/2 after:-ml-1 after:border-4 after:border-solid after:border-t-transparent after:border-r-transparent after:border-b-black after:border-l-transparent">
            Home
          </span>
        </a>
      </Link>

      <Link href={PAGES.CREATE_POST}>
        <a
          className={`mr-3 rounded px-2 py-0.5 hover:bg-theme-gray-nav-icon-faded tooltip relative ${
            router.pathname === PAGES.CREATE_POST &&
            "bg-theme-gray-nav-icon-faded"
          }`}
        >
          <i className="ri-pencil-fill text-xl"></i>
          <span className="invisible w-fit text-xs bg-gray-800 text-white text-center rounded-md p-1 px-3 absolute bottom-3/4 -left-1/2 -mb-16 z-20 whitespace-nowrap tooltip-text after:content-[' '] after:absolute after:bottom-full after:left-1/2 after:-ml-1 after:border-4 after:border-solid after:border-t-transparent after:border-r-transparent after:border-b-black after:border-l-transparent">
            Create Post
          </span>
        </a>
      </Link>
    </div>
  ) : (
    <div className="flex items-center mx-4">
      <Link href={PAGES.REGISTER}>
        <a className="px-8 py-1.5 rounded-3xl font-bold text-sm transition duration-200 border border-theme-blue hover:bg-theme-gray-nav-icon-faded text-theme-blue hover:bg-theme-blue-50">
          Sign Up
        </a>
      </Link>
      <Link href={PAGES.LOGIN}>
        <a className="px-8 py-1.5 rounded-3xl font-bold bg-theme-blue text-sm text-white transition duration-200 ml-4 hover:brightness-110">
          Log In
        </a>
      </Link>
    </div>
  );
}
