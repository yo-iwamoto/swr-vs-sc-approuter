import { Hono } from "hono";
import { authRoute } from "./routes/auth";
import { handle } from "hono/vercel";
import { postsRoute } from "./routes/posts";

const app = new Hono().basePath("/pattern-1/api");

const routes = app.route("/auth", authRoute).route("/posts", postsRoute);

export type AppType = typeof routes;

const handler = handle(app);

export const GET = handler;
export const POST = handler;
export const PUT = handler;
export const PATCH = handler;
export const DELETE = handler;
