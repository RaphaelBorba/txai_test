import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const adminUser = await prisma.user.upsert({
    where: { name: 'sistematxai' },
    update: {},
    create: {
      name: 'sistematxai',
      password: await bcrypt.hash('123456789', 10),
      role: 'admin',
    },
  });
  console.log(adminUser);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
