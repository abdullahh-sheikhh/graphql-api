import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from './type-defs.js';
import { resolvers } from './resolvers.js';
import { authenticate } from './utils/authMiddleware.js';

const port = 8080;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  cache: 'bounded',
});

const { url } = await startStandaloneServer(server, {
  context: async ({ req }) => {
    const user = authenticate(req);
    return { user };
  },
  listen: { port: port },
  cors: {
    methods: 'GET, POST',
  },
});

console.log(`listening on port ${port}`);
