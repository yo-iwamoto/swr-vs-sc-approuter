import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { UserStatus } from "./user-status";

const useMeQueryMok = vi.hoisted(() => vi.fn());
vi.mock("@/app/pattern-1/queries/use-me-query", () => ({
  useMeQuery: useMeQueryMok,
}));

const triggerSignOutMock = vi.fn();
vi.mock("@/app/pattern-1/mutations/use-sign-out-mutation", () => ({
  useSignOutMutation: vi.fn(() => ({
    trigger: triggerSignOutMock,
  })),
}));

const notifyMock = vi.fn();
vi.mock("@/app/components/notification-bar-area", () => ({
  useNotification: vi.fn(() => ({
    notify: notifyMock,
  })),
}));

describe("UserStatus", () => {
  it("ログインしている時、ログインしているユーザー名が表示されること", () => {
    useMeQueryMok.mockReturnValue({ data: { user: { username: "john doe" } } });

    render(<UserStatus />);

    expect(screen.getByText(/john doe/)).toBeDefined();
  });

  it("ログインしている時、サインアウトボタンを押すと、サインアウトリクエストが行われること", async () => {
    useMeQueryMok.mockReturnValue({ data: { user: { username: "john doe" } } });
    render(<UserStatus />);

    await userEvent.click(screen.getByRole("button", { name: "サインアウト" }));

    expect(triggerSignOutMock).toHaveBeenCalledOnce();
  });

  it("ログインしていない時、false が返されること", () => {
    useMeQueryMok.mockReturnValue({ data: undefined });

    expect(UserStatus()).toBe(false);
  });

  it("snapshot", () => {
    useMeQueryMok.mockReturnValue({ data: { user: { username: "john doe" } } });
    const { asFragment } = render(<UserStatus />);

    expect(asFragment()).toMatchSnapshot();
  });
});
