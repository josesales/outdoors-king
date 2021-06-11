import { PrismaClient } from '@prisma/client';
import { ApolloServer, AuthenticationError } from 'apollo-server-express'
import userSchema from './graphql/user/userSchema';
import express from 'express';
import UserResolver from './graphql/user/userResolver';
import profileSchema from './graphql/profile/profileSchema';
import productSchema from './graphql/product/productSchema';
import categorySchema from './graphql/category/categorySchema';
import rootSchema from './graphql/rootSchema';
import rootResolver from './graphql/rootResolver';
import { auth } from './middleware/auth';

(async () => {

  const port = process.env.PORT;
  const app = express();

  const prisma = new PrismaClient();

  const server = new ApolloServer({
    typeDefs: rootSchema,
    resolvers: rootResolver,
    uploads: false,

    context: async ({ req }) => {

      const user = (req as any).user ? (req as any).user : null;
      return { prisma, user }
    },
  });

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


  server.applyMiddleware({ app, cors: false })

  app.listen(port, () => {

    console.log('Server up at port: ' + port);
  })
})();

