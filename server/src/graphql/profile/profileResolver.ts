import { user } from ".prisma/client";
import { ApolloError } from "apollo-server-errors";
import { GraphQLResolveInfo } from "graphql";
import ApolloServerContext from "../../interfaces/apolloServerContext";
// import { Resolvers, User, UserInput } from "../generated/graphql-server";

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

interface Error {
    code: number,
    message: string
}

const ProfileResolver  = {

    Query: {

    },

    Mutation: {
    },
}

export default ProfileResolver