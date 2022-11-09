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
          className={`mr-3 rounded px-2 py-0.5 hover:bg-gray-200 ${
            router.pathname === PAGES.INDEX && "bg-gray-200"
          }`}
        >
          <i className="ri-home-smile-2-line text-xl"></i>
        </a>
      </Link>

      <Link href={PAGES.CREATE_POST}>
        <a
          className={`mr-3 rounded px-2 py-0.5 hover:bg-gray-200 ${
            router.pathname === PAGES.CREATE_POST && "bg-gray-200"
          }`}
        >
          <i className="ri-pencil-fill text-xl"></i>
        </a>
      </Link>
    </div>
  ) : (
    <div className="flex items-center mx-4">
      <Link href={PAGES.LOGIN}>
        <a className="px-5 py-1.5 rounded-lg font-bold bg-theme-gray-200 text-base transition duration-200 hover:bg-gray-200 mr-5">
          Log In
        </a>
      </Link>

      <Link href={PAGES.REGISTER}>
        <a className="px-5 py-1.5 rounded-lg font-bold bg-gray-200 text-base transition duration-200 hover:bg-gray-200">
          Sign Up
        </a>
      </Link>
    </div>
  );
}
