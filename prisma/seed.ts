import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const USERS_TO_CREATE = 20;
const MESSAGES_MIN = 1;
const MESSAGES_MAX = 20;

async function run() {
  const userData = Array(USERS_TO_CREATE)
    .fill(null)
    .map(() => {
      return {
        name: faker.internet.userName().toLowerCase(),
        email: faker.internet.email().toLocaleLowerCase(),
        image: faker.image.avatar(),
      };
    });

  const createUsers = userData.map((user) =>
    prisma.user.create({ data: user })
  );

  const users = await prisma.$transaction(createUsers);

  const messages = [];

  for (let i = 0; i < users.length; i++) {
    const amount = faker.datatype.number({
      min: MESSAGES_MIN,
      max: MESSAGES_MAX,
    });

    for (let ii = 0; ii < amount; ii++) {
      messages.push({
        text: faker.lorem.sentence(),
        author: {
          connect: {
            id: users[ii]?.id,
          },
        },
      });
    }
  }

  const createMessages = messages.map((message) =>
    prisma.message.create({ data: message })
  );

  await prisma.$transaction(createMessages);

  await prisma.$disconnect();
}

run();
