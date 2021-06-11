import { ApolloError, UserInputError } from "apollo-server-errors";
import { Resolvers, Product } from "../generated/graphql-server";
import Context from "../../interfaces/context";
import { validate } from "./productUtil";
import { validateAdminUser, validateAuthenticatedUser } from "../../permissions/permission";

const productResolver: Resolvers<Context> = {

    Query: {
        products: async (parent, { productInput }, context): Promise<Product[]> => {
            try {

                // validateAuthenticatedUser(context);
                // await validateAdminUser(context);
                let filter = {};
                if (productInput) {
                    filter = productInput;
                }

                const products: Product[] = await context.prisma.product.findMany({
                    where: filter,
                    include: {
                        category: true
                    }
                });

                return products;
            } catch (error) {
                throw new ApolloError('Error while fetching products: ' + error.message, 'INTERNAL_SERVER_ERROR');
            }
        },

        product: async (parent, { productId }, context): Promise<Product> => {
            try {

                const product = await context.prisma.product.findUnique({
                    where: {
                        id: productId
                    },
                    include: {
                        category: true
                    }
                });

                if (!product) {
                    throw new UserInputError('Product not found');
                }

                return product;
            } catch (error) {
                throw new ApolloError('Error while fetching product: ' + error.message, 'INTERNAL_SERVER_ERROR');
            }
        },
    },

    Mutation: {
        saveProduct: async (parent, { productInput }, context): Promise<Product> => {
            try {

                if (!productInput) {
                    throw new UserInputError('Please provide inputs');
                }

                await validate(productInput);

                const categoryId: string = productInput.category?.id!;

                const upsertData = {
                    name: productInput.name!,
                    price: productInput.price!,
                    category: {
                        connect: {
                            id: categoryId
                        }
                    }
                }

                const product = await context.prisma.product.upsert({
                    create: upsertData,
                    update: upsertData,
                    where: {
                        id: productInput.id ? productInput.id : ''
                    },
                    include: {
                        category: true
                    }
                });

                return product;
            } catch (error) {
                throw new ApolloError(`Error while saving product: ${error.message}`, error.code ? error.code :
                    'INTERNAL_SERVER_ERROR');
            }
        },

        deleteProduct: async (parent, { productId }, context): Promise<boolean> => {
            try {

                if (!productId) {
                    throw new UserInputError('Please provide inputs');
                }

                const product = await context.prisma.product.delete({
                    where: {
                        id: productId
                    }
                });

                if (product) {
                    return true
                }
                return false;
            } catch (error) {
                throw new ApolloError(`Error while saving product: ${error.message}`, error.code ? error.code :
                    'INTERNAL_SERVER_ERROR');
            }
        },
    }
}

export default productResolver;