
const productSchema = {

    types: `#graphql

    scalar Upload

    type File {
        filename: String!
        mimetype: String!
        encoding: String!
    }
    
    type Product {
        id: String
        name: String
        price: Float
        category: Category
        image: Upload
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
        products(productInput: ProductInput): [Product!]!
        product(productId: String!): Product
    `,

    mutations: `#graphql
        saveProduct(productInput: ProductInput!): Product
        deleteProduct(productId: String!): Boolean
        imageUpload(productId: String! file: Upload!): File!
    `,
}

export default productSchema;