import { ApolloError, UserInputError } from "apollo-server-errors";
import { Resolvers, Cart } from "../generated/graphql-server";
import Context from "../../interfaces/context";
import { validateAuthenticatedUser } from "../../permissions/permission";

const cartResolver: Resolvers<Context> = {

    Query: {

        cart: async (_, args, context): Promise<Cart> => {
            try {

                validateAuthenticatedUser(context);

                const cart = await context.prisma.cart.findFirst({
                    where: {
                        userId: context.user.id
                    },
                    include: {
                        cartProducts: true
                    }
                });

                if (!cart) {
                    throw new UserInputError('Cart not found');
                }

                return cart;
            } catch (error) {
                throw new ApolloError('Error while fetching cart: ' + error.message, 'INTERNAL_SERVER_ERROR');
            }
        },
    },

}

export default cartResolver;