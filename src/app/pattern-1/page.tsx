import { PostForm } from "./components/post-form";
import { Posts } from "./components/posts";
import { UserStatus } from "./components/user-status";

export default function Page() {
  return (
    <div className="py-8 px-2 grid gap-12">
      <UserStatus />

      <main className="py-8 px-2 grid gap-8">
        <PostForm />

        <hr />

        <Posts />
      </main>
    </div>
  );
}
