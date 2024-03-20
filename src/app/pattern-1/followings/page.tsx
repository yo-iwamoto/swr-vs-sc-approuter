import { Followings } from "./components/followings";

export default function Page() {
  return (
    <main className="grid gap-8">
      <h1 className="font-bold text-xl text-center">フォロー中のユーザー</h1>

      <Followings />
    </main>
  );
}
