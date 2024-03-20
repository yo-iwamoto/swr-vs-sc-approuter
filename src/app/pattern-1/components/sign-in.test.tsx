import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SignIn } from "./sign-in";

const triggerMock = vi.fn(async () => ({ type: "signin" }));
vi.mock("@/app/pattern-1/mutations/use-sign-in-mutation", () => ({
  useSignInMutation: vi.fn(() => ({
    trigger: triggerMock,
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
});
