import { render, screen } from "@testing-library/react";
import { Posts } from "./posts";

const useMeQueryMock = vi.hoisted(() =>
  vi.fn(() => ({ data: { user: { id: "1" } } })),
);
vi.mock("@/app/pattern-1/queries/use-me-query", () => ({
  useMeQuery: useMeQueryMock,
}));

const usePostsQueryMock = vi.hoisted(() => vi.fn());
vi.mock("@/app/pattern-1/queries/use-posts-query", () => ({
  usePostsQuery: usePostsQueryMock,
}));

const triggerDeletePostMock = vi.fn();
vi.mock("@/app/pattern-1/mutations/use-delete-post-mutation", () => ({
  useDeletePostMutation: vi.fn(() => ({
    trigger: triggerDeletePostMock,
  })),
}));

const mutateMock = vi.hoisted(() => vi.fn());
vi.mock("swr", () => ({ mutate: mutateMock }));

describe("Posts", () => {
  it("ポストが1件もない時、ポストがありませんと表示されること", () => {
    usePostsQueryMock.mockReturnValue({ data: { posts: [] } });

    render(<Posts />);

    expect(screen.getByText("ポストがありません")).toBeDefined();
  });

  it("ポストが取得中の時、ローダーが表示されること", () => {
    usePostsQueryMock.mockReturnValue({ data: undefined });

    render(<Posts />);

    expect(screen.getByRole("status")).toHaveTextContent("処理中");
  });

  it("ポストが取得された時、ポストが全件表示されること", () => {
    usePostsQueryMock.mockReturnValue({
      data: {
        posts: [
          { id: "1", User: { username: "user-1" }, content: "Hello world" },
          { id: "2", User: { username: "user-2" }, content: "Second post" },
        ],
      },
    });

    render(<Posts />);

    expect(screen.getAllByRole("listitem")).toHaveLength(2);
    expect(screen.getAllByRole("listitem")[0]).toHaveTextContent(/user-1/);
    expect(screen.getAllByRole("listitem")[0]).toHaveTextContent(/Hello world/);
  });
});
