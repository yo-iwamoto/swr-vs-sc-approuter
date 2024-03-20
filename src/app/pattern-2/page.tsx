import { Suspense } from "react";
import { LoadingUi } from "../components/loading-ui";
import { Posts } from "./components/posts";
import { getIsSignedIn } from "./server/auth";

export default async function Page() {
  if (!(await getIsSignedIn())) return false;

  return (
    <main className="grid gap-8">
      <h1 className="font-bold text-xl text-center">全てのポスト</h1>

      <Suspense fallback={<LoadingUi />}>
        <Posts />
      </Suspense>
    </main>
  );
}
