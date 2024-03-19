"use client";

import { api } from "@/lib/api";
import useSWR from "swr";
import { Base, Stack } from "smarthr-ui";
import { resolveResponse } from "@/lib/resolve-response";

export function Posts() {
  const query = useSWR("posts", () => api.posts.$get().then(resolveResponse));

  if (query.error !== undefined) {
    return <p>Error</p>;
  }

  if (query.data === undefined) {
    return <p>Loading...</p>;
  }

  return (
    <Stack as="ul">
      {query.data.posts.map((post) => (
        <Base as="li">
          <p>{post.content}</p>
        </Base>
      ))}
    </Stack>
  );
}
