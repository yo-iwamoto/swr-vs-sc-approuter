import { api } from "@/lib/api";
import { resolveResponse } from "@/lib/resolve-response";
import { swrKeys } from "@/lib/swr-keys";
import useSWR from "swr";

export function useTimelineQuery() {
  return useSWR([swrKeys.posts, swrKeys.timeline], () =>
    api.posts.timeline.$get().then(resolveResponse),
  );
}
