import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function Icons() {
  const [showIcons, setShowIcons] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const gravityUserToken = localStorage.getItem("gravityUserToken");
    if (gravityUserToken) {
      setShowIcons(true);
    }
  }, []);

  return showIcons ? (
    <div className="flex items-center mx-4">
      <Link href="/">
        <a
          className={`mr-5 rounded-lg px-2 py-0.5 hover:bg-theme-blue ${
            router.pathname === "/" ? "bg-theme-blue" : "bg-theme-gray-200 "
          }`}
        >
          <i className="ri-home-smile-2-line text-theme-white-400 text-xl"></i>
        </a>
      </Link>

      <Link href="/create/post">
        <a
          className={`mr-5 rounded-lg px-2 py-0.5 hover:bg-theme-blue ${
            router.pathname === "/create/post"
              ? "bg-theme-blue"
              : "bg-theme-gray-200 "
          }`}
        >
          <i className="ri-pencil-fill text-theme-white-400 text-xl"></i>
        </a>
      </Link>
    </div>
  ) : (
    <div className="flex items-center mx-4">
      <Link href="/login">
        <a className="px-5 py-1.5 rounded-lg font-bold bg-theme-gray-200 text-base transition duration-200 hover:bg-theme-blue mr-5">
          Log In
        </a>
      </Link>

      <Link href="/register">
        <a className="px-5 py-1.5 rounded-lg font-bold bg-theme-blue text-base transition duration-200 hover:bg-theme-blue">
          Sign Up
        </a>
      </Link>
    </div>
  );
}

export default Icons;
