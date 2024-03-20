import { prisma } from "@/lib/prisma";
import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { currentUserId } from "../lib/auth";

const app = new Hono();

export const usersRoute = app
  .get("/", async (c) => {
    const users = await prisma.user.findMany();
    return c.json({ users });
  })
  .get("/followings", async (c) => {
    const userId = await currentUserId(c);
    const followings = (
      await prisma.follow.findMany({
        where: { followingId: userId },
        include: { follower: true },
      })
    ).map((f) => f.follower);
    return c.json({ followings });
  })
  .get("/:id", async (c) => {
    const id = c.req.param("id");
    const user = await prisma.user.findUnique({ where: { id } });
    if (user === null) {
      throw new HTTPException(404, { message: "User not found" });
    }

    return c.json({ user });
  })
  .get("/:id/posts", async (c) => {
    const id = c.req.param("id");
    const posts = await prisma.post.findMany({
      where: { userId: id },
      include: { User: true },
    });
    return c.json({ posts });
  })
  .post("/:id/follow", async (c) => {
    const id = c.req.param("id");
    const userId = await currentUserId(c);
    await prisma.follow.create({
      data: { followerId: id, followingId: userId },
    });
    return c.json({ status: "ok" });
  })
  .post("/:id/unfollow", async (c) => {
    const id = c.req.param("id");
    const userId = await currentUserId(c);
    await prisma.follow.deleteMany({
      where: { followerId: id, followingId: userId },
    });
    return c.json({ status: "ok" });
  })
  .get("/:id/is-following", async (c) => {
    const id = c.req.param("id");
    const userId = await currentUserId(c);
    const follow = await prisma.follow.findFirst({
      where: { followerId: id, followingId: userId },
    });
    return c.json({ isFollowing: follow !== null });
  });
