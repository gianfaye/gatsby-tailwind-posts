import React, { Dispatch, SetStateAction } from "react";
import { ApiResponseObject } from "../utils/types";

interface AuthorFilterProps {
  searchKeyword: string;
  setSearchKeyword: Dispatch<SetStateAction<string>>;
  filteredAuthors: ApiResponseObject[];
  selectedAuthor: ApiResponseObject;
  setSelectedAuthor: Dispatch<SetStateAction<ApiResponseObject>>;
}
const AuthorFilter = ({
  searchKeyword,
  setSearchKeyword,
  filteredAuthors,
  selectedAuthor,
  setSelectedAuthor,
}: AuthorFilterProps) => {
  const hasSelectedAuthor = Object.keys(selectedAuthor).length > 0;
  const hasFilteredAuthors = filteredAuthors.length > 0;

  const handleAuthorSelect = (author: ApiResponseObject) => {
    setSelectedAuthor(author);
    setSearchKeyword(author.name as string);
  };
  const handleResetFilter = () => {
    setSelectedAuthor({});
    setSearchKeyword("");
  };

  return (
    <div className="mx-auto max-w-2xl lg:mx-0 flex items-center space-x-4 mt-2">
      <div className="relative">
        <label htmlFor="filtering">Author:</label>
        <input
          id="filtering"
          type="text"
          placeholder="Filter by author"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          className="border rounded py-1 px-2 ml-5"
        />
        {!hasSelectedAuthor && hasFilteredAuthors && (
          <div className="absolute z-10 top-full left-10 w-half bg-white shadow-lg rounded-md ml-5">
            <ul className="py-2">
              {filteredAuthors.map((author) => (
                <li
                  key={author.id as string}
                  onClick={() => handleAuthorSelect(author)}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  {author.name as string}
                </li>
              ))}
            </ul>
          </div>
        )}
        <button
          className="ml-3 bg-black text-white px-4 py-1 rounded"
          onClick={handleResetFilter}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default AuthorFilter;
