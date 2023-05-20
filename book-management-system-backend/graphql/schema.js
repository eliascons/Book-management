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

  type Query {
    books: [Book!]!
    book(id: ID!): Book
  }

  type Mutation {
    createBook(title: String!, author: String!, publicationYear: Int!): Book!
    updateBook(id: ID!, title: String!, author: String!, publicationYear: Int!): Book!
    deleteBook(id: ID!): Book
  }

  input BookInput {
    title: String!
    author: String!
    publicationYear: Int!
  }
`;

export default typeDefs;