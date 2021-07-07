import { ApolloError, UserInputError } from "apollo-server-errors";
import { Resolvers, Product } from "../generated/graphql-server";
import Context from "../../interfaces/context";
import { Stripe } from 'stripe';

const checkoutResolver: Resolvers<Context> = {


    Mutation: {
        checkout: async (parent, { checkoutInput }, context): Promise<boolean> => {
            try {

                if (!checkoutInput) {
                    throw new UserInputError('Please provide inputs!');
                }

                if (!checkoutInput.amount || checkoutInput.amount <= 0) {
                    throw new UserInputError('Please add Products to your Cart.');
                }

                const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2020-08-27', typescript: true });

                const params = {
                    source: checkoutInput.tokenId,
                    amount: checkoutInput.amount,
                    currency: 'usd',
                }

                const charge = await stripe.charges.create(params);
                return true;
            } catch (error) {
                throw new ApolloError('Error while processing your payment. Please make sure you use the provided credit card: '
                    + error.message, error.code ? error.code : 'INTERNAL_SERVER_ERROR');
            }
        },

    }
}

export default checkoutResolver;