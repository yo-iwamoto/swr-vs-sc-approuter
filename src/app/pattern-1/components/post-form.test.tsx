import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { PostForm } from "./post-form";

const triggerMock = vi.fn();
vi.mock("@/app/pattern-1/mutations/use-create-post-mutation", () => ({
  useCreatePostMutation: vi.fn(() => ({
    trigger: triggerMock,
  })),
}));

const mutateMock = vi.hoisted(() => vi.fn());
vi.mock("swr", () => ({
  mutate: mutateMock,
}));

describe("PostForm", () => {
  it("サブミットすると、ポストの作成リクエストが行われること", async () => {
    render(<PostForm />);

    await userEvent.type(
      screen.getByRole("textbox", { name: "ポストの本文" }),
      "Hello world!",
    );
    await userEvent.click(screen.getByRole("button", { name: "投稿" }));

    expect(triggerMock).toHaveBeenLastCalledWith({ content: "Hello world!" });
  });

  it("サブミット後、入力内容がリセットされること", async () => {
    render(<PostForm />);

    await userEvent.type(
      screen.getByRole("textbox", { name: "ポストの本文" }),
      "Hello world!",
    );
    await userEvent.click(screen.getByRole("button", { name: "投稿" }));

    expect(screen.getByRole("textbox", { name: "ポストの本文" })).toHaveValue(
      "",
    );
  });

  it("サブミット後、poss が mutate されること", async () => {
    render(<PostForm />);

    await userEvent.type(
      screen.getByRole("textbox", { name: "ポストの本文" }),
      "Hello world!",
    );
    await userEvent.click(screen.getByRole("button", { name: "投稿" }));

    expect(mutateMock).toHaveBeenLastCalledWith(["posts"]);
  });

  it("snapshot", () => {
    const { asFragment } = render(<PostForm />);

    expect(asFragment()).toMatchSnapshot();
  });
});
