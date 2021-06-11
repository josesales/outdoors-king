
const productSchema = {

    types: `#graphql

        type Checkout {
            tokenId: String!
            amount: Float!
        }
    `,

    inputs: `#graphql
        input CheckoutInput {
            tokenId: String!
            amount: Float!
        }
    `,

    queries: `#graphql
    `,

    mutations: `#graphql
        checkout(checkoutInput: CheckoutInput!): Boolean
    `,
}

export default productSchema;