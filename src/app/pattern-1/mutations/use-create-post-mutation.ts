import { api } from "@/lib/api";
import { mutateIncludes } from "@/lib/mutation";
import { resolveResponse } from "@/lib/resolve-response";
import { swrKeys } from "@/lib/swr-keys";
import useSWRMutation from "swr/mutation";

type Argument = { content: string };

export function useCreatePostMutation() {
  return useSWRMutation(
    "create-post",
    (_, { arg }: { arg: Argument }) =>
      api.posts.$post({ json: arg }).then(resolveResponse),
    {
      onSuccess() {
        mutateIncludes(swrKeys.posts);
      },
    },
  );
}
