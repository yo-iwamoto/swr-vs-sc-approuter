import { api } from "@/lib/api";
import { resolveResponse } from "@/lib/resolve-response";
import { swrKeys } from "@/lib/swr-keys";
import useSWR from "swr";

export function useFollowingsQuery() {
  return useSWR([swrKeys.followings], () =>
    api.users.followings.$get().then(resolveResponse),
  );
}
