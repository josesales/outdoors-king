import { ApolloError, UserInputError } from "apollo-server-errors";
import { Resolvers, User, Auth } from "../generated/graphql-server";
import Context from "../../interfaces/context";

const productResolver: Resolvers<Context> = {

    Query: {

    },

    Mutation: {

    }
}

export default productResolver;