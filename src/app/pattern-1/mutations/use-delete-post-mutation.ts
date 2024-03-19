import { api } from "@/lib/api";
import { resolveResponse } from "@/lib/resolve-response";
import useSWRMutation from "swr/mutation";

type Argument = { id: string };

export function useDeletePostMutation() {
  return useSWRMutation("delete-post", (_, { arg }: { arg: Argument }) =>
    api.posts[":id"].$delete({ param: { id: arg.id } }).then(resolveResponse),
  );
}
