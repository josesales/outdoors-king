"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var productSchema = {
    types: "#graphql\n\n        type Checkout {\n            tokenId: String!\n            amount: Float!\n        }\n    ",
    inputs: "#graphql\n        input CheckoutInput {\n            tokenId: String!\n            amount: Float!\n        }\n    ",
    queries: "#graphql\n    ",
    mutations: "#graphql\n        checkout(checkoutInput: CheckoutInput!): Boolean\n    ",
};
exports.default = productSchema;
