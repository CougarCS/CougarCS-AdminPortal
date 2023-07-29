import React, { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";

type SearchBoxProps = {
  initSearch: (query: string) => void;
};

export default function SearchBox({ initSearch }: SearchBoxProps) {
  const [searchKey, setSearchKey] = useState("");

  const enterPressed = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      initSearch(searchKey);
    }
  };
  // <TextInput label="" name="memberSearch" placeholder="Search Members" className="ml-auto mt-auto w-2/5" />
  return (
    <label className="relative w-full">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        <AiOutlineSearch className="h-5 w-5 bg-selectInputBG text-neutral-500" />
      </div>

      <input
        className="peer h-9 w-full rounded-sm border border-neutral-500 bg-selectInputBG px-2 pl-10 placeholder:text-neutral-500 focus:border-white focus:outline-none focus:ring-white"
        name="searchBox"
        placeholder={"Search"}
        value={searchKey}
        onKeyDown={enterPressed}
        onChange={(e) => setSearchKey(e.target.value)}
      />
    </label>
  );
}
