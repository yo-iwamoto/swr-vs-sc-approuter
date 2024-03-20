"use client";

import { LoadingUi } from "@/app/components/loading-ui";
import { Post } from "@/app/pattern-1/components/post";
import { useLikesQuery } from "../queries/use-likes-query";

export function Likes() {
  const likesQuery = useLikesQuery();

  if (likesQuery.error !== undefined) {
    return <p>Error</p>;
  }

  if (likesQuery.data === undefined) {
    return <LoadingUi />;
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
