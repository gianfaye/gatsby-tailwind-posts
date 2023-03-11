import React from "react";
import { ApiResponseObject, IdToApiResponseObject } from "../utils/types";

interface PostsListProps {
  posts: ApiResponseObject[];
  usersById: IdToApiResponseObject;
}
const PostsList = ({ posts, usersById }: PostsListProps) => {
  return (
    <>
      {posts.map((post) => {
        const { id, userId, title, body } = post;
        const author = usersById[userId as number];
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
    </>
  );
};

export default PostsList;
