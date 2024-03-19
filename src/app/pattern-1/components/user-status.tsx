"use client";

import { useNotification } from "@/app/components/notification-bar-area";
import { useSignOutMutation } from "@/app/pattern-1/mutations/use-sign-out-mutation";
import { useMeQuery } from "@/app/pattern-1/queries/use-me-query";
import { Button } from "smarthr-ui";
import { mutate } from "swr";

export function UserStatus() {
  const meQuery = useMeQuery();
  const { notify } = useNotification();
  const signOutMutation = useSignOutMutation();

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
