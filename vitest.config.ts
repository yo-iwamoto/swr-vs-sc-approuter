import path from "node:path";
import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";
import ignoreStderr from "./ignore-stderr.json";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["src/__tests__/setup.ts"],
    coverage: {
      reporter: ["html", "text-summary"],
    },
    onConsoleLog(log, type) {
      if (type === "stderr") {
        const isIgnoredKnownError = ignoreStderr.some((pattern) =>
          log.includes(pattern),
        );
        if (isIgnoredKnownError) {
          return false;
        }
      }

      return true;
    },
  },
});
