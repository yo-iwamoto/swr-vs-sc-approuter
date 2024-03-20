import { api } from "@/lib/api";
import { invalidateAll, mutateExact } from "@/lib/mutation";
import { resolveResponse } from "@/lib/resolve-response";
import { swrKeys } from "@/lib/swr-keys";
import useSWRMutation from "swr/mutation";

export function useSignOutMutation() {
  return useSWRMutation(
    "signOut",
    () => api.auth.signout.$post().then(resolveResponse),
    {
      onSuccess() {
        invalidateAll();
        mutateExact([swrKeys.me]);
      },
    },
  );
}
