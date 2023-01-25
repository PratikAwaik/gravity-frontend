import * as React from "react";
import Icons from "./Icons";
import Logo from "./Logo";
import SearchInput from "./SearchInput";

export default function Navbar() {
  return (
    <div className="w-full fixed top-0 left-0 z-40 bg-white border-b border-theme-gray-line">
      <nav className="w-full px-2 sm:px-4 py-1.5 flex items-center justify-between">
        <Logo />
        <SearchInput />
        <Icons />
      </nav>
    </div>
  );
}
