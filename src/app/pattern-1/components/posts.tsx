"use client";

import { LoadingUi } from "@/app/components/loading-ui";
import { Post } from "@/app/pattern-1/components/post";
import { usePostsQuery } from "@/app/pattern-1/queries/use-posts-query";

export function Posts() {
  const postsQuery = usePostsQuery();

  if (postsQuery.error !== undefined) {
    return <p>Error</p>;
  }

  if (postsQuery.data === undefined) {
    return <LoadingUi />;
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
