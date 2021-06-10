import { PrismaClient } from '@prisma/client';
import { ApolloServer } from 'apollo-server-express'
import userSchema from './graphql/user/userSchema';
import express from 'express';
import UserResolver from './graphql/user/userResolver';
import profileSchema from './graphql/profile/profileSchema';
import productSchema from './graphql/product/productSchema';
import categorySchema from './graphql/category/categorySchema';
import rootSchema from './graphql/rootSchema';
import rootResolver from './graphql/rootResolver';

(async () => {

  const port = process.env.PORT;
  const app = express();

  const prisma = new PrismaClient();

  const server = new ApolloServer({
    typeDefs: rootSchema,
    resolvers: rootResolver,
    uploads: false,

    context: ({ req }) => ({
      prisma
    }),
  });

  server.applyMiddleware({ app, cors: false })

  app.listen(port, () => {

    console.log('Server up at port: ' + port);
  })
})();

