import Link from "next/link";
import SearchInput from "./SearchInput";

function Navbar() {
  return (
    <div className="w-full fixed top-0 left-0 z-40 shadow-md">
      <nav className="w-full px-2 sm:px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center justify-center">
          <Link href="/">
            <a className="mr-2 w-9 h-9 sm:mr-5 flex items-center">
              <img
                src="/images/logo.svg"
                alt="Gravity Logo (An astronaut floating in space)"
                width={36}
                height={36}
              />
              <h1 className="text-2xl font-semibold hidden xl:block ml-2">
                Gravity
              </h1>
            </a>
          </Link>
        </div>

        <SearchInput />

        <div className="flex items-center mx-4">
          <Link href="/login">
            <a className="px-5 py-1.5 rounded-lg font-bold bg-theme-gray-200 text-white text-base transition duration-200 hover:bg-theme-blue mr-5">
              Log In
            </a>
          </Link>

          <Link href="/register">
            <a className="px-5 py-1.5 rounded-lg font-bold bg-theme-blue text-white text-base transition duration-200 hover:bg-theme-blue">
              Sign Up
            </a>
          </Link>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
