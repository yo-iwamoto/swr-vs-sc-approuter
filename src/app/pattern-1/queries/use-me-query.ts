import { api } from "@/lib/api";
import { resolveResponse } from "@/lib/resolve-response";
import useSWR, { type SWRConfiguration } from "swr";

export function useMeQuery(options?: SWRConfiguration) {
  return useSWR(
    ["me"],
    () => api.auth.me.$get().then(resolveResponse),
    options,
  );
}
