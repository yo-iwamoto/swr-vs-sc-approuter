"use client";

import { Button, FaPlusIcon, FaXmarkIcon } from "smarthr-ui";
import { useMeQuery } from "../queries/use-me-query";
import { useFollowMutation } from "../user/[id]/mutations/use-follow-mutation";
import { useUnfollowMutation } from "../user/[id]/mutations/use-unfollow-mutation";
import { useIsFollowingQuery } from "../user/[id]/queries/use-is-following-query";

type Props = {
  userId: string;
};

export function FollowControl({ userId }: Props) {
  const meQuery = useMeQuery();
  const isFollowingQuery = useIsFollowingQuery({ userId });

  if (meQuery.data?.user.id === userId) return false;

  return (
    <span className="h-[42px]">
      {isFollowingQuery.data === undefined ? (
        <></>
      ) : isFollowingQuery.data.isFollowing ? (
        <UnfollowButton userId={userId} />
      ) : (
        <FollowButton userId={userId} />
      )}
    </span>
  );
}

function FollowButton({ userId }: Props) {
  const followMutation = useFollowMutation({ userId });

  const onClick = async () => {
    await followMutation.trigger();
  };

  return (
    <Button
      type="button"
      variant="primary"
      prefix={<FaPlusIcon />}
      loading={followMutation.isMutating}
      onClick={onClick}
    >
      フォロー
    </Button>
  );
}

function UnfollowButton({ userId }: Props) {
  const unfollowMutation = useUnfollowMutation({ userId });

  const onClick = async () => {
    await unfollowMutation.trigger();
  };

  return (
    <Button
      type="button"
      variant="secondary"
      prefix={<FaXmarkIcon />}
      loading={unfollowMutation.isMutating}
      onClick={onClick}
    >
      フォロー解除
    </Button>
  );
}
