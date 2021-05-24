import { PrismaClient } from '@prisma/client';
import { ApolloServer } from 'apollo-server'

const port = process.env.PORT;
const prisma = new PrismaClient();

const typeDefs = `
  type User {
    id: Int!
    name: String
  }
  type Query {
    allUsers: [User!]!
  }
`;

const resolvers = {
    Query: {
        allUsers: () => {
            return prisma.user.findMany()
        }
    }
};

const server = new ApolloServer({ resolvers, typeDefs });

server.listen({ port }).then(({ url }) => {
    console.log('Server up at: ' + url);
});

