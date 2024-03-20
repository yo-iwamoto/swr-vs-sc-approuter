import { resolveResponse } from "@/lib/resolve-response";
import { authorizationHeader } from "./auth";

export async function callApi(url: string, init?: RequestInit) {
  return fetch(url, {
    headers: {
      ...authorizationHeader(),
      "Content-Type": "application/json",
      ...init?.headers,
    },
    ...init,
  }).then(resolveResponse);
}
