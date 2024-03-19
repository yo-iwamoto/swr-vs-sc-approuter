import type { AppType } from "@/app/pattern-1/api/[[...route]]/route";
import { type InferResponseType, hc } from "hono/client";

export const api = hc<AppType>("http://localhost:3000")["pattern-1"].api;

export type PostApiResponse = InferResponseType<
  typeof api.posts.$get
>["posts"][number];
