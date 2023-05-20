import { PrismaClient } from "@prisma/client";
import validateEntry from "../../utils/validation.js";
import { verifyToken } from "../../utils/auth.js";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const resolvers = {
  Query: {
    books: async () => {
      return prisma.book.findMany();
    },
    book: async (parent, { id }) => {
      return prisma.book.findUnique({
        where: { id },
      });
    },
  },

  Mutation: {
    register: async (parent, { username, password }) => {
      // Check if the username already exists
      const existingUser = await prisma.user.findUnique({
        where: { username },
      });
      if (existingUser) {
        throw new Error("Username already exists");
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
      
      // Create the new user
      const newUser = await prisma.user.create({
        data: {
          username,
          password: hashedPassword,
        },
      });
      
      // Return the created user
      return newUser;
    },

    createBook: async (parent, { title, author, publicationYear }, context) => {
      // const userId = verifyToken(context.token);
      // if (!userId) {
      //   throw new Error("Unauthorized");
      // }

      const book = { title, author, publicationYear };
      const errors = validateEntry(book);

      if (errors.length > 0) {
        throw new Error(errors.join("\n"));
      }

      return prisma.book.create({
        data: {
          title,
          author,
          publicationYear,
        },
      });
    },

    updateBook: async (
      parent,
      { id, title, author, publicationYear },
      context
    ) => {
      // const userId = verifyToken(context.token);
      // if (!userId) {
      //   throw new Error('Unauthorized');
      // }

      return prisma.book.update({
        where: { id },
        data: {
          title,
          author,
          publicationYear,
        },
      });
    },

    deleteBook: async (parent, { id }, context) => {
      // const userId = verifyToken(context.token);
      // if (!userId) {
      //   throw new Error('Unauthorized');
      // }

      return prisma.book.delete({
        where: { id },
      });
    },
  },
};

export default resolvers;
