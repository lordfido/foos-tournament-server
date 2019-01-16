import { ApolloServer, gql } from 'apollo-server-express';
import express from 'express';
import { log } from './common/utils/logger';

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

  app.listen({ port: PORT }, () => {
    log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
  });
};

initServer();
