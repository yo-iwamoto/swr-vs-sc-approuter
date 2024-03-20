"use client";

import { Post } from "@/app/pattern-1/components/post";
import { Loader } from "smarthr-ui";
import { useLikesQuery } from "../queries/use-likes-query";

export function Likes() {
  const likesQuery = useLikesQuery();

  if (likesQuery.error !== undefined) {
    return <p>Error</p>;
  }

  if (likesQuery.data === undefined) {
    return (
      <div className="h-80 grid place-items-center">
        <Loader />
      </div>
    );
  }

  if (likesQuery.data.posts.length === 0) {
    return <p className="text-center">いいねしたポストがありません</p>;
  }

  return (
    <ul className="grid gap-3 max-w-2xl mx-auto w-full">
      {likesQuery.data.posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </ul>
  );
}
