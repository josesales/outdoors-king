"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var profileSchema = {
    types: "#graphql\n\n        type Profile {\n            id: String\n            name: String    \n        }\n    ",
    inputs: "#graphql\n    \n        input ProfileInput {\n            id: String\n            name: String\n        }\n    ",
    queries: "",
    mutations: "",
};
exports.default = profileSchema;
