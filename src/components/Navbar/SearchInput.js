import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const SearchInput = () => {
  const [value, setValue] = useState("");
  const history = useHistory();

  const handleInputChange = (e) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    history.replace(`/search?search=${value}`);
  };

  return (
    <div className="flex flex-grow items-stretch max-w-2xl rounded border relative border-gray-400">
      <form onSubmit={handleSubmit} className="w-full flex items-center">
        <span className="h-full font-normal text-center text-gray-400 bg-transparent rounded text-base justify-center w-8 pl-2 py-1 flex items-center">
          <i className="ri-search-line text-xl"></i>
        </span>
        <input
          type="text"
          placeholder="Search Gravity"
          className="px-3 py-1 placeholder-gray-400 text-gray-600 relative bg-white border-none pl-1.5 text-base outline-none w-full"
          onChange={handleInputChange}
          value={value}
        />
      </form>
    </div>
  );
};

export default SearchInput;
