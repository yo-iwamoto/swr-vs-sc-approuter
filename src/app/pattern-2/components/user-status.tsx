import { Button } from "@/components/client-ui";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { currentUser } from "../server/auth";

export async function UserStatus() {
  const me = await currentUser();
  if (me === null) return false;

  const signOutAction = async () => {
    "use server";

    cookies().delete("token");
    revalidatePath("/");
  };

  return (
    <form
      action={signOutAction}
      className="flex gap-2 items-center justify-end"
    >
      <p className="flex gap-1 items-center">
        <span className="font-bold">{me.username}</span>
        <span>でログインしています</span>
      </p>

      <Button type="submit" variant="secondary">
        サインアウト
      </Button>
    </form>
  );
}
