import React, { useState, useEffect } from "react";
import type { HeadFC, PageProps } from "gatsby";
import {
  ApiResponseObject,
  IdToApiResponseObject,
  SortingOrder,
} from "../utils/types";
import {
  AuthorFilter,
  PageSelector,
  PostsList,
  PostsSort,
} from "../components";

const PAGE_TOTAL_COUNT = 2;

const IndexPage: React.FC<PageProps> = () => {
  const [postsData, setPostsData] = useState<ApiResponseObject[]>([]);
  const [usersData, setUsersData] = useState<ApiResponseObject[]>([]);
  const [usersByIdData, setUsersByIdData] = useState<IdToApiResponseObject>(
    {} as IdToApiResponseObject
  );
  const [sortedPostsData, setSortedPostsData] = useState<ApiResponseObject[]>(
    []
  );
  const [sortingOrder, setSortingOrder] = useState<SortingOrder>("default");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [postsPerPage, setPostsPerPage] = useState<ApiResponseObject[]>([]);
  const [selectedAuthor, setSelectedAuthor] = useState<ApiResponseObject>({});
  const [filteredAuthors, setFilteredAuthors] = useState<ApiResponseObject[]>(
    []
  );
  const [filteredPosts, setFilteredPosts] = useState<ApiResponseObject[]>([]);
  const [searchKeyword, setSearchKeyword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getPostsData = async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const jsonResponse = await response.json();
    setPostsData(jsonResponse);
  };

  const getUsersData = async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const jsonResponse = await response.json();
    const usersList = [...jsonResponse] as ApiResponseObject[];
    const usersById = usersList?.reduce((accumulator, user) => {
      const userId = user?.id as number;
      accumulator[userId] = user;
      return accumulator;
    }, {} as IdToApiResponseObject);
    setUsersData(jsonResponse);
    setUsersByIdData(usersById);
  };

  useEffect(() => {
    setIsLoading(true);
    getPostsData();
    getUsersData();
  }, []);

  useEffect(() => {
    const hasSelectedAuthor = Object.keys(selectedAuthor).length > 0;
    if (!hasSelectedAuthor) {
      setFilteredPosts(postsData);
      return;
    }
    const postsByAuthor = postsData.filter((post) => {
      const postAuthorId = post.userId as number;
      const selectedAuthorId = selectedAuthor?.id as number;
      return postAuthorId === selectedAuthorId;
    });
    setFilteredPosts(postsByAuthor);
  }, [selectedAuthor, postsData]);

  useEffect(() => {
    const sortedPosts = [...filteredPosts].sort(
      (a: ApiResponseObject, b: ApiResponseObject) => {
        if (sortingOrder === "az")
          return a.title < b.title ? -1 : a.title > b.title ? 1 : 0;
        if (sortingOrder === "za")
          return a.title > b.title ? -1 : a.title < b.title ? 1 : 0;
        return 0;
      }
    );
    setSortedPostsData(sortedPosts);
  }, [filteredPosts, sortingOrder]);

  useEffect(() => {
    const postsTotalCount = sortedPostsData.length;
    if (postsTotalCount <= 0) return;
    const postsToShow = postsTotalCount / PAGE_TOTAL_COUNT;
    const endIndex = currentPage * postsToShow;
    const startIndex = endIndex - postsToShow;
    const currentPosts = sortedPostsData.slice(startIndex, endIndex);
    setPostsPerPage(currentPosts);
    setIsLoading(false);
  }, [sortedPostsData, currentPage]);

  useEffect(() => {
    if (searchKeyword.length > 0) {
      const filtered = usersData.filter((user) =>
        (user.name as string)
          .toLowerCase()
          .includes(searchKeyword.toLowerCase())
      );
      setFilteredAuthors(filtered);
    } else {
      setFilteredAuthors([]);
      setSelectedAuthor({});
    }
  }, [searchKeyword, usersData]);

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

            <PostsSort
              sortingOrder={sortingOrder}
              setSortingOrder={setSortingOrder}
            />

            <AuthorFilter
              searchKeyword={searchKeyword}
              setSearchKeyword={setSearchKeyword}
              filteredAuthors={filteredAuthors}
              selectedAuthor={selectedAuthor}
              setSelectedAuthor={setSelectedAuthor}
            />
          </div>

          <PageSelector
            currentPage={currentPage}
            pageTotalCount={PAGE_TOTAL_COUNT}
            setCurrentPage={setCurrentPage}
          />

          {!isLoading && (
            <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-y-16 gap-x-8 sm:mt-16 sm:pt-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
              <PostsList posts={postsPerPage} usersById={usersByIdData} />
            </div>
          )}

          {isLoading && (
            <div className="flex mx-auto my-10 max-w-2xl sm:my-16 sm:py-8 lg:mx-0 lg:max-w-none justify-center items-center">
              <span>Loading posts...</span>
            </div>
          )}

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
