import {
  Base,
  Cluster,
  FaStarIcon,
  FaTrashIcon,
  FaUserIcon,
} from "@/components/client-ui";
import { type PostApiResponse, api } from "@/lib/api";
import { formatDate } from "@/lib/format-date";
import { revalidateTag } from "next/cache";
import Link from "next/link";
import { LikeControl } from "../like-control";
import { currentUser } from "../server/auth";
import { callApi } from "../server/call-api";
import { FormStatusButton } from "./form-status-button";

type Props = {
  post: PostApiResponse;
};

export async function Post({ post }: Props) {
  const me = await currentUser();
  if (me === null) return false;

  const isMyPost = me.id === post.userId;

  const deletePostAction = async () => {
    "use server";

    await callApi(
      api.posts[":id"].$url({ param: { id: post.id } }).toString(),
      {
        method: "DELETE",
      },
    );
    revalidateTag("posts");
  };

  return (
    <Base as="li" className="p-4 grid gap-2">
      <Cluster align="center" justify="space-between">
        <div className="flex items-center gap-2">
          <Link
            href={`/pattern-1/user/${post.User.id}`}
            className="font-bold hover:underline"
          >
            <Cluster as="span" align="center">
              <FaUserIcon />
              <span>{post.User.username}</span>
            </Cluster>
          </Link>

          <span className="text-sm text-gray-600">
            {formatDate(post.createdAt)}
          </span>

          {post.likeCount > 0 && (
            <span className="text-sm flex items-center gap-1">
              <FaStarIcon className="text-yellow-500" />
              <span>{post.likeCount}</span>
            </span>
          )}
        </div>

        {!isMyPost && <LikeControl post={post} />}

        {isMyPost && (
          <form action={deletePostAction}>
            <FormStatusButton
              size="s"
              type="submit"
              variant="secondary"
              prefix={<FaTrashIcon />}
            >
              削除
            </FormStatusButton>
          </form>
        )}
      </Cluster>

      <p>{post.content}</p>
    </Base>
  );
}
