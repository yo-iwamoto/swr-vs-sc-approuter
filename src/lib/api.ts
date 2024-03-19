import { hc } from "hono/client";
import type { AppType } from "@/app/pattern-1/api/[[...route]]/route";

export const api = hc<AppType>("http://localhost:3000")["pattern-1"].api;
