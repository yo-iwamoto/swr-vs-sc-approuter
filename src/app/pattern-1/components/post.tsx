"use client";

import {
  Base,
  Button,
  Cluster,
  Dropdown,
  DropdownContent,
  DropdownTrigger,
  FaCaretDownIcon,
  FaStarIcon,
  FaUserIcon,
} from "@/components/client-ui";
import type { PostApiResponse } from "@/lib/api";
import { formatDate } from "@/lib/format-date";
import Link from "next/link";
import { useDeletePostMutation } from "../mutations/use-delete-post-mutation";
import { useMeQuery } from "../queries/use-me-query";
import { LikeControl } from "./like-control";

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
