import { type PostApiResponse, api } from "@/lib/api";
import { callApi } from "../server/call-api";
import { Post } from "./post";

export async function Posts() {
  const { posts }: { posts: PostApiResponse[] } = await callApi(
    api.posts.$url().toString(),
    { next: { tags: ["posts"] } },
  );

  if (posts.length === 0) {
    return <p className="text-center">ポストがありません</p>;
  }

  return (
    <ul className="grid gap-3 max-w-2xl mx-auto w-full">
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </ul>
  );
}
