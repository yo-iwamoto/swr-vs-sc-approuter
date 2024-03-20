import { UserCard } from "./components/user-card";
import { UsersPosts } from "./components/users-posts";

type Props = {
  params: {
    id: string;
  };
};

export default function Page({ params: { id } }: Props) {
  return (
    <main className="my-10 grid gap-8">
      <UserCard userId={id} />

      <UsersPosts userId={id} />
    </main>
  );
}
