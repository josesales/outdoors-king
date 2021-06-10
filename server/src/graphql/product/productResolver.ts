import { ApolloError, UserInputError } from "apollo-server-errors";
import { Resolvers, User, Auth } from "../generated/graphql-server";
import Context from "../../interfaces/context";

const productResolver: Resolvers<Context> = {

    Query: {
        //     products: async (parent, args, context): Promise<Product[]> => {
        //         try {

        //             const products: Product[] = await context.prisma.product.findMany({
        //                 include: {
        //                     category: true
        //                 }
        //             });

        //             return products;
        //         } catch (error) {
        //             throw new ApolloError('Error while fetching user', 'INTERNAL_SERVER_ERROR');
        //         }
        //     },
    },

    Mutation: {

    }
}

export default productResolver;