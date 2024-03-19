"use client";

import { useNotification } from "@/app/components/notification-bar-area";
import { api } from "@/lib/api";
import { resolveResponse } from "@/lib/resolve-response";
import { Button } from "smarthr-ui";
import { mutate } from "swr";
import useSWRMutation from "swr/mutation";
import { useMeQuery } from "../queries/me";

export function UserStatus() {
  const meQuery = useMeQuery();
  const { notify } = useNotification();
  const signOutMutation = useSWRMutation("signOut", () =>
    api.auth.signout.$post().then(resolveResponse),
  );

  const onClickSignOut = async () => {
    await signOutMutation.trigger();
    await mutate(["me"]);
    notify({ type: "success", message: "サインアウトしました" });
  };

  if (meQuery.data === undefined) return false;

  return (
    <div className="flex gap-2 items-center justify-end">
      <p className="flex gap-1 items-center">
        <span className="font-bold">{meQuery.data.user.username}</span>
        <span>でログインしています</span>
      </p>

      <Button type="button" variant="secondary" onClick={onClickSignOut}>
        サインアウト
      </Button>
    </div>
  );
}
