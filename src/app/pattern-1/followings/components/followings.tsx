"use client";

import { Base, FaUserIcon, Loader } from "smarthr-ui";
import { FollowControl } from "../../components/follow-control";
import { useFollowingsQuery } from "../queries/use-followings-query";

export function Followings() {
  const followingsQuery = useFollowingsQuery();

  if (followingsQuery.error !== undefined) {
    return <p>Error</p>;
  }

  if (followingsQuery.data === undefined) {
    return (
      <div className="h-80 grid place-items-center">
        <Loader />
      </div>
    );
  }

  if (followingsQuery.data.followings.length === 0) {
    return <p className="text-center">まだ誰もフォローしていません</p>;
  }

  return (
    <ul className="grid gap-2">
      {followingsQuery.data.followings.map((user) => (
        <Base key={user.id} className="w-full max-w-2xl mx-auto p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FaUserIcon />
              <h1 className="text-xl font-bold">{user.username}</h1>
            </div>
            <FollowControl userId={user.id} />
          </div>
        </Base>
      ))}
    </ul>
  );
}
