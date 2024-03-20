import { Stack, Textarea } from "@/components/client-ui";
import { api } from "@/lib/api";
import { revalidateTag } from "next/cache";
import { callApi } from "../server/call-api";
import { FormStatusButton } from "./form-status-button";

export function PostForm() {
  const createPostAction = async (data: FormData) => {
    "use server";

    const content = data.get("content");
    if (typeof content !== "string") return;

    await callApi(api.posts.$url().toString(), {
      method: "POST",
      body: JSON.stringify({
        content,
      }),
    });
    revalidateTag("posts");
  };

  return (
    <section className="max-w-lg mx-auto w-full">
      <form action={createPostAction}>
        <Stack className="items-center gap-1">
          <h1 className="text-lg font-bold">新規ポスト</h1>

          <div className="w-full grid gap-2">
            <label htmlFor="content" className="font-bold">
              ポストの本文
            </label>

            <Textarea
              id="content"
              name="content"
              required
              maxLength={140}
              className="w-full py-2"
              data-1p-ignore
              rows={5}
            />
          </div>

          <FormStatusButton
            type="submit"
            variant="primary"
            className="w-full overflow-hidden h-[42px]"
          >
            投稿
          </FormStatusButton>
        </Stack>
      </form>
    </section>
  );
}
