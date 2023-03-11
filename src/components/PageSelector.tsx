import React, { Dispatch, SetStateAction } from "react";

interface PageSelectorProps {
  currentPage: number;
  pageTotalCount: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
}
const PageSelector = ({
  currentPage,
  pageTotalCount,
  setCurrentPage,
}: PageSelectorProps) => {
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === pageTotalCount;

  const handlePageChange = (action: string) => {
    if (action === "prev") {
      setCurrentPage(currentPage - 1);
      return;
    }
    setCurrentPage(currentPage + 1);
  };

  return (
    <div className="grid grid-cols-3 border-t border-gray-200 pt-10 mt-10">
      {!isFirstPage && (
        <div className="col-start-1 col-end-2">
          <button
            className="bg-black text-white float-left px-4 py-2 rounded"
            onClick={() => handlePageChange("prev")}
          >
            Previous Page
          </button>
        </div>
      )}
      <div className="col-start-2 col-end-3">
        <div className="flex justify-center items-center h-full">
          <span>
            Showing page {currentPage} of {pageTotalCount}
          </span>
        </div>
      </div>
      {!isLastPage && (
        <div className="col-start-3 col-end-4 ">
          <button
            className="bg-black text-white float-right px-4 py-2 rounded"
            onClick={() => handlePageChange("next")}
          >
            Next Page
          </button>
        </div>
      )}
    </div>
  );
};

export default PageSelector;
