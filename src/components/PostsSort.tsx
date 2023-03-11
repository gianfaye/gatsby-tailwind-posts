import React, { Dispatch, SetStateAction } from "react";
import { SortingOrder } from "../utils/types";

interface PostsSortProps {
  sortingOrder: SortingOrder;
  setSortingOrder: Dispatch<SetStateAction<SortingOrder>>;
}
const PostsSort = ({ sortingOrder, setSortingOrder }: PostsSortProps) => {
  const handlePostsSorting = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const sort = event.target.value as SortingOrder;
    setSortingOrder(sort);
  };
  return (
    <div className="mx-auto max-w-2xl lg:mx-0 flex items-center space-x-4 mt-2">
      <label htmlFor="sorting">Sort by:</label>
      <select
        id="sorting"
        value={sortingOrder}
        onChange={handlePostsSorting}
        className="border rounded py-1 px-2"
      >
        <option value="default">Default</option>
        <option value="az">A-Z</option>
        <option value="za">Z-A</option>
      </select>
    </div>
  );
};

export default PostsSort;
