import { ApolloServer, gql } from 'apollo-server-express';
import express from 'express';
import { log } from './common/utils/logger';

import { endpoints } from './app';

const HOST = '0.0.0.0';
const PORT = 4000;

const initServer = () => {
  const typeDefs = gql`
    type Query {
      "A simple type for getting started!"
      hello: String
    }
  `;

  const resolvers = {
    Query: {
      hello: () => 'world',
    },
  };

  const server = new ApolloServer({
    resolvers,
    typeDefs,
  });

  const app = express();
  server.applyMiddleware({ app });

  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });

  endpoints.map(({ handler, method, path }) => {
    log('Setting up endpoint', method, path);
    app[method](path, handler);
  });

  app.listen({ host: HOST, port: PORT }, () => {
    log(`🚀 Server ready at http://${HOST}:${PORT}${server.graphqlPath}`);
  });
};

initServer();
