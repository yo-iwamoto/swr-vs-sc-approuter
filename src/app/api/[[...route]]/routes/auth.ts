import { prisma } from "@/lib/prisma";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";
import { envVars } from "@/config/env";
import * as jwt from "hono/jwt";
import { HTTPException } from "hono/http-exception";
import { setCookie, deleteCookie } from "hono/cookie";

const app = new Hono();

export const authRoute = app
  .post(
    "/signup",
    zValidator(
      "json",
      z.object({
        username: z.string(),
      }),
    ),
    async (c) => {
      const { username } = c.req.valid("json");
      const user = await prisma.user.create({ data: { username } });
      const token = await jwt.sign(
        { userId: user.id },
        envVars.JWT_SECRET,
        "HS256",
      );
      setCookie(c, "token", token);
      return c.json({ user });
    },
  )
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
        throw new HTTPException(401, { message: "Invalid username" });
      }

      const token = await jwt.sign({ userId: user.id }, envVars.JWT_SECRET);
      setCookie(c, "token", token);
      return c.json({ user });
    },
  )
  .post("/signout", (c) => {
    deleteCookie(c, "token");
    return c.json({ status: "ok" });
  });
