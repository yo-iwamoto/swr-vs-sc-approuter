import { LoadingUi } from "@/app/components/loading-ui";
import { Suspense } from "react";
import { getIsSignedIn } from "../server/auth";
import { Followings } from "./followings";

export default async function Page() {
  if (!(await getIsSignedIn())) return false;

  return (
    <main className="grid gap-8">
      <h1 className="font-bold text-xl text-center">フォロー中のユーザー</h1>

      <Suspense fallback={<LoadingUi />}>
        <Followings />
      </Suspense>
    </main>
  );
}
