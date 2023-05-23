import gql from 'graphql-tag';

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
   
    book(id: ID!): Book
    books(searchInput: String): [Book]!
    getMe: User

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