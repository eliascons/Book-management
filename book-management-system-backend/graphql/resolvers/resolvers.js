import { PrismaClient } from "@prisma/client";
import validateEntry from "../../utils/validation.js";
import { generateToken, verifyToken } from "../../utils/auth.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET;

const resolvers = {
  Query: {
    book: async (parent, { id }) => {
      return prisma.book.findUnique({
        where: { id },
      });
    },
    books: async (parent, { searchInput }, context, info) => {
      const query = searchInput
        ? {
            where: {
              OR: [
                { author: { contains: searchInput } },
                { title: { contains: searchInput } },
              ],
            },
          }
        : undefined;

      const result = await prisma.book.findMany(query);
      return result;
    },
    getMe: async (parent, args, context) => {
      const token = context.token.replace("Bearer ", "");

      try {
        const decoded = jwt.verify(token, JWT_SECRET);

        const user = await prisma.user.findUnique({
          where: { id: decoded.userId },
        });

        if (!user) {
          throw new Error("User not found");
        }

        return {
          id: user.id,
          username: user.username,
        };
      } catch (error) {
        throw new Error("Invalid or expired token");
      }
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

      const existingBook = await prisma.book.findFirst({
        where: {
          title: title,
          author: author,
        },
      });

      if (existingBook) {
        throw new Error("A book with the same title and author already exists");
      }

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
      if (!context.token) {
        throw new Error("Unauthorized");
      }
      const token = context.token.replace("Bearer ", "");
      const userId = verifyToken(token);
      if (!userId) {
        throw new Error("Unauthorized");
      }
      if (publicationYear < 1500) {
        throw new Error("Publication year must be greater than 1500");
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

      await prisma.book.delete({
        where: { id },
      });

      return {
        message: `Book with ID ${id} has been deleted`,
      };
    },
  },
};

export default resolvers;
