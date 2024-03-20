"use client";

import { useMeQuery } from "@/app/pattern-1/queries/use-me-query";
import {
  Base,
  Button,
  FaPlusIcon,
  FaUserIcon,
  FaXmarkIcon,
  Loader,
} from "smarthr-ui";
import { useFollowMutation } from "../mutations/use-follow-mutation";
import { useUnfollowMutation } from "../mutations/use-unfollow-mutation";
import { useIsFollowingQuery } from "../queries/use-is-following-query";
import { useUserQuery } from "../queries/use-user-query";

type Props = {
  userId: string;
};

export function UserCard({ userId }: Props) {
  const userQuery = useUserQuery({ userId });

  if (userQuery.error !== undefined) return <p>Error</p>;

  if (userQuery.data === undefined)
    return (
      <div className="h-80 grid place-items-center">
        <Loader />
      </div>
    );

  return (
    <Base className="w-full max-w-2xl mx-auto p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <FaUserIcon />
          <h1 className="text-xl font-bold">{userQuery.data.user.username}</h1>
        </div>

        <FollowControl userId={userId} />
      </div>
    </Base>
  );
}

function FollowControl({ userId }: Props) {
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
