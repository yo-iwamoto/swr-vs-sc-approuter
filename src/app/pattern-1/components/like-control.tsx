"use client";

import { Button, FaStarIcon, FaXmarkIcon } from "@/components/client-ui";
import type { PostApiResponse } from "@/lib/api";
import { useLikeMutation } from "../mutations/use-like-mutation";
import { useUnlikeMutation } from "../mutations/use-unlike-mutation";

type Props = {
  post: PostApiResponse;
};

export function LikeControl({ post }: Props) {
  const likeMutation = useLikeMutation({ postId: post.id });
  const unlikeMutation = useUnlikeMutation({ postId: post.id });

  const onClickLike = async () => {
    await likeMutation.trigger();
  };

  const onClickUnlike = async () => {
    await unlikeMutation.trigger();
  };

  return (
    <>
      {post.isLiked ? (
        <Button
          size="s"
          type="button"
          variant="secondary"
          onClick={onClickUnlike}
          loading={unlikeMutation.isMutating}
        >
          <div className="flex items-center gap-2">
            <FaXmarkIcon />
            <span>いいねを解除</span>
          </div>
        </Button>
      ) : (
        <Button
          size="s"
          type="button"
          variant="primary"
          onClick={onClickLike}
          loading={likeMutation.isMutating}
        >
          <div className="flex items-center gap-2">
            <FaStarIcon />
            <span>いいね</span>
          </div>
        </Button>
      )}
    </>
  );
}
