import { api } from "@/lib/api";
import { mutateIncludes } from "@/lib/mutation";
import { resolveResponse } from "@/lib/resolve-response";
import { swrKeys } from "@/lib/swr-keys";
import useSWRMutation from "swr/mutation";

type Parameter = { postId: string };

export function useLikeMutation({ postId }: Parameter) {
  return useSWRMutation(
    ["like", postId],
    (_) =>
      api.posts[":id"].likes
        .$post({ param: { id: postId } })
        .then(resolveResponse),
    {
      onSuccess() {
        mutateIncludes(swrKeys.posts);
      },
    },
  );
}
