import { api } from "@/lib/api";
import { mutateExact, mutateIncludes } from "@/lib/mutation";
import { resolveResponse } from "@/lib/resolve-response";
import { swrKeys } from "@/lib/swr-keys";
import useSWRMutation from "swr/mutation";

type Parameter = {
  userId: string;
};

export function useUnfollowMutation({ userId }: Parameter) {
  return useSWRMutation(
    ["unfollow-user", userId],
    () =>
      api.users[":id"].unfollow
        .$post({ param: { id: userId } })
        .then(resolveResponse),
    {
      async onSuccess() {
        mutateExact([swrKeys.isFollowing, userId]);
        mutateExact([swrKeys.followings]);
        mutateIncludes(swrKeys.timeline);
      },
    },
  );
}
