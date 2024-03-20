import { api } from "@/lib/api";
import { resolveResponse } from "@/lib/resolve-response";
import useSWR from "swr";

type Parameter = {
  userId: string;
};

export function useUsersPostsQuery({ userId }: Parameter) {
  return useSWR(["user", "posts", userId], () =>
    api.users[":id"].posts
      .$get({ param: { id: userId } })
      .then(resolveResponse),
  );
}
