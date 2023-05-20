import { gql } from 'apollo-server';

const typeDefs = gql`

  type User{
    id: ID!
    username: String!
  }

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

    currentUser: User!

  }
  type Mutation {
    createBook(title: String!, author: String!, publicationYear: Int!): Book!
    updateBook(id: ID!, title: String!, author: String!, publicationYear: Int!): Book!
    deleteBook(id: ID!): DeleteBookResponse!

    register(username: String!, password: String!): User!
    login(username: String!, password: String!): LoginResponse!
  }

  type DeleteBookResponse {
    message: String!
  }

  type LoginResponse {
    token: String
    user: User
  }


  input BookInput {
    title: String!
    author: String!
    publicationYear: Int!
  }
`;

export default typeDefs;