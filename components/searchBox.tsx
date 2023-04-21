import React, { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";

type SearchBoxProps = {
    initSearch: (query: string) => void;
};

export default function SearchBox({ initSearch }: SearchBoxProps)
{
    const [searchKey, setSearchKey] = useState('');

    const enterPressed = (event: React.KeyboardEvent) =>
    {
        if (event.key === "Enter")
        {
            initSearch(searchKey);
        }
    };
    // <TextInput label="" name="memberSearch" placeholder="Search Members" className="ml-auto mt-auto w-2/5" />
    return (
        <label className="w-full relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <AiOutlineSearch className="w-5 h-5 bg-selectInputBG text-neutral-500" />
            </div>

            <input
                className="peer pl-10 w-full h-9 px-2 bg-selectInputBG placeholder:text-neutral-500 focus:outline-none focus:border-white focus:ring-white border border-neutral-500 rounded-sm"
                name="searchBox"
                placeholder={"Search"}
                value={searchKey}
                onKeyDown={enterPressed}
                onChange={e => setSearchKey(e.target.value)}
            />
        </label>
    );
}