import { api } from "@/lib/api";
import { mutateIncludes } from "@/lib/mutation";
import { resolveResponse } from "@/lib/resolve-response";
import { swrKeys } from "@/lib/swr-keys";
import useSWRMutation from "swr/mutation";

type Argument = { username: string };

export function useSignInMutation() {
  return useSWRMutation(
    "sign-in",
    (_, { arg }: { arg: Argument }) =>
      api.auth.signin.$post({ json: arg }).then(resolveResponse),
    {
      onSuccess() {
        mutateIncludes(swrKeys.me);
        mutateIncludes(swrKeys.timeline);
      },
    },
  );
}
