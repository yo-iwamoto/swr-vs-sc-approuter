import { LoadingUi } from "@/app/components/loading-ui";
import { Suspense } from "react";
import { UserCard } from "./user-card";
import { UsersPosts } from "./users-posts";

type Props = {
  params: {
    id: string;
  };
};

export default function Page({ params: { id } }: Props) {
  return (
    <main className="my-10 grid gap-8">
      <Suspense fallback={<LoadingUi />}>
        <UserCard userId={id} />
      </Suspense>

      <Suspense fallback={<LoadingUi />}>
        <UsersPosts userId={id} />
      </Suspense>
    </main>
  );
}
