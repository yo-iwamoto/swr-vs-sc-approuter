import { api } from "@/lib/api";
import { mutateIncludes } from "@/lib/mutation";
import { resolveResponse } from "@/lib/resolve-response";
import { swrKeys } from "@/lib/swr-keys";
import useSWRMutation from "swr/mutation";

type Argument = { id: string };

export function useDeletePostMutation() {
  return useSWRMutation(
    "delete-post",
    (_, { arg }: { arg: Argument }) =>
      api.posts[":id"].$delete({ param: { id: arg.id } }).then(resolveResponse),
    {
      onSuccess() {
        mutateIncludes(swrKeys.posts);
      },
    },
  );
}
