"use client";

import { LoadingUi } from "@/app/components/loading-ui";
import { Post } from "@/app/pattern-1/components/post";
import { useUsersPostsQuery } from "../queries/use-users-posts-query";

type Props = {
  userId: string;
};

export function UsersPosts({ userId }: Props) {
  const usersPostsQuery = useUsersPostsQuery({ userId });

  if (usersPostsQuery.error !== undefined) return <p>Error</p>;

  if (usersPostsQuery.data === undefined) {
    return <LoadingUi />;
  }

  if (usersPostsQuery.data.posts.length === 0) {
    return <p className="text-center">ポストがありません</p>;
  }

  return (
    <ul className="grid gap-3 max-w-2xl mx-auto w-full">
      {usersPostsQuery.data.posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </ul>
  );
}
