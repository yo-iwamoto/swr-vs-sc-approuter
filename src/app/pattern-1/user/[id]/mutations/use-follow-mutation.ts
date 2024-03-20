import { api } from "@/lib/api";
import { invalidateExact, mutateIncludes } from "@/lib/mutation";
import { resolveResponse } from "@/lib/resolve-response";
import { swrKeys } from "@/lib/swr-keys";
import useSWRMutation from "swr/mutation";

type Parameter = {
  userId: string;
};

export function useFollowMutation({ userId }: Parameter) {
  return useSWRMutation(
    ["follow-user", userId],
    () =>
      api.users[":id"].follow
        .$post({ param: { id: userId } })
        .then(resolveResponse),
    {
      async onSuccess() {
        invalidateExact([swrKeys.isFollowing, userId]);
        mutateIncludes(swrKeys.timeline);
      },
    },
  );
}
