import { PrismaClient } from '@prisma/client';
import { ApolloServer } from 'apollo-server-express'
import userSchema from './graphql/user/userSchema';
import express from 'express';
import UserResolver from './graphql/user/userResolver';
import profileSchema from './graphql/profile/profileSchema';

(async () => {

  const port = process.env.PORT;
  const app = express();

  const prisma = new PrismaClient();

  const server = new ApolloServer({
    typeDefs: [userSchema, profileSchema],
    resolvers: [UserResolver],

    context: ({ req }) => ({
      prisma
    }),
  });

  server.applyMiddleware({ app, cors: false })

  app.listen(port, () => {

    console.log('Server up at port: ' + port);
  })
})();

