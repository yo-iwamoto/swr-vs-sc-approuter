export async function resolveResponse<T>(res: {
  ok: boolean;
  json: () => Promise<T>;
}) {
  if (!res.ok) {
    throw new Error("Failed to fetch");
  }

  return res.json();
}
