import express from 'express';
import { ApolloServer } from 'apollo-server';
import typeDefs from './graphql/schema.js';
import resolvers from './graphql/resolvers/resolvers.js';

const app = express();
const PORT = 3000; // Replace with your desired port number

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
    console.log(`Server is running at ${url}`);
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});