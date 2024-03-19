import { prisma } from "@/lib/prisma";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";
import { envVars } from "@/config/env";
import * as jwt from "hono/jwt";
import { setCookie, deleteCookie } from "hono/cookie";
import { currentUser } from "../lib/auth";

const app = new Hono();

export const authRoute = app
  .get("/me", async (c) => {
    const user = await currentUser(c);
    return c.json({ user });
  })
  .post(
    "/signin",
    zValidator(
      "json",
      z.object({
        username: z.string(),
      }),
    ),
    async (c) => {
      const { username } = c.req.valid("json");
      const user = await prisma.user.findUnique({ where: { username } });
      if (user === null) {
        const newUser = await prisma.user.create({ data: { username } });
        const token = await jwt.sign(
          { userId: newUser.id },
          envVars.JWT_SECRET,
          "HS256",
        );
        setCookie(c, "token", token);
        return c.json({ user: newUser, type: "signup" as const });
      }

      const token = await jwt.sign({ userId: user.id }, envVars.JWT_SECRET);
      setCookie(c, "token", token);
      return c.json({ user, type: "signin" as const });
    },
  )
  .post("/signout", (c) => {
    deleteCookie(c, "token");
    return c.json({ status: "ok" });
  });
