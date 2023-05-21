import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import http from 'http';
import cors from 'cors';
import  bodyParser  from 'body-parser';
import resolvers from './graphql/resolvers/resolvers.js';
import typeDefs from './graphql/schema.js';

const app = express();
const httpServer = http.createServer(app);
const PORT = 4000;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

await server.start();

app.use(
  '/graphql',
  cors(),
  bodyParser.json(),
  expressMiddleware(server, {
    context: async ({ req }) => ({ token: req.headers.authorization }),
  }),
);

await new Promise((resolve) => httpServer.listen({ port: PORT }, resolve));
console.log(` Server ready at http://localhost:${PORT}/graphql`);