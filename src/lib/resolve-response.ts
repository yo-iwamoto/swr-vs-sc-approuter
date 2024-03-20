export async function resolveResponse<T>(res: {
  ok: boolean;
  json: () => Promise<T>;
  text: () => Promise<string>;
}) {
  if (!res.ok) {
    const response = await res.text();
    throw new Error("Failed to fetch", { cause: new Error(response) });
  }

  return res.json();
}
