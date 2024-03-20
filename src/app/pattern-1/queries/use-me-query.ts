import { api } from "@/lib/api";
import { resolveResponse } from "@/lib/resolve-response";
import useSWR from "swr";

export function useMeQuery() {
  return useSWR(["me"], () => api.auth.me.$get().then(resolveResponse));
}
