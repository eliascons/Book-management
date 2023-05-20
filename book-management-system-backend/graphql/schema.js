import { gql } from 'apollo-server';

const typeDefs = gql`
  type Book {
    id: ID!
    title: String!
    author: String!
    publicationYear: Int!
    createdAt: String!
    updatedAt: String!
  }

  type User {
    id: ID!
    username: String!
    password: String!
    createdAt: String!
    updatedAt: String!
  }

  type Query {
    books: [Book!]!
    book(id: ID!): Book
    user(username: String!): User  # Fetch a user by username
  }

  type Mutation {
    createBook(title: String!, author: String!, publicationYear: Int!): Book!
    updateBook(id: ID!, title: String!, author: String!, publicationYear: Int!): Book!
    deleteBook(id: ID!): Book

    createUser(username: String!, password: String!): User!
    updateUser(id: ID!, username: String!, password: String!): User!
    deleteUser(id: ID!): User
  }

  input BookInput {
    title: String!
    author: String!
    publicationYear: Int!
  }
`;

export default typeDefs;