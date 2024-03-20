"use client";

import { Post } from "@/app/pattern-1/components/post";
import { usePostsQuery } from "@/app/pattern-1/queries/use-posts-query";
import { Loader } from "smarthr-ui";

export function Posts() {
  const postsQuery = usePostsQuery();

  if (postsQuery.error !== undefined) {
    return <p>Error</p>;
  }

  if (postsQuery.data === undefined) {
    return (
      <div className="h-80 grid place-items-center">
        <Loader />
      </div>
    );
  }

  if (postsQuery.data.posts.length === 0) {
    return <p className="text-center">ポストがありません</p>;
  }

  return (
    <ul className="grid gap-3 max-w-2xl mx-auto w-full">
      {postsQuery.data.posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </ul>
  );
}
