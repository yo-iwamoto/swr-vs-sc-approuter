import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SignIn } from "./sign-in";

const triggerMock = vi.fn(async () => ({ type: "signin" }));
vi.mock("@/app/pattern-1/mutations/use-sign-in-mutation", () => ({
  useSignInMutation: vi.fn(() => ({
    trigger: triggerMock,
  })),
}));

const mutateMock = vi.hoisted(() => vi.fn());
vi.mock("swr", () => ({ mutate: mutateMock }));

const notifyMock = vi.hoisted(() => vi.fn());
vi.mock("@/app/components/notification-bar-area", () => ({
  useNotification: vi.fn(() => ({
    notify: notifyMock,
  })),
}));

describe("SignIn", () => {
  it("サインインボタンを押すと、サインインリクエストが行われること", async () => {
    render(<SignIn />);

    await userEvent.type(
      screen.getByRole("textbox", { name: "ユーザー名" }),
      "user",
    );
    await userEvent.click(screen.getByRole("button", { name: "サインイン" }));

    expect(triggerMock).toHaveBeenLastCalledWith({ username: "user" });
  });

  it('サインイン後、"me" が mutate されること', async () => {
    render(<SignIn />);

    await userEvent.type(
      screen.getByRole("textbox", { name: "ユーザー名" }),
      "user",
    );
    await userEvent.click(screen.getByRole("button", { name: "サインイン" }));

    expect(mutateMock).toHaveBeenLastCalledWith(["me"]);
  });

  it("サインイン後、種別がサインインであれば、サインインした旨通知が表示されること", async () => {
    render(<SignIn />);

    await userEvent.type(
      screen.getByRole("textbox", { name: "ユーザー名" }),
      "user",
    );
    await userEvent.click(screen.getByRole("button", { name: "サインイン" }));

    expect(notifyMock).toHaveBeenLastCalledWith({
      type: "success",
      message: "サインインしました",
    });
  });

  it("サインイン後、種別がサインアップであれば、ユーザーを作成した旨通知が表示されること", async () => {
    triggerMock.mockResolvedValue({ type: "signup" });

    render(<SignIn />);

    await userEvent.type(
      screen.getByRole("textbox", { name: "ユーザー名" }),
      "user",
    );
    await userEvent.click(screen.getByRole("button", { name: "サインイン" }));

    expect(notifyMock).toHaveBeenLastCalledWith({
      type: "success",
      message: "ユーザーを新しく作成し、サインインしました",
    });
  });
});
