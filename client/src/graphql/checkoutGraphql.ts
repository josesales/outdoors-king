import { gql } from "graphql-request";

export const checkoutMutation = {
    queryName: 'checkout',
    query: gql`
            mutation checkoutMutation($checkoutInput: CheckoutInput!) {
                checkout(checkoutInput: $checkoutInput)
            }
        `
};