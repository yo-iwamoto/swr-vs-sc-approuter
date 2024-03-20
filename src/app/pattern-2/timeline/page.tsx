import { Suspense } from "react";
import { PostForm } from "../components/post-form";
import { Posts } from "../components/posts";
import { LoadingUi } from "@/app/components/loading-ui";

export default function Page() {
  return (
    <main className="py-8 px-2 grid gap-12">
      <PostForm />

      <Suspense fallback={<LoadingUi />}>
        <Posts />
      </Suspense>
    </main>
  );
}
