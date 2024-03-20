"use client";

import { LoadingUi } from "@/app/components/loading-ui";
import { Post } from "@/app/pattern-1/components/post";
import { useTimelineQuery } from "../queries/use-timeline-query";

export function Posts() {
  const timelineQuery = useTimelineQuery();

  if (timelineQuery.error !== undefined) {
    return <p>Error</p>;
  }

  if (timelineQuery.data === undefined) {
    return <LoadingUi />;
  }

  if (timelineQuery.data.posts.length === 0) {
    return <p className="text-center">ポストがありません</p>;
  }

  return (
    <ul className="grid gap-3 max-w-2xl mx-auto w-full">
      {timelineQuery.data.posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </ul>
  );
}
