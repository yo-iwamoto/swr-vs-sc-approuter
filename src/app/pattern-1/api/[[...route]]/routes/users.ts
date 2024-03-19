import { prisma } from "@/lib/prisma";
import { Hono } from "hono";

const app = new Hono();

export const usersRoute = app.get("/", async (c) => {
  const users = await prisma.user.findMany();
  return c.json({ users });
});
