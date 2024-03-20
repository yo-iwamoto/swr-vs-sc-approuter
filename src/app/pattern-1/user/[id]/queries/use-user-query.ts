import { api } from "@/lib/api";
import { resolveResponse } from "@/lib/resolve-response";
import { swrKeys } from "@/lib/swr-keys";
import useSWR from "swr";

type Parameter = {
  userId: string;
};

export function useUserQuery({ userId }: Parameter) {
  return useSWR([swrKeys.user, userId], () =>
    api.users[":id"].$get({ param: { id: userId } }).then(resolveResponse),
  );
}
