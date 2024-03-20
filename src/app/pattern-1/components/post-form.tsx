"use client";

import { useCreatePostMutation } from "@/app/pattern-1/mutations/use-create-post-mutation";
import type { FormEvent } from "react";
import { Button, FormControl, Stack, Textarea } from "smarthr-ui";

export function PostForm() {
  const mutation = useCreatePostMutation();

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const content = new FormData(form).get("content");
    if (typeof content !== "string") return;

    await mutation.trigger({ content });
    form.reset();
  };

  return (
    <section className="max-w-lg mx-auto w-full">
      <form onSubmit={onSubmit}>
        <Stack className="items-center gap-1">
          <h1 className="text-lg font-bold">新規ポスト</h1>

          <FormControl title="ポストの本文" className="w-full">
            <Textarea
              name="content"
              required
              maxLength={140}
              className="w-full py-2"
              data-1p-ignore
              rows={5}
            />
          </FormControl>

          <Button
            type="submit"
            variant="primary"
            className="w-full overflow-hidden h-[42px]"
            loading={mutation.isMutating}
          >
            投稿
          </Button>
        </Stack>
      </form>
    </section>
  );
}
