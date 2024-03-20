import { FaStarIcon, FaXmarkIcon } from "@/components/client-ui";
import { type PostApiResponse, api } from "@/lib/api";
import { revalidateTag } from "next/cache";
import { FormStatusButton } from "./components/form-status-button";
import { callApi } from "./server/call-api";

type Props = {
  post: PostApiResponse;
};

export function LikeControl({ post }: Props) {
  const likeAction = async () => {
    "use server";

    await callApi(
      api.posts[":id"].likes.$url({ param: { id: post.id } }).toString(),
      { method: "POST" },
    );
    revalidateTag("posts");
  };

  const unlikeAction = async () => {
    "use server";

    await callApi(
      api.posts[":id"].likes.$url({ param: { id: post.id } }).toString(),
      { method: "DELETE" },
    );
    revalidateTag("posts");
  };

  return (
    <>
      {post.isLiked ? (
        <form action={unlikeAction}>
          <FormStatusButton size="s" type="submit" variant="secondary">
            <div className="flex items-center gap-2">
              <FaXmarkIcon />
              <span>いいねを解除</span>
            </div>
          </FormStatusButton>
        </form>
      ) : (
        <form action={likeAction}>
          <FormStatusButton size="s" type="submit" variant="primary">
            <div className="flex items-center gap-2">
              <FaStarIcon />
              <span>いいね</span>
            </div>
          </FormStatusButton>
        </form>
      )}
    </>
  );
}
