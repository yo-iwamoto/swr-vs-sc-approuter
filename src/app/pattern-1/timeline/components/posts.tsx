"use client";

import { Post } from "@/app/pattern-1/components/post";
import { Loader } from "smarthr-ui";
import { useTimelineQuery } from "../queries/use-timeline-query";

export function Posts() {
  const timelineQuery = useTimelineQuery();

  if (timelineQuery.error !== undefined) {
    return <p>Error</p>;
  }

  if (timelineQuery.data === undefined) {
    return (
      <div className="h-80 grid place-items-center">
        <Loader />
      </div>
    );
  }

  if (timelineQuery.data.posts.length === 0) {
    const message =
      timelineQuery.data.followingUserIds.length === 0
        ? "まだ誰もフォローしていません"
        : "ポストがありません";

    return <p className="text-center">{message}</p>;
  }

  return (
    <ul className="grid gap-3 max-w-2xl mx-auto w-full">
      {timelineQuery.data.posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </ul>
  );
}
