import { api } from "@/lib/api";
import { resolveResponse } from "@/lib/resolve-response";
import useSWR, { type SWRConfiguration } from "swr";

export function usePostsQuery(options?: SWRConfiguration) {
  return useSWR(
    ["posts"],
    () => api.posts.$get().then(resolveResponse),
    options,
  );
}
