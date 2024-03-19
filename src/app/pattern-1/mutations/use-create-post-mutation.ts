import { api } from "@/lib/api";
import { resolveResponse } from "@/lib/resolve-response";
import useSWRMutation from "swr/mutation";

type Argument = { content: string };

export function useCreatePostMutation() {
  return useSWRMutation("create-post", (_, { arg }: { arg: Argument }) =>
    api.posts.$post({ json: arg }).then(resolveResponse),
  );
}
