import { Base, Button, FormControl, Input } from "@/components/client-ui";
import { envVars } from "@/config/env";
import { prisma } from "@/lib/prisma";
import * as jwt from "hono/jwt";
import { cookies } from "next/headers";

export function SignIn() {
  const signInAction = async (data: FormData) => {
    "use server";

    const username = data.get("username");
    if (typeof username !== "string") return;

    const user = await prisma.user.findUnique({ where: { username } });
    if (user === null) {
      const newUser = await prisma.user.create({ data: { username } });
      const token = await jwt.sign(
        { userId: newUser.id },
        envVars.JWT_SECRET,
        "HS256",
      );
      cookies().set("token", token);
      return;
    }

    const token = await jwt.sign({ userId: user.id }, envVars.JWT_SECRET);
    cookies().set("token", token);
  };

  return (
    <Base className="p-8 max-w-md mx-auto my-20">
      <form action={signInAction} className="flex flex-col items-center gap-5">
        <h1 className="text-lg font-bold">サインイン画面</h1>

        <p className="text-sm text-center">
          任意のユーザー名でサインインできます。
          <br />
          存在しないユーザー名の場合、作成してサインインします。
        </p>

        <FormControl title="ユーザー名" className="w-full">
          <Input
            name="username"
            required
            maxLength={100}
            className="w-full py-2"
            data-1p-ignore
          />
        </FormControl>

        <Button type="submit" variant="primary" className="w-full">
          <span>サインイン</span>
        </Button>
      </form>
    </Base>
  );
}
