import { Hono } from "hono";
import { authRoute } from "./routes/auth";
import { handle } from "hono/vercel";

export const runtime = "edge";

const app = new Hono().basePath("/api");

const routes = app.route("/auth", authRoute);

export type AppType = typeof routes;

const handler = handle(app);

export const GET = handler;
export const POST = handler;
export const PUT = handler;
export const PATCH = handler;
export const DELETE = handler;
