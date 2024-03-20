import { Post } from "@/app/pattern-2/components/post";
import { type PostApiResponse, api } from "@/lib/api";
import { callApi } from "../../server/call-api";

type Props = {
  userId: string;
};

export async function UsersPosts({ userId }: Props) {
  const { posts }: { posts: PostApiResponse[] } = await callApi(
    api.users[":id"].posts.$url({ param: { id: userId } }).toString(),
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
