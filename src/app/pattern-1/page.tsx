import { Posts } from "./components/posts";

export default function Page() {
  return (
    <main className="grid gap-8">
      <h1 className="font-bold text-xl text-center">全てのポスト</h1>

      <Posts />
    </main>
  );
}
