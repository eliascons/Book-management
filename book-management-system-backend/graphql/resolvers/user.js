import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const userResolvers = {
  Query: {
    user: async (parent, { username }) => {
      return prisma.user.findUnique({
        where: { username },
      });
    },
  },
  Mutation: {
    createUser: async (parent, { username, password }) => {
      const hashedPassword = await bcrypt.hash(password, 10);

      return prisma.user.create({
        data: {
          username,
          password: hashedPassword,
        },
      });
    },
  },
};

export default userResolvers;