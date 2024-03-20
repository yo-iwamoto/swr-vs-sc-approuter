import { Hono } from "hono";
import { handle } from "hono/vercel";
import { authRoute } from "./routes/auth";
import { postsRoute } from "./routes/posts";
import { usersRoute } from "./routes/users";

const app = new Hono().basePath("/api");

const routes = app
  .route("/auth", authRoute)
  .route("/posts", postsRoute)
  .route("/users", usersRoute);

export type AppType = typeof routes;

const handler = handle(app);

export const GET = handler;
export const POST = handler;
export const PUT = handler;
export const PATCH = handler;
export const DELETE = handler;
