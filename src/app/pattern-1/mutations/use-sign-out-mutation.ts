import { api } from "@/lib/api";
import { resolveResponse } from "@/lib/resolve-response";
import useSWRMutation from "swr/mutation";

export function useSignOutMutation() {
  return useSWRMutation("signOut", () =>
    api.auth.signout.$post().then(resolveResponse),
  );
}
