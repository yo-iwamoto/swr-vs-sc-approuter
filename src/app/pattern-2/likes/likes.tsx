import { Post } from "@/app/pattern-2/components/post";
import { type PostApiResponse, api } from "@/lib/api";
import { callApi } from "../server/call-api";

export async function Likes() {
  const { posts }: { posts: PostApiResponse[] } = await callApi(
    api.posts.likes.$url().toString(),
    { next: { tags: ["posts", "likes"] } },
  );

  if (posts.length === 0) {
    return <p className="text-center">いいねしたポストがありません</p>;
  }

  return (
    <ul className="grid gap-3 max-w-2xl mx-auto w-full">
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </ul>
  );
}
