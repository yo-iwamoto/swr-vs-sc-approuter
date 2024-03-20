import { LoadingUi } from "@/app/components/loading-ui";
import { Suspense } from "react";
import { Likes } from "./likes";

export default function Page() {
  return (
    <main className="grid gap-8">
      <h1 className="font-bold text-xl text-center">いいねしたポスト</h1>

      <Suspense fallback={<LoadingUi />}>
        <Likes />
      </Suspense>
    </main>
  );
}
