import { Category, Resolvers } from "../generated/graphql-server";
import Context from "../../interfaces/context";
import { ApolloError } from "apollo-server-errors";
import { orderBy } from "lodash";

const categoryResolver: Resolvers<Context> = {

    Query: {
        categories: async (_, args, context): Promise<Category[]> => {
            try {

                const categoriesDb: Category[] = await context.prisma.category.findMany({
                    select: {
                        id: true,
                        name: true,
                        products: {
                            take: 3,
                            include: {
                                category: true,
                            },
                            orderBy: {name: 'asc'},
                        },
                    },
                });

                return categoriesDb;
            } catch (error) {
                throw new ApolloError(error.message, 'INTERNAL_SERVER_ERROR');
            }
        },

    },

}

export default categoryResolver;