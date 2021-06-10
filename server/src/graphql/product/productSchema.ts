
const productSchema = {

    types: `#graphql

        type Product {
        id: Int
        name: String
        price: Float
        category: Category
    }
    `,

    inputs: `#graphql
        input ProductInput {
        id: Int
        name: String
        price: Float
        category: CategoryInput
    }
    `,

    queries: `#graphql
        products: [Product!]!
        product(productInput: ProductInput!): Product
    `,

    mutations: `#graphql
        saveProduct(saveInput: ProductInput!): Product
        deleteProduct(productId: Int!): Boolean
    `,
}

export default productSchema;