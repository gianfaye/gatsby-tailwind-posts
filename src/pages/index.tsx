import React, { useState, useEffect } from "react";
import type { HeadFC, PageProps } from "gatsby";
import {
  ApiResponseObject,
  IdToApiResponseObject,
  SortingOrder,
} from "../utils/types";
import PostsList from "../components/PostsList";
import PageSelector from "../components/PageSelector";

const PAGE_TOTAL_COUNT = 2;

const IndexPage: React.FC<PageProps> = () => {
  const [postsData, setPostsData] = useState<ApiResponseObject[]>([]);
  const [usersByIdData, setUsersByIdData] = useState<IdToApiResponseObject>(
    {} as IdToApiResponseObject
  );

  const [sortedPostsData, setSortedPostsData] = useState<ApiResponseObject[]>(
    []
  );
  const [sortingOrder, setSortingOrder] = useState<SortingOrder>("default");

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [postsPerPage, setPostsPerPage] = useState<ApiResponseObject[]>([]);

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
    const sortedPosts = [...postsData].sort(
      (a: ApiResponseObject, b: ApiResponseObject) => {
        if (sortingOrder === "az")
          return a.title < b.title ? -1 : a.title > b.title ? 1 : 0;
        if (sortingOrder === "za")
          return a.title > b.title ? -1 : a.title < b.title ? 1 : 0;
        return 0;
      }
    );
    setSortedPostsData(sortedPosts);
  }, [postsData, sortingOrder]);

  useEffect(() => {
    const postsTotalCount = sortedPostsData.length;
    if (postsTotalCount <= 0) return;
    const postsToShow = postsTotalCount / PAGE_TOTAL_COUNT;
    const endIndex = currentPage * postsToShow;
    const startIndex = endIndex - postsToShow;
    const currentPosts = sortedPostsData.slice(startIndex, endIndex);
    setPostsPerPage(currentPosts);
  }, [sortedPostsData, currentPage]);

  const handlePostsSorting = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const sort = event.target.value as SortingOrder;
    setSortingOrder(sort);
  };

  return (
    <main>
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div>
            <div className="mx-auto max-w-2xl lg:mx-0">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Posts
              </h2>
              <p className="mt-2 text-lg leading-8 text-gray-600">
                Here are the sample posts from the JSON placeholder API
              </p>
            </div>
            <div className="flex items-center space-x-4">
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
          </div>

          <PageSelector
            currentPage={currentPage}
            pageTotalCount={PAGE_TOTAL_COUNT}
            setCurrentPage={setCurrentPage}
          />

          <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-y-16 gap-x-8 sm:mt-16 sm:pt-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            <PostsList posts={postsPerPage} usersById={usersByIdData} />
          </div>

          <PageSelector
            currentPage={currentPage}
            pageTotalCount={PAGE_TOTAL_COUNT}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>
    </main>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <title>Posts</title>;
