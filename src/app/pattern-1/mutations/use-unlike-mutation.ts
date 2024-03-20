import { api } from "@/lib/api";
import { mutateIncludes } from "@/lib/mutation";
import { resolveResponse } from "@/lib/resolve-response";
import { swrKeys } from "@/lib/swr-keys";
import useSWRMutation from "swr/mutation";

type Parameter = { postId: string };

export function useUnlikeMutation({ postId }: Parameter) {
  return useSWRMutation(
    ["unlike", postId],
    (_) =>
      api.posts[":id"].likes
        .$delete({ param: { id: postId } })
        .then(resolveResponse),
    {
      onSuccess() {
        mutateIncludes(swrKeys.posts);
      },
    },
  );
}
