import { envVars } from "@/config/env";
import { prisma } from "@/lib/prisma";
import * as jwt from "hono/jwt";
import { cookies } from "next/headers";
import { cache } from "react";

export const authorizationHeader = cache((): { Authorization?: string } => {
  const token = cookies().get("token")?.value;
  if (token === undefined || token === "") return {};

  return { Authorization: `Bearer ${token}` };
});

export const currentUserId = cache(async () => {
  const token = cookies().get("token")?.value;
  if (token === undefined || token === "") return null;

  const payload: { userId: string } = await jwt.verify(
    token,
    envVars.JWT_SECRET,
    "HS256",
  );
  return payload.userId;
});

export const currentUser = cache(async () => {
  const userId = await currentUserId();
  if (userId === null) return null;

  return prisma.user.findUnique({ where: { id: userId } });
});

export const getIsSignedIn = cache(() =>
  currentUserId().then((userId) => userId !== null),
);
