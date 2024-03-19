import { AuthGuard } from "./auth-guard";
import { render, screen } from "@testing-library/react";

const useMeQueryMock = vi.hoisted(() => vi.fn());
vi.mock("@/app/pattern-1/queries/use-me-query", () => ({
  useMeQuery: useMeQueryMock,
}));

describe("AuthGuard", () => {
  it("/auth/me でエラーレスポンスを受け取った時、WhenUnauthenticated をレンダリングすること", () => {
    useMeQueryMock.mockReturnValue({ error: "error" });

    render(
      <AuthGuard WhenUnauthenticated={() => <p>Unauthenticated</p>}>
        <p>Authenticated</p>
      </AuthGuard>,
    );

    expect(screen.getByText("Unauthenticated")).toBeDefined();
  });

  it("/auth/me でデータが取得できた時、children をレンダリングすること", () => {
    useMeQueryMock.mockReturnValue({ data: { id: "1" } });

    render(
      <AuthGuard WhenUnauthenticated={() => <p>Unauthenticated</p>}>
        <p>Authenticated</p>
      </AuthGuard>,
    );

    expect(screen.getByText("Authenticated")).toBeDefined();
  });

  it("/auth/me が取得中の時、ローダーが表示されること", () => {
    useMeQueryMock.mockReturnValue({ data: undefined });

    render(
      <AuthGuard WhenUnauthenticated={() => <p>Unauthenticated</p>}>
        <p>Authenticated</p>
      </AuthGuard>,
    );

    expect(screen.getByRole("status")).toHaveTextContent("処理中");
  });
});
