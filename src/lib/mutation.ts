import { type Arguments, mutate } from "swr";

function argIncludes(arg: Arguments, key: string) {
  return Array.isArray(arg) && arg.includes(key);
}

export function mutateIncludes(key: string) {
  return mutate((arg) => argIncludes(arg, key));
}

export function mutateExact(key: Arguments) {
  return mutate(key);
}

export function invalidateIncludes(key: string) {
  return mutate((arg) => argIncludes(arg, key), undefined, {
    revalidate: false,
  });
}

export function invalidateExact(key: Arguments) {
  return mutate(key, undefined, { revalidate: false });
}

export function invalidateAll() {
  return mutate(() => true, undefined, { revalidate: false });
}
