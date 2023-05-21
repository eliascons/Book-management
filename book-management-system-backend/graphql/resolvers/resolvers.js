import { PrismaClient } from "@prisma/client";
import validateEntry from "../../utils/validation.js";
import { generateToken, verifyToken } from "../../utils/auth.js";
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

    login: async (parent, { username, password }) => {
      const user = await prisma.user.findUnique({
        where: { username },
      });

      if (!user) {
        throw new Error("Invalid credentials");
      }

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        throw new Error("Invalid credentials");
      }

      const token = generateToken(user);

      return { token, user };
    },

    createBook: async (parent, { title, author, publicationYear }, context) => {
      
      const token = context.token.replace("Bearer ", "");
      const userId = verifyToken(token);
      if (!userId) {
        throw new Error("Unauthorized");
      }

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
      if(!context.token){
        throw new Error("Unauthorized");
      }
      const token = context.token.replace("Bearer ", "");
      const userId = verifyToken(token);
      if (!userId) {
        throw new Error("Unauthorized");
      }
      if(publicationYear < 1000){
        throw new Error("Publication year must be greater than 1000");
      }
      const existingBook = await prisma.book.findUnique({ where: { id } });
      if (!existingBook) {
        throw new Error("Book not found");
      }

      const updatedBook = await prisma.book.update({
        where: { id },
        data: {
          title,
          author,
          publicationYear,
        },
      });

      return updatedBook;
    },

    deleteBook: async (parent, { id }, context) => {
      
      const token = context.token.replace("Bearer ", "");
      
      const userId = verifyToken(token);
      if (!userId) {
        throw new Error("Unauthorized");
      }

      const existingBook = await prisma.book.findUnique({ where: { id } });
      if (!existingBook) {
        throw new Error("Book not found");
      }

      const { title } = await prisma.book.delete({
        where: { id },
      });


      return {
        message: `Book has been deleted`,
      };
    },
  },
};

export default resolvers;
