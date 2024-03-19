"use client";

import { useNotification } from "@/app/components/notification-bar-area";
import { api } from "@/lib/api";
import { resolveResponse } from "@/lib/resolve-response";
import { useState, type FormEvent } from "react";
import { Base, Button, FormControl, Input, Stack } from "smarthr-ui";
import { mutate } from "swr";

export function SignIn() {
  const [isLoading, setIsLoading] = useState(false);
  const { notify } = useNotification();

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      const username = new FormData(e.currentTarget).get("username");
      if (typeof username !== "string") return;

      const res = await api.auth.signin
        .$post({ json: { username } })
        .then(resolveResponse);
      await mutate(["me"]);
      const message =
        res.type === "signin"
          ? "サインインしました"
          : "ユーザーを新しく作成し、サインインしました";
      notify({ type: "success", message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Base className="p-8 max-w-md mx-auto my-20">
      <form onSubmit={onSubmit}>
        <Stack className="items-center gap-2">
          <h1 className="text-lg font-bold">サインイン画面</h1>

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
            loading={isLoading}
          >
            <span>サインイン</span>
          </Button>
        </Stack>
      </form>
    </Base>
  );
}
