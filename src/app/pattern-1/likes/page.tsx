import { Likes } from "./components/likes";

export default function Page() {
  return (
    <main className="grid gap-8">
      <h1 className="font-bold text-xl text-center">いいねしたポスト</h1>

      <Likes />
    </main>
  );
}
