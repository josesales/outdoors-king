import { Resolvers } from "../generated/graphql-server";
import Context from "../../interfaces/context";
import Category from "../../../../client/src/interfaces/models/category";
import { ApolloError } from "apollo-server-errors";

const categoryResolver: Resolvers<Context> = {

    Query: {
        categories: async (_, args, context): Promise<Category[]> => {
            try {

                const categoriesDb = await context.prisma.category.findMany();
                return categoriesDb;

            } catch (error) {
                throw new ApolloError(error.message, 'INTERNAL_SERVER_ERROR');
            }
        },

    },

}

export default categoryResolver;