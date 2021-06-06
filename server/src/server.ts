import 'reflect-metadata';
import { PrismaClient } from '@prisma/client';
import { ApolloServer } from 'apollo-server-express'
import userSchema from './graphql/user/userSchema';
import userResolver from './graphql/user/userResolver';
import profileSchema from './graphql/profile/profileSchema';
import express from 'express';
import { buildSchema } from 'type-graphql';
import UserResolver from './graphql/user/userResolver';
// import profileResolver from './graphql/profile/profileResolver';
(async () => {

  const port = process.env.PORT;
  const app = express();

  const prisma = new PrismaClient();

  const typeDefs = [userSchema, profileSchema];
  const resolvers = [userResolver];
  // const resolvers = {
  //   Query: {
  //     users: () => {
  //       return prisma.user.findMany();
  //     }
  //   }
  // };


  const server = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver]
    }),
    context: ({ req }) => ({
      prisma
    }),
  });

  server.applyMiddleware({ app, cors: false })

  app.listen(port, () => {

    console.log('Server up at port: ' + port);
  })

  // server.listen({ port }).then(({ url }) => {
  //   console.log('Server up at: ' + url);
  // });

})();

