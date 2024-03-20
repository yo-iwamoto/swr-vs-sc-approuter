"use client";

import type { PostApiResponse } from "@/lib/api";
import Link from "next/link";
import {
  Base,
  Button,
  Cluster,
  Dropdown,
  DropdownContent,
  DropdownTrigger,
  FaCaretDownIcon,
  FaUserIcon,
} from "smarthr-ui";
import { useDeletePostMutation } from "../pattern-1/mutations/use-delete-post-mutation";
import { useMeQuery } from "../pattern-1/queries/use-me-query";

type Props = {
  post: PostApiResponse;
};

export function Post({ post }: Props) {
  const meQuery = useMeQuery();

  const mutation = useDeletePostMutation();

  const onClickDelete = async () => {
    if (!confirm("本当に削除しますか？")) return;

    await mutation.trigger({ id: post.id });
  };

  if (meQuery.data === undefined) return false;

  const isMyPost = meQuery.data.user.id === post.userId;

  return (
    <Base as="li" className="p-4 grid gap-2">
      <Cluster align="center" justify="space-between">
        <Link
          href={`/pattern-1/user/${post.User.id}`}
          className="font-bold hover:underline"
        >
          <Cluster as="span" align="center">
            <FaUserIcon />
            <span>{post.User.username}</span>
          </Cluster>
        </Link>

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
