"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var categorySchema = {
    types: "#graphql\n        type Category {\n                id: String\n                name: String  \n                products: [Product]  \n            }\n    ",
    inputs: "#graphql\n        input CategoryInput {\n                id: String\n                name: String\n            }\n    ",
    queries: "#graphql\n        categories: [Category!]!",
    mutations: "",
};
exports.default = categorySchema;
