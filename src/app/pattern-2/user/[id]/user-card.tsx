import { FollowControl } from "@/app/pattern-2/components/follow-control";
import { Base, FaUserIcon } from "@/components/client-ui";
import { type UserApiResponse, api } from "@/lib/api";
import { callApi } from "../../server/call-api";

type Props = {
  userId: string;
};

export async function UserCard({ userId }: Props) {
  const { user }: { user: UserApiResponse } = await callApi(
    api.users[":id"].$url({ param: { id: userId } }).toString(),
    { next: { tags: ["user"] } },
  );

  return (
    <Base className="w-full max-w-2xl mx-auto p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <FaUserIcon />
          <h1 className="text-xl font-bold">{user.username}</h1>
        </div>

        <FollowControl userId={userId} />
      </div>
    </Base>
  );
}
