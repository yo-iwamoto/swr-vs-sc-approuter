import { Base, FaUserIcon } from "@/components/client-ui";
import { type UserApiResponse, api } from "@/lib/api";
import { FollowControl } from "../components/follow-control";
import { callApi } from "../server/call-api";

export async function Followings() {
  const { followings }: { followings: UserApiResponse[] } = await callApi(
    api.users.followings.$url().toString(),
    { next: { tags: ["followings"] } },
  );

  if (followings.length === 0) {
    return <p className="text-center">まだ誰もフォローしていません</p>;
  }

  return (
    <ul className="grid gap-2">
      {followings.map((user) => (
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
