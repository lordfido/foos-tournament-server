import { ApolloServer, gql } from 'apollo-server-express';
import express from 'express';
import { log } from './common/utils/logger';

import { endpoints } from './app';

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

  endpoints.map(({ handler, method, path }) => {
    log('Setting up endpoint', method, path);
    app[method](path, handler);
  });

  app.listen({ port: PORT }, () => {
    log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
  });
};

initServer();
