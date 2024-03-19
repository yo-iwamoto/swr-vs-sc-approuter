import { api } from "@/lib/api";
import { resolveResponse } from "@/lib/resolve-response";
import useSWRMutation from "swr/mutation";

type Argument = { username: string };

export function useSignInMutation() {
  return useSWRMutation("sign-in", (_, { arg }: { arg: Argument }) =>
    api.auth.signin.$post({ json: arg }).then(resolveResponse),
  );
}
