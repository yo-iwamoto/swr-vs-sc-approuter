import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

const prisma = new PrismaClient({
  log: ["query", "info", "warn", "error"],
});

function pickRandomFromArray<T>(array: T[]) {
  return array[Math.floor(Math.random() * array.length)];
}

async function main() {
  const usernames = Array.from(
    new Set(
      Array.from({ length: 20 }).map(() =>
        faker.person.lastName().toLowerCase(),
      ),
    ),
  ).slice(0, 10);

  const userIds = await Promise.all(
    usernames.map(async (username) =>
      prisma.user
        .create({
          data: { username },
          select: { id: true },
        })
        .catch(async (e) => {
          if (
            e instanceof PrismaClientKnownRequestError &&
            e.code === "P2002"
          ) {
            const user = await prisma.user.findUnique({
              where: { username },
              select: { id: true },
            });
            if (user === null) {
              throw e;
            }
          }

          throw e;
        })
        .then((result) => result.id),
    ),
  );

  await Promise.all(
    Array.from({ length: 200 }).map(() =>
      prisma.post.create({
        data: {
          userId: pickRandomFromArray(userIds),
          content: faker.lorem.sentence({ min: 10, max: 140 }),
        },
      }),
    ),
  );
}

main()
  .catch(() => process.exit(1))
  .finally(() => prisma.$disconnect());
