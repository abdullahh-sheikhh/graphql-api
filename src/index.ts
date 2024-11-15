import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from './type-defs.ts';
import { resolvers } from './resolvers.ts';
import { authenticate } from './utils/authMiddleware.ts';
import { GraphQLError } from 'graphql';

const port = 8080;

interface MyContext {
  user: {
    id: Int16Array;
    role: String;
  };
}

const server = new ApolloServer<MyContext>({
  typeDefs,
  resolvers,
  cache: 'bounded',
});

const { url } = await startStandaloneServer(server, {
  context: async ({ req }) => {
    const token = req.headers.authorization || '';
    const user = getUser(token);
    if (!user) {
      throw new GraphQLError('User is not authenticated!', {
        extensions: {
          code: 'UNAUTHENTICATED',
        },
      });
    }
    return {
      user,
      models: {
        User: generateUserModel({ user }),
        ...
      },
    };
  },
  listen: { port: port },
});

console.log(`listening on port ${url}`);
