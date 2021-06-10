
const productSchema = {

    types: `#graphql

        type Product {
        id: String
        name: String
        price: Float
        category: Category
    }
    `,

    inputs: `#graphql
        input ProductInput {
        id: String
        name: String
        price: Float
        category: CategoryInput
    }
    `,

    queries: `#graphql
        products: [Product!]!
        product(productId: String!): Product
    `,

    mutations: `#graphql
        saveProduct(productInput: ProductInput!): Product
        deleteProduct(productId: String!): Boolean
    `,
}

export default productSchema;