import { PrismaClient } from '@prisma/client';
import { ApolloServer, AuthenticationError } from 'apollo-server-express'
import express from 'express';
import rootSchema from './graphql/rootSchema';
import rootResolver from './graphql/rootResolver';
import { auth } from './middleware/auth';
import cors from './middleware/cors';
import { GraphQLError } from 'graphql';
import { graphqlUploadExpress } from 'graphql-upload';
import enforce from 'express-sslify';
import compression from 'compression';

(async () => {

  const port = process.env.PORT;
  const app = express();

  const prisma = new PrismaClient();

  const server = new ApolloServer({
    typeDefs: rootSchema,
    resolvers: rootResolver,
    uploads: false,
    debug: false,

    context: async ({ req }) => {

      const user = (req as any).user ? (req as any).user : null;
      return { prisma, user }
    },

    formatError: (error: GraphQLError) => {

      return new GraphQLError(error.message);
    },
  });

  app.use(compression);
  app.use(enforce.HTTPS({ trustProtoHeader: true }));

  app.use(graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }));

  app.use(cors);

  app.use(async (req, _, next) => {
    try {

      const token = req.header('Authorization') ? req.header('Authorization')!.replace('Bearer ', '') : '';
      const user = await auth(token, prisma);
      (req as any).user = user;
      next();
    } catch {
      throw new AuthenticationError('you must be logged in');
    }
  });

  server.applyMiddleware({ cors: true, app })

  app.listen(port, () => {

    console.log('Server up at port: ' + port);
  })
})();

