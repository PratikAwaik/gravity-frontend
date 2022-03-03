import { useState } from "react";

function SearchInput() {
  const [value, setValue] = useState("");

  const handleSubmit = () => {};
  const handleInputChange = () => {};

  return (
    <div className="flex flex-grow items-stretch max-w-2xl rounded-lg border border-theme-gray-400 relative bg-theme-gray-400">
      <form onSubmit={handleSubmit} className="w-full flex items-center">
        <span className="h-full font-normal text-center bg-transparent rounded text-base text-theme-white-300 justify-center w-8 pl-2 py-1 flex items-center">
          <i className="ri-search-line text-xl text-theme-white-300"></i>
        </span>
        <input
          type="text"
          placeholder="Search Gravity"
          className="px-3 py-1.5 placeholder-gray-400 text-theme-white-300 relative bg-theme-gray-400 border-none text-base outline-none w-full"
          value={value}
          onChange={({ target }) => setValue(target.value)}
        />
      </form>
    </div>
  );
}

export default SearchInput;
