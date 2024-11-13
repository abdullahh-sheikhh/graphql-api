import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from './schemas.js';
import { resolvers } from './resolvers.js';

const port = 8080;

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: port },
});

console.log(`listening on port ${port}`);
