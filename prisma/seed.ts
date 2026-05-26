import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.illness.create({
    data: {
      name: "Anxiety",
      description: "A state of excessive worry.",
      tags: ["mental", "stress"],
    },
  });
}

main()
  .then(() => prisma.$disconnect())
  .catch(e => {
    console.error(e);
    prisma.$disconnect();
  });
