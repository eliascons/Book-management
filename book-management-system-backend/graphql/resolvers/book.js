import { PrismaClient } from "@prisma/client";
import  validateEntry  from "../../utils/validation.js";

const prisma = new PrismaClient();

const bookResolvers = {
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
    createBook: async (parent, { title, author, publicationYear }) => {
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
    updateBook: async (parent, { id, title, author, publicationYear }) => {
      return prisma.book.update({
        where: { id },
        data: {
          title,
          author,
          publicationYear,
        },
      });
    },
    deleteBook: async (parent, { id }) => {
      return prisma.book.delete({
        where: { id },
      });
    },
  },
};

export default bookResolvers;
