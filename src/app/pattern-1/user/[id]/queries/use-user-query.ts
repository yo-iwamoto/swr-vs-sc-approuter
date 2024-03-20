import { api } from "@/lib/api";
import { resolveResponse } from "@/lib/resolve-response";
import useSWR from "swr";

type Parameter = {
  userId: string;
};

export function useUserQuery({ userId }: Parameter) {
  return useSWR(["user", userId], () =>
    api.users[":id"].$get({ param: { id: userId } }).then(resolveResponse),
  );
}
