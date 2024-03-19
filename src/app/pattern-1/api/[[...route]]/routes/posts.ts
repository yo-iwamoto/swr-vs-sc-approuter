import { prisma } from "@/lib/prisma";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";
import { authMiddleware, currentUserId } from "../lib/auth";

const app = new Hono();

app.use("*", authMiddleware);

export const postsRoute = app
  .get("/", async (c) => {
    const posts = await prisma.post.findMany({
      include: { User: true },
      orderBy: { createdAt: "desc" },
    });

    return c.json({ posts });
  })
  .post(
    "/",
    zValidator(
      "json",
      z.object({
        content: z.string().min(1).max(140),
      }),
    ),
    async (c) => {
      const { content } = c.req.valid("json");
      const userId = await currentUserId(c);
      const post = await prisma.post.create({
        data: { content, userId },
      });
      return c.json({ post }, 201);
    },
  )
  .get("/:id", async (c) => {
    const id = c.req.param("id");
    const post = await prisma.post.findUnique({ where: { id } });
    return c.json({ post });
  })
  .delete("/:id", async (c) => {
    const id = c.req.param("id");
    const userId = await currentUserId(c);
    await prisma.post.delete({ where: { id, userId } });
    return c.json({ status: "ok" });
  })
  .post("/:id/likes", async (c) => {
    const id = c.req.param("id");
    const userId = await currentUserId(c);
    const like = await prisma.like.create({
      data: { userId, postId: id },
    });
    return c.json({ like }, 201);
  })
  .delete("/:id/likes", async (c) => {
    const id = c.req.param("id");
    const userId = await currentUserId(c);
    await prisma.like.deleteMany({ where: { postId: id, userId } });
    return c.json({ status: "ok" });
  });
