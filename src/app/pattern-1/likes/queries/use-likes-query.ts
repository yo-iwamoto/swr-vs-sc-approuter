import { api } from "@/lib/api";
import { resolveResponse } from "@/lib/resolve-response";
import { swrKeys } from "@/lib/swr-keys";
import useSWR from "swr";

export function useLikesQuery() {
  return useSWR([swrKeys.posts, swrKeys.likes], () =>
    api.posts.likes.$get().then(resolveResponse),
  );
}
