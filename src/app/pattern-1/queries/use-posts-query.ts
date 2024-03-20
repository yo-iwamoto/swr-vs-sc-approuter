import { api } from "@/lib/api";
import { resolveResponse } from "@/lib/resolve-response";
import useSWR from "swr";

export function usePostsQuery() {
  return useSWR(["posts"], () => api.posts.$get().then(resolveResponse));
}
