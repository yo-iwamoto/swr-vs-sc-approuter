import type { AppType } from "@/app/api/[[...route]]/route";
import { type InferResponseType, hc } from "hono/client";

export const { api } = hc<AppType>("http://localhost:3000");

export type PostApiResponse = InferResponseType<
  typeof api.posts.$get
>["posts"][number];
