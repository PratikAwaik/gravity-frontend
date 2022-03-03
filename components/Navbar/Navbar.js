import Icons from "./Icons";
import Logo from "./Logo";
import SearchInput from "./SearchInput";

function Navbar() {
  return (
    <div className="w-full fixed top-0 left-0 z-40 shadow-md">
      <nav className="w-full px-2 sm:px-4 py-2.5 flex items-center justify-between">
        <Logo />
        <SearchInput />
        <Icons />
      </nav>
    </div>
  );
}

export default Navbar;
