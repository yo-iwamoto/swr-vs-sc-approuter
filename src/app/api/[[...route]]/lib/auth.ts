import { envVars } from "@/config/env";
import { prisma } from "@/lib/prisma";
import type { Context, Next } from "hono";
import { getCookie } from "hono/cookie";
import { HTTPException } from "hono/http-exception";
import * as jwt from "hono/jwt";

async function verifyToken(c: Context) {
  const token = getCookie(c, "token");
  if (token === undefined) {
    throw new HTTPException(401, { message: "Not authenticated" });
  }

  return jwt.verify(token, envVars.JWT_SECRET, "HS256");
}

export async function authMiddleware(c: Context, next: Next) {
  await verifyToken(c);
  await next();
}

export async function currentUserId(c: Context) {
  const token = getCookie(c, "token");
  if (token === undefined) {
    throw new HTTPException(401, { message: "Not authenticated" });
  }

  const payload: { userId: string } = await verifyToken(c);

  return payload.userId;
}

export async function currentUser(c: Context) {
  const userId = await currentUserId(c);
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });
  if (user === null) {
    throw new HTTPException(401, { message: "Invalid user" });
  }

  return user;
}
