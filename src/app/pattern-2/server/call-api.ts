import { resolveResponse } from "@/lib/resolve-response";
import { getToken } from "./auth";

export async function callApi(url: string, init?: RequestInit) {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");

  const token = getToken();
  if (token !== null) {
    headers.append("Cookie", `token=${token}`);
  }

  return fetch(url, {
    headers,
    ...init,
  }).then(resolveResponse);
}
