import { PostForm } from "../components/post-form";
import { Posts } from "./components/posts";

export default function Page() {
  return (
    <main className="py-8 px-2 grid gap-12">
      <PostForm />

      <Posts />
    </main>
  );
}
