"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var productSchema = {
    types: "#graphql\n\n    scalar Upload\n\n    type File {\n        filename: String!\n        mimetype: String!\n        encoding: String!\n    }\n    \n    type Product {\n        id: String\n        name: String\n        price: Float\n        category: Category\n        image: Upload\n    }\n    ",
    inputs: "#graphql\n        input ProductInput {\n        id: String\n        name: String\n        price: Float\n        category: CategoryInput\n    }\n    ",
    queries: "#graphql\n        products(productInput: ProductInput): [Product!]!\n        product(id: String!): Product\n    ",
    mutations: "#graphql\n        saveProduct(productInput: ProductInput!): Product\n        deleteProduct(id: String!): Boolean\n        imageUpload(id: String! base64Image: String!): Boolean\n    ",
};
exports.default = productSchema;
