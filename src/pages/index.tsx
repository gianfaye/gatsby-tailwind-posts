import React, { useState, useEffect } from "react";
import type { HeadFC, PageProps } from "gatsby";

interface GenericObject {
  [key: string]: string | number | boolean;
}
interface ApiResponseObject {
  [key: string]: string | number | boolean | GenericObject;
}

type IdToApiResponseObject = Record<string, ApiResponseObject>;

const PAGE_TOTAL_COUNT = 2;

const IndexPage: React.FC<PageProps> = () => {
  const [postsData, setPostsData] = useState<ApiResponseObject[]>([]);
  const [usersByIdData, setUsersByIdData] = useState<IdToApiResponseObject>(
    {} as IdToApiResponseObject
  );
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [postsToShow, setPostsToShow] = useState<ApiResponseObject[]>([]);

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === PAGE_TOTAL_COUNT;

  const getPostsData = async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const jsonResponse = await response.json();

    setPostsData(jsonResponse);
  };

  const getUsersData = async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const jsonResponse = await response.json();

    const usersById = jsonResponse.reduce(
      (accumulator: IdToApiResponseObject, user: ApiResponseObject) => {
        const userId = user.id as number;
        accumulator[userId] = user;
        return accumulator;
      }
    ) as IdToApiResponseObject;

    setUsersByIdData(usersById);
  };

  useEffect(() => {
    getPostsData();
    getUsersData();
  }, []);

  useEffect(() => {
    const postsTotalCount = postsData.length;
    if (postsTotalCount <= 0) return;
    const postsPerPage = postsTotalCount / PAGE_TOTAL_COUNT;
    const endIndex = currentPage * postsPerPage;
    const startIndex = endIndex - postsPerPage;
    const currentPosts = postsData.slice(startIndex, endIndex);
    setPostsToShow(currentPosts);
  }, [postsData, currentPage]);

  const handlePageChange = (action: string) => {
    if (action === "prev") {
      setCurrentPage(currentPage - 1);
      return;
    }
    setCurrentPage(currentPage + 1);
  };

  return (
    <main>
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Posts
            </h2>
            <p className="mt-2 text-lg leading-8 text-gray-600">
              Here are the sample posts from the JSON placeholder API
            </p>
          </div>

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
                <span>Showing page {currentPage} of {PAGE_TOTAL_COUNT}</span>
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

          <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-y-16 gap-x-8 sm:mt-16 sm:pt-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {postsToShow.map((post) => {
              const { id, userId, title, body } = post;
              const author = usersByIdData[userId as number];
              const authorName = (author?.name as string) ?? "No author";
              return (
                <article
                  key={id as string}
                  className="flex max-w-xl flex-col items-start justify-between"
                >
                  <div className="flex items-center gap-x-4 text-xs"></div>
                  <div className="group relative">
                    <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600 capitalize">
                      <a href="#">{title as string}</a>
                    </h3>
                    <p className="mt-5 text-sm leading-6 text-gray-600 line-clamp-3 sentence-case">
                      {body as string}
                    </p>
                  </div>
                  <div className="relative mt-8 flex items-center gap-x-4">
                    <div className="text-sm leading-6">
                      <p className="font-semibold text-gray-900">
                        <a href="#">
                          <span className="absolute inset-0" />
                          {authorName}
                        </a>
                      </p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <title>Posts</title>;
