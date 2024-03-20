"use client";

import { useNotification } from "@/app/components/notification-bar-area";
import { useSignInMutation } from "@/app/pattern-1/mutations/use-sign-in-mutation";
import type { FormEvent } from "react";
import { Base, Button, FormControl, Input } from "smarthr-ui";

export function SignIn() {
  const { notify } = useNotification();
  const signInMutation = useSignInMutation();

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const username = new FormData(e.currentTarget).get("username");
    if (typeof username !== "string") return;

    const res = await signInMutation.trigger({ username });
    const message =
      res.type === "signin"
        ? "サインインしました"
        : "ユーザーを新しく作成し、サインインしました";
    notify({ type: "success", message });
  };

  return (
    <Base className="p-8 max-w-md mx-auto my-20">
      <form onSubmit={onSubmit} className="flex flex-col items-center gap-5">
        <h1 className="text-lg font-bold">サインイン画面</h1>

        <p className="text-sm text-center">
          任意のユーザー名でサインインできます。
          <br />
          存在しないユーザー名の場合、作成してサインインします。
        </p>

        <FormControl title="ユーザー名" className="w-full">
          <Input
            name="username"
            required
            maxLength={100}
            className="w-full py-2"
            data-1p-ignore
          />
        </FormControl>

        <Button
          type="submit"
          variant="primary"
          className="w-full"
          loading={signInMutation.isMutating}
        >
          <span>サインイン</span>
        </Button>
      </form>
    </Base>
  );
}
