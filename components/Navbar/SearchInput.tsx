import * as React from "react";

export default function SearchInput() {
  const [value, setValue] = React.useState("");

  const handleSubmit = () => {};
  const handleInputChange = () => {};

  return (
    <div className="flex flex-grow items-stretch max-w-2xl rounded-lg border relative hover:border-gray-400">
      <form onSubmit={handleSubmit} className="w-full flex items-center">
        <span className="h-full font-normal text-center bg-transparent rounded text-base text-gray-400 justify-center w-8 pl-2 py-1 flex items-center">
          <i className="ri-search-line text-xl"></i>
        </span>
        <input
          type="text"
          placeholder="Search Gravity"
          className="px-3 py-1.5 placeholder-gray-400 relative border-none text-base outline-none w-full rounded-md"
          value={value}
          onChange={({ target }) => setValue(target.value)}
        />
      </form>
    </div>
  );
}
