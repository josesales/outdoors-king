import { ApolloError, UserInputError } from "apollo-server-errors";
import { Resolvers, Product } from "../generated/graphql-server";
import Context from "../../interfaces/context";
import { Stripe } from 'stripe';

const productResolver: Resolvers<Context> = {


    Mutation: {
        checkout: async (parent, { checkoutInput }, context): Promise<boolean> => {
            try {

                const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2020-08-27', typescript: true });

                const params = {
                    source: checkoutInput.tokenId,
                    amount: checkoutInput.amount,
                    currency: 'usd',
                }

                const charge = await stripe.charges.create(params);
                return true;
            } catch (error) {
                throw new ApolloError(`Error while saving product: ${error.message}`, error.code ? error.code :
                    'INTERNAL_SERVER_ERROR');
            }
        },

    }
}

export default productResolver;