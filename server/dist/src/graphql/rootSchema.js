"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var categorySchema_1 = __importDefault(require("./category/categorySchema"));
var productSchema_1 = __importDefault(require("./product/productSchema"));
var profileSchema_1 = __importDefault(require("./profile/profileSchema"));
var userSchema_1 = __importDefault(require("./user/userSchema"));
var checkoutSchema_1 = __importDefault(require("./checkout/checkoutSchema"));
var cartSchema_1 = __importDefault(require("./cart/cartSchema"));
var types = [];
var inputs = [];
var queries = [];
var mutations = [];
//each new schema should be included in the schemas array
var schemas = [userSchema_1.default, profileSchema_1.default, productSchema_1.default, categorySchema_1.default, checkoutSchema_1.default, cartSchema_1.default];
//combine all types, inputs, queries and mutations from each schema object
schemas.forEach(function (schema) {
    types.push(schema.types);
    inputs.push(schema.inputs);
    queries.push(schema.queries);
    mutations.push(schema.mutations);
});
var rootSchema = "\n\n    " + types.join('\n') + "\n\n    " + inputs.join('\n') + "\n\n    type Query {\n        " + queries.join('\n') + "\n    }\n\n    type Mutation {\n        " + mutations.join('\n') + "\n    }\n";
exports.default = rootSchema;
