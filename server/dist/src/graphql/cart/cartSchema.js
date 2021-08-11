"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var cartSchema = {
    types: "#graphql\n\n\n        type CartProduct {\n            id: String\n            cart: Cart\n            product: Product\n            quantity: Int\n        }\n\n        type Cart {\n            id: String\n            user: User\n            cartProducts: [CartProduct]\n        }\n    ",
    inputs: "#graphql\n    ",
    queries: "#graphql\n        cart: Cart\n    ",
    mutations: "#graphql\n    ",
};
exports.default = cartSchema;
