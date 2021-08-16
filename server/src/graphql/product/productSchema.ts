
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
        description: String
        price: Float
        category: Category
        image: Upload
    }
    `,

    inputs: `#graphql
        input ProductInput {
        id: String
        name: String
        description: String
        price: Float
        category: CategoryInput
    }
    `,

    queries: `#graphql
        products(productInput: ProductInput): [Product!]!
        product(id: String!): Product
    `,

    mutations: `#graphql
        saveProduct(productInput: ProductInput!): Product
        deleteProduct(id: String!): Boolean
        imageUpload(id: String! base64Image: String!): Boolean
    `,
}

export default productSchema;