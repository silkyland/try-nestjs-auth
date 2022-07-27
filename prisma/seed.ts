import { PrismaClient } from '@prisma/client';
import { hashSync } from 'bcrypt';

const prisma = new PrismaClient();

const user = {
  email: 'silkyland@gmail.com',
  password: hashSync('123456', 10),
  name: 'Bundit Nuntates',
};

// insert to db
prisma.user
  .create({
    data: user,
  })
  .then(() => {
    console.log('User created');
    process.exit();
  });
