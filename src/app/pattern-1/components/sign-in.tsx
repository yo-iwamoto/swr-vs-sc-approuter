"use client";

import { api } from "@/lib/api";
import type { FormEvent } from "react";
import { Button, FormControl, Input, Stack } from "smarthr-ui";

export function SignIn() {
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const username = new FormData(e.currentTarget).get("username");
    if (typeof username !== "string") return;

    api.auth.signin;
  };

  return (
    <form onSubmit={onSubmit}>
      <Stack gap={2} as="form">
        <FormControl title="ユーザー名">
          <Input name="username" required minLength={1} maxLength={100} />
        </FormControl>

        <Button type="submit">ログイン</Button>
      </Stack>
    </form>
  );
}
