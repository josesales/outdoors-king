
const cartSchema = {

    types: `#graphql


        type CartProduct {
            id: String
            cart: Cart
            product: Product
            quantity: Int
        }

        type Cart {
            id: String
            user: User
            cartProducts: [CartProduct]
        }
    `,

    inputs: `#graphql
    `,

    queries: `#graphql
        cart: Cart
    `,

    mutations: `#graphql
    `,
}

export default cartSchema;