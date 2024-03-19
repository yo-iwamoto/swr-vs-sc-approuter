"use client";

import type { PostApiResponse } from "@/lib/api";
import {
  Base,
  Button,
  Cluster,
  Dropdown,
  DropdownContent,
  DropdownTrigger,
  FaCaretDownIcon,
  FaUserIcon,
  Loader,
} from "smarthr-ui";
import { mutate } from "swr";
import { useMeQuery } from "../queries/use-me-query";
import { usePostsQuery } from "../queries/use-posts-query";
import { useDeletePostMutation } from "../mutations/use-delete-post-mutation";

export function Posts() {
  const postsQuery = usePostsQuery();

  if (postsQuery.error !== undefined) {
    return <p>Error</p>;
  }

  if (postsQuery.data === undefined) {
    return (
      <div className="h-80 grid place-items-center">
        <Loader />
      </div>
    );
  }

  if (postsQuery.data.posts.length === 0) {
    return <p className="text-center">ポストがありません</p>;
  }

  return (
    <ul className="grid gap-3 max-w-2xl mx-auto w-full">
      {postsQuery.data.posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </ul>
  );
}

type PostProps = {
  post: PostApiResponse;
};

function Post({ post }: PostProps) {
  const meQuery = useMeQuery();

  const mutation = useDeletePostMutation();

  const onClickDelete = async () => {
    if (!confirm("本当に削除しますか？")) return;

    await mutation.trigger({ id: post.id });
    await mutate(["posts"]);
  };

  if (meQuery.data === undefined) return false;

  const isMyPost = meQuery.data.user.id === post.userId;

  return (
    <Base as="li" className="p-4 grid gap-2">
      <Cluster align="center" justify="space-between">
        <p className="font-bold">
          <Cluster align="center">
            <FaUserIcon />
            <span>{post.User.username}</span>
          </Cluster>
        </p>

        {isMyPost && (
          <Dropdown>
            <DropdownTrigger>
              <Button size="s" type="button" suffix={<FaCaretDownIcon />}>
                操作
              </Button>
            </DropdownTrigger>
            <DropdownContent>
              <ul>
                <li>
                  <Button type="button" onClick={onClickDelete}>
                    削除
                  </Button>
                </li>
              </ul>
            </DropdownContent>
          </Dropdown>
        )}
      </Cluster>

      <p>{post.content}</p>
    </Base>
  );
}
