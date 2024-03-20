import { FaPlusIcon, FaXmarkIcon } from "@/components/client-ui";
import { api } from "@/lib/api";
import { revalidateTag } from "next/cache";
import { currentUser } from "../server/auth";
import { callApi } from "../server/call-api";
import { FormStatusButton } from "./form-status-button";

type Props = {
  userId: string;
};

export async function FollowControl({ userId }: Props) {
  const me = await currentUser();
  if (me === null) return false;

  const { isFollowing }: { isFollowing: boolean } = await callApi(
    api.users[":id"]["is-following"].$url({ param: { id: userId } }).toString(),
    { next: { tags: ["is-following"] } },
  );

  return (
    <span className="h-[42px]">
      {isFollowing ? (
        <UnfollowButton userId={userId} />
      ) : (
        <FollowButton userId={userId} />
      )}
    </span>
  );
}

function FollowButton({ userId }: Props) {
  const followAction = async () => {
    "use server";

    await callApi(
      api.users[":id"].follow.$url({ param: { id: userId } }).toString(),
      {
        method: "POST",
      },
    );
    revalidateTag("is-following");
    revalidateTag("followings");
  };

  return (
    <form action={followAction}>
      <FormStatusButton type="submit" variant="primary" prefix={<FaPlusIcon />}>
        フォロー
      </FormStatusButton>
    </form>
  );
}

function UnfollowButton({ userId }: Props) {
  const unfollowAction = async () => {
    "use server";

    await callApi(
      api.users[":id"].unfollow.$url({ param: { id: userId } }).toString(),
      {
        method: "POST",
      },
    );
    revalidateTag("is-following");
    revalidateTag("followings");
  };

  return (
    <form action={unfollowAction}>
      <FormStatusButton
        type="submit"
        variant="secondary"
        prefix={<FaXmarkIcon />}
      >
        フォロー解除
      </FormStatusButton>
    </form>
  );
}
