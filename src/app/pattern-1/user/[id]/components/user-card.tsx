"use client";

import { FollowControl } from "@/app/pattern-1/components/follow-control";
import { Base, FaUserIcon, Loader } from "smarthr-ui";
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
