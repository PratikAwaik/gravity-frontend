import * as React from "react";

export default function SearchInput() {
  const [value, setValue] = React.useState("");

  const handleSubmit = () => {};
  const handleInputChange = () => {};

  return (
    <div className="flex flex-grow items-stretch max-w-2xl rounded-3xl relative text-theme-body-text-color bg-theme-gray-field border border-theme-gray-line hover:border-theme-blue hover:bg-white focus-within:border-theme-blue focus-within:bg-white">
      <form onSubmit={handleSubmit} className="w-full flex items-center">
        <span className="h-full font-normal text-center bg-transparent rounded text-base justify-center w-8 pl-2 py-1 flex items-center text-theme-body-text-color">
          <i className="ri-search-line text-xl text-theme-gray-action-icon"></i>
        </span>
        <input
          type="text"
          placeholder="Search Gravity"
          className="px-3 py-1.5 bg-theme-gray-field relative border-none text-base outline-none w-full rounded-3xl placeholder-theme-gray-action-icon hover:bg-white focus-within:bg-white"
          value={value}
          onChange={({ target }) => setValue(target.value)}
        />
      </form>
    </div>
  );
}
