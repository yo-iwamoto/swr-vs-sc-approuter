import { api } from "@/lib/api";
import { resolveResponse } from "@/lib/resolve-response";
import useSWR from "swr";

type Parameter = {
  userId: string;
};

export function useIsFollowingQuery({ userId }: Parameter) {
  return useSWR(["is-following", userId], () =>
    api.users[":id"]["is-following"]
      .$get({ param: { id: userId } })
      .then(resolveResponse),
  );
}
